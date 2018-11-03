
import { Directive, HostListener, ElementRef, Renderer2, OnInit, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  // tslint:disable:no-inferrable-types
  @Input() defaultColor: string = '#52264b';
  @HostBinding('class.red') isOpen = true;
  @HostBinding('style.backgroundColor') backgroundColor: string = '#22264b';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    //  Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    // this.defaultColor = 'yellow';
  }

  @HostListener('mouseenter') showColor() {
    //  console.log(' mouse enter : ' + this.isOpen);
    this.defaultColor = '#52264b';
    this.backgroundColor = this.defaultColor;
   // this.isOpen = !this.isOpen;  // make the text color red every other time.
  }


  @HostListener('mouseleave') leaveShowColor() {
    // console.log(' mouse leave : ' + this.isOpen);
    this.defaultColor = '#90229e';
    this.backgroundColor = this.defaultColor;
   // this.isOpen = !this.isOpen;
  }


  @HostListener('click') showToggle() {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-toggle', 'dropdown');
    this.isOpen = !this.isOpen;  // make the text color red every other time.
  }

}
