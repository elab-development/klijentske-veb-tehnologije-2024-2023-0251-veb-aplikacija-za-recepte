import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[receptiButton]',
})
export class ReceptiButtonDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {
        const classes = [
            'px-4',
            'py-1',
            'rounded-full',
            'text-md',
            'text-light',
            'bg-so2',
            'border-[2px]',
            'border-separator',
            'hover:border-light',
            'outline-none',
        ];

        classes.forEach((cls) => {
            this.renderer.addClass(this.el.nativeElement, cls);
        });
    }
}
