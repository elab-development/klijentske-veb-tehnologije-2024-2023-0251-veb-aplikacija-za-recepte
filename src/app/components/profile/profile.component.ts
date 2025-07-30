import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../common/button/button.component';
import { FormComponent } from '../../common/form/form.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ButtonComponent, FormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  showRecipeForm: boolean = false;

  toggleRecipeForm() {
    this.showRecipeForm = !this.showRecipeForm;
  }

  onRecipeSubmit(recipeData: any) {
    console.log('Recipe submitted:', recipeData);
    
    
    this.showRecipeForm = false;
    alert('Recept je uspešno sačuvan!');
  }
}
