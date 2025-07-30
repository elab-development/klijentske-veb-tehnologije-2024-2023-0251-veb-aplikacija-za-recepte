
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../enviroments/enviroment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        public localStorageService: LocalStorageService,
        private _httpClient: HttpClient
    ) {}

    getToken(): string | null {
        return this.localStorageService.get('token');
    }

    logout(): void {
        this.localStorageService.remove('token');
    }

    login(email: string, password: string): Observable<string> {
        console.log(environment.apiUrl);
        return this._httpClient.post<string>(
            `${environment.apiUrl}api/auth/login`,
            {
                email,
                password,
            }
        );
    }
}
