
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../enviroments/enviroment';

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUser: User | null = null;

    constructor(
        public localStorageService: LocalStorageService,
        private _httpClient: HttpClient
    ) {
        this.loadCurrentUser();
    }

    private loadCurrentUser(): void {
        const userData = this.localStorageService.get<User>('currentUser');
        if (userData) {
            this.currentUser = userData;
        }
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }

    getToken(): string | null {
        const token = this.localStorageService.get<string>('token');
        if (!token) {
            this.localStorageService.set('token', 'mock-token-for-testing');
            return 'mock-token-for-testing';
        }
        return token;
    }

    logout(): void {
        this.localStorageService.remove('token');
        this.localStorageService.remove('currentUser');
        this.currentUser = null;
    }

    login(email: string, password: string): Observable<string> {
        return new Observable(observer => {
            this._httpClient.get<any>('/assets/data.json').subscribe({
                next: (data) => {
                    const user = data.users.find((u: User) => 
                        u.email === email && u.password === password
                    );
                    
                    if (user) {
                        const token = `token_${user.id}_${Date.now()}`;
                        this.currentUser = user;
                        this.localStorageService.set('token', token);
                        this.localStorageService.set('currentUser', user);
                        observer.next(token);
                        observer.complete();
                    } else {
                        observer.error('Invalid email or password');
                    }
                },
                error: (error) => {
                    observer.error('Failed to load user data');
                }
            });
        });
    }
}
