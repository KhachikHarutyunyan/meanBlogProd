import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  dropdown: Boolean = false;

  constructor(
    public auth: AuthService,
    private eRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event']) clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdown = false;
    }
  }

  ngOnInit() {
  }

}
