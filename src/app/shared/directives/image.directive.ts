import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appImage]',
  standalone: true
})
export class ImageDirective {
  @Input() appImageValidation: string | undefined;
  renderer = inject(Renderer2);
  element = inject(ElementRef);

  private defaultImageUrl = 'https://www.csam.unam.mx/static/images/imagen-no-disponible.jpg';

  @HostListener('error') onError() {
    this.loadImage(this.defaultImageUrl);
  }

  private loadImage(url: string) {
    this.renderer.setAttribute(this.element.nativeElement, 'src', url);
  }
}
