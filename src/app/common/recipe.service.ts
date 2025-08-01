import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, BehaviorSubject } from 'rxjs';
import { Recipe } from './card/card.component';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  private allRecipes: Recipe[] = [];
  private nextId = 1;
  
  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<any>('/assets/data.json').subscribe({
      next: (data) => {
        this.allRecipes = [...data.recipes];
        
        const storedRecipes = this.getStoredRecipes();
        if (storedRecipes.length > 0) {
          const existingIds = this.allRecipes.map(r => r.id);
          const newRecipes = storedRecipes.filter(r => !existingIds.includes(r.id));
          this.allRecipes.push(...newRecipes);
        }
        
        this.nextId = Math.max(...this.allRecipes.map(r => r.id)) + 1;
        this.recipesSubject.next([...this.allRecipes]);
      },
      error: (error) => {
        console.error('Error loading initial recipe data:', error);
      }
    });
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  getRecipesByCreator(creatorUsername: string): Observable<Recipe[]> {
    return this.getAllRecipes().pipe(
      map(recipes => recipes.filter(recipe => recipe.creator === creatorUsername))
    );
  }

  getRecipeById(id: number): Observable<Recipe | undefined> {
    return this.getAllRecipes().pipe(
      map(recipes => recipes.find(recipe => recipe.id === id))
    );
  }

  addRecipe(recipeData: any, creatorUsername: string): Observable<Recipe> {
    const newRecipe: Recipe = {
      id: this.nextId++,
      name: recipeData.title,
      creator: creatorUsername,
      taste: recipeData.ukus,
      meat: recipeData.tipMesa || '',
      occasion: recipeData.prilika,
      cookingMethod: recipeData.nacinPripreme,
      timeToMake: parseInt(recipeData.cookingTime),
      ingredientWeight: parseFloat(recipeData.tezinaSastojaka),
      ingredients: recipeData.ingredients,
      description: recipeData.instructions,
      ratings: [],
      averageRating: 0,
      totalRatings: 0
    };

    this.allRecipes.push(newRecipe);
    this.recipesSubject.next([...this.allRecipes]);
    
    // Store only user-added recipes in localStorage (not the original ones)
    const userAddedRecipes = this.allRecipes.filter(r => r.id >= 6); // Assuming original recipes have IDs 1-5
    localStorage.setItem('userRecipes', JSON.stringify(userAddedRecipes));
    
    return of(newRecipe);
  }

  private getStoredRecipes(): Recipe[] {
    const stored = localStorage.getItem('userRecipes');
    return stored ? JSON.parse(stored) : [];
  }
}
