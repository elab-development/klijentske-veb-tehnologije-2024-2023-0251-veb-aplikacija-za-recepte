import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ReceptiInputDirective } from '../../common/input/input.directive';
import { ReceptiButtonDirective } from '../../common/button/button-directive';
import { NgClass } from '@angular/common';
import { AuthService } from '../../common/auth.service';

@Component({
    selector: 'app-login',
    imports: [
        ReceptiButtonDirective,
        ReceptiInputDirective,
        ReactiveFormsModule,
        NgClass,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    constructor(private authService: AuthService) {}
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });
    onSubmit(event: any) {
        console.log('Form submitted');
        event.preventDefault();
        if (this.loginForm.valid) {
            this.authService
                .login(
                    this.loginForm.value.email,
                    this.loginForm.value.password
                )
                .subscribe({
                    next: (token) => {
                        // this.authService.localStorageService.set(
                        //     'token',
                        //     token
                        // );
                        //!Privremeno
                        this.authService.localStorageService.set(
                            'token',
                            'test-token'
                        );
                    },
                    error: (error) => {},
                });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
    onLogin() {
        console.log('Login clicked');
    }
    onEmailInput(event: any) {
        this.loginForm.controls['email'].setValue(event.target.value);
    }
    onPasswordInput(event: any) {
        this.loginForm.controls['password'].setValue(event.target.value);
    }
}
