const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Pusher = require('pusher');


const pusher = new Pusher({
  appId: "548769",
  key: "61fe5cb7a3254f2f8e71",
  secret: "2e795fe5fb91c8427e95",
  cluster: "ap2",
  encrypted: true
});

module.exports = (router) => {

    router.post('/newPost', (req, res) => {
        if (!req.body.title) {
            res.json({ success: false, message: 'Blog title is required' });
        } else {
            if (!req.body.body) {
                res.json({ success: false, message: 'Blog creator is required' });
            } else {
                if (!req.body.createdBy) {
                    res.json({ success: false, message: '' });
                } else {
                    const blog = new Blog({
                        title: req.body.title,
                        body: req.body.body,
                        createdBy: req.body.createdBy,
                    });
                    blog.save((err) => {
                        if (err) {
                            if (err.errors) {
                                if (err.errors.title) {
                                    res.json({ success: false, message: err.errors.title.message });
                                } else {
                                    if (err.errors.body) {
                                        res.json({ success: false, message: err.errors.body.message });
                                    } else {
                                        res.json({ success: false, message: err.errors.errmsg });
                                    }
                                }
                            } else {
                                res.json({ success: false, message: err });
                            }                            
                            
                        } else {
                            res.json({ success: true, message: 'Post saved ' });
                        }
                    });
                }
            }
        }
    });

    // update Single Post

    router.put('/updatePost', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: 'No blog Id provided' });
        } else {
            Blog.findOne({ _id: req.body._id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid blog Id' });
                } else {
                    if (!blog) {
                        res.json({ success: false, message: 'Blog Id was not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user' });
                                } else {
                                    if (user.username = !blog.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this blog' });
                                    } else {
                                        blog.title = req.body.title;
                                        blog.body = req.body.body;
                                        blog.save((err) => {
                                            if (err) {
                                                if (err.errors) {
                                                    res.json({ success: false, message: 'Please ensure form filled out properly' });
                                                } else {
                                                    res.json({ success: false, message: err });
                                                }
                                            } else {
                                                res.json({ success: true, message: 'Post updated' });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    router.delete('/deletePost/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No id was provided' });
        } else {
            Blog.findOne({ _id: req.params.id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid ID' });
                } else {
                    if (!blog) {
                        res.json({ success: false, message: 'Post was not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user' });
                                } else {
                                    if (user.username !== blog.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to delete this blog post' });
                                    } else {
                                        blog.remove((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'Post Deleted' });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    router.put('/likePost', (req, res) => {
        if (!req.body.id) {
            res.json({ success: false, message: 'No id was provided' });
        } else {
            Blog.findOne({ _id: req.body.id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid blog ID' });
                } else {
                    if (!blog) {
                        res.json({ success: false, message: 'That blog was not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: 'Something went wrong' });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Could not authenticate user ' });
                                } else {
                                    if (user.username === blog.username) {
                                        res.json({ success: false, message: 'Cannot like your own post' });
                                    } else {
                                        if (blog.likedBy.includes(user.username)) {
                                            res.json({ success: false, message: 'You already liked this post' });
                                        } else {
                                            blog.likes++;
                                            blog.likedBy.push(user.username);
                                            

                                            blog.save((err) => {
                                                if (err) {
                                                    res.json({ success: false, message: 'Something went wrong' });
                                                } else {
                                                  pusher.trigger('events-channel', 'new-like', {
                                                    likes: blog.likes,
                                                    likedBy: blog.likedBy
                                                  });
                                                    res.json({ success: true, message: 'Post Liked' });
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    router.post('/comment', (req, res) => {
        if (!req.body.comment) {
          res.json({ success: false, message: 'No comment provided' });
        } else {
          if (!req.body.id) {
            res.json({ success: false, message: 'No id was provided' });
          } else {
            Blog.findOne({ _id: req.body.id }, (err, blog) => {
              if (err) {
                res.json({ success: false, message: 'Invalid blog id' });
              } else {
                if (!blog) {
                  res.json({ success: false, message: 'Blog not found' });
                } else {
                  User.findOne({ _id: req.decoded.userId }, (err, user) => {
                    if (err) {
                      res.json({ success: false, message: 'Something went wrong' });
                    } else {
                      if (!user) {
                        res.json({ success: false, message: 'User not found' });
                      } else {
                        blog.comments.push({
                          comment: req.body.comment,
                          commentator: user.username
                        });
                        const data = {
                            comment: req.body.comment,
                            commentator: user.username
                        };
                        blog.save((err) => {
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong' });
                          } else {
                                pusher.trigger(['chat'], 'message', data);
                                res.json({ success: true, message: 'Comment saved' });
                          }
                        });
                      }
                    }
                  })
                }
              }
            });
          }
        }
      });


    return router;
};
