import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[receptiInput]',
})
export class ReceptiInputDirective implements OnInit {
    private defaultClasses = [
        'px-4',
        'rounded-full',
        'text-dark',
        'border',
        'border-dark/50',
        'bg-light',
        'focus:ring-0',
        'focus:border-dark/70',
        'transition-colors',
        'duration-200',
        'py-1',
        'outline-none',
    ];

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private control: NgControl
    ) {}
    updateClasses = () => {
        const touched = this.control.touched;
        const valid = this.control.valid;
        this.renderer.removeClass(this.el.nativeElement, 'border-so2');
        this.renderer.removeClass(
            this.el.nativeElement,
            'border-dark/50'
        );

        if (touched && !valid) {
            this.renderer.addClass(this.el.nativeElement, 'border-so2');
        } else {
            this.renderer.addClass(
                this.el.nativeElement,
                'border-dark/50'
            );
        }
    };
    ngDoCheck() {
        this.updateClasses();
    }
    ngOnInit() {
        if (!this.control) return;

        this.defaultClasses.forEach((cls) => {
            this.renderer.addClass(this.el.nativeElement, cls);
        });

        this.updateClasses();

        this.control.statusChanges?.subscribe(() => {
            this.updateClasses();
        });
        this.renderer.listen(this.el.nativeElement, 'blur', () => {
            this.updateClasses();
        });
    }
}
