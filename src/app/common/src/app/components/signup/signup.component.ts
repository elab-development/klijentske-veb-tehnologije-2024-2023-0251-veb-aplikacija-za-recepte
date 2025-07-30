import { Component } from '@angular/core';
import { FormComponent } from '../../common/form/form.component';

@Component({
  selector: 'app-signup',
  imports: [FormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  onFormSubmit(formData: any) {
    console.log('Signup form submitted:', formData);
    
  }
}
