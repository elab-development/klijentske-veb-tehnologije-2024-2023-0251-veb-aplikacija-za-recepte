import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../common/form/form.component';
import { ButtonComponent } from '../../common/button/button.component';
import { SidebarComponent, SidebarItem } from '../../common/sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormComponent, ButtonComponent, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  showRecipeForm: boolean = false;
  isSidebarOpen: boolean = false;
  
  sidebarItems: SidebarItem[] = [
    { label: 'Profil', route: '/profile' },
    { label: 'Pretraži', route: '/browse' },
    { label: 'Dodaj recept', route: '/profile' },
    { label: 'Podešavanja', route: '/settings' }
  ];

  constructor(private router: Router) {}

  toggleRecipeForm(): void {
    this.showRecipeForm = !this.showRecipeForm;
  }

  onRecipeSubmit(recipeData: any): void {
    console.log('Recipe submitted:', recipeData);
    alert('Recept je uspešno sačuvan!');
    this.showRecipeForm = false;
  }

  onSelectionChange(event: any, selectNumber: number): void {
    const value = event.target.value;
    console.log(`Select ${selectNumber} changed to:`, value);
  }

  onFilterChange(filterData: {value: string, filterNumber: number}): void {
    console.log(`Filter ${filterData.filterNumber} changed to:`, filterData.value);
  }

  onSidebarItemClick(item: SidebarItem): void {
    if (item.label === 'Dodaj recept') {
      this.toggleRecipeForm();
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  onSidebarToggle(isOpen: boolean): void {
    console.log('Sidebar toggled:', isOpen);
    this.isSidebarOpen = isOpen;
  }
}