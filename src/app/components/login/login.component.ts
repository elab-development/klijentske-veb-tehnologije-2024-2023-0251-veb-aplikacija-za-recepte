import { Component } from '@angular/core';
import { AuthService } from '../../common/auth.service';
import { FormComponent } from '../../common/form/form.component';

@Component({
    selector: 'app-login',
    imports: [FormComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    constructor(private authService: AuthService) {}

    onFormSubmit(formData: any) {
        console.log('Login form submitted:', formData);
        
        if (formData.email && formData.password) {
            this.authService
                .login(formData.email, formData.password)
                .subscribe({
                    next: (token) => {
                        
                        
                        
                        
                        
                        this.authService.localStorageService.set(
                            'token',
                            'test-token'
                        );
                    },
                    error: (error) => {
                        console.error('Login error:', error);
                    },
                });
        }
    }
}
