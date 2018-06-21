
export class BlogModule {
  constructor(
    public title: String,
    public body: String,
    public createdBy: String,
    public createdAt?: Date,
    public likes?: Number,
    public likedBy?: Array<any>,
    public comments?: Array<any>,
    public _id?: String,
  ) {}
}

