import { Directive, ElementRef, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
// import { Observable, fromEvent } from 'rxjs';
// // import 'rxjs/add/observable/fromEvent';
// import {delay} from 'rxjs/operators';
// import 'rxjs/add/operator/do';



@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements OnInit, OnDestroy {

  // private listening: boolean;
  // private globalClick: Observable<MouseEvent>;

  @Output('clickOutside') clickOutside: EventEmitter<Object>;

  constructor(
    private elementRef: ElementRef
  ) {
    // this.listening = false;
    this.clickOutside = new EventEmitter();
  }

  ngOnInit() {
    // this.globalClick = Observable.fromEvent(document, 'click').delay(1)
    //   .do(() => {
    //     this.listening = true;
    //   }).susbscribe((event: MouseEvent) => {
    //     this.onGlobalClik(event);
    //   });
  }

  ngOnDestroy(): void {
    // this.globalClick.unsubscribe();
  }

  onGlobalClik(event: MouseEvent) {
    // if (event instanceof MouseEvent && this.listening === true) {}
  }


  @HostListener('document:click', ['$event.path'])
   onCLick($event: Array<any>) {
    //  const elementRefInPath = $event.find(node => node === this.parentNode);
    // if (!elementRefInPath) {
    //   // this.closeEventEmmit.emit();
    // }
  }


}
