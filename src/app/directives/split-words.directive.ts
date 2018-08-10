import { Directive, ElementRef, HostListener, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appSplitWords]'
})
export class SplitWordsDirective {

  isTextNew = false;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.isTextNew) {
      this.splitWords();
    }
  }

  private splitWords() {
    this.isTextNew = true;
    let text = this.el.nativeElement.textContent;
    console.log(text);
    let words = text.split(' ');
    console.log(words);
    let newText = '';
    for (let word of words) {
      newText = newText.concat(`<span appHighlightText>${word} </span>`);
    }
    console.log(newText);
    this.el.nativeElement.innerHTML = newText;
  }
}
