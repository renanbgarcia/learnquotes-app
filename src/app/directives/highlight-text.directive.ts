import { Directive, ElementRef, HostListener, ContentChildren, QueryList } from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('plum');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  @HostListener('click') onmousedown() {
    this.highlight('yellow');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
