import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  static isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    UserStorageService.isBrowser = isPlatformBrowser(platformId);
  }

  public saveToken(token: string): void {
    if (UserStorageService.isBrowser) {
      //remove the exixting token if we have it in the local storage
      window.localStorage.removeItem(TOKEN);
      //Now store a new token which we are getting in the paarameter of this function
      window.localStorage.setItem(TOKEN, token);
    }
  }

  public saveUser(user): void {
    if (UserStorageService.isBrowser) {
      //remove the exixting user if we have it in the local storage
      window.localStorage.removeItem(USER);
      //Now store a new user which we are getting in the paarameter of this function
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): any {
    if (UserStorageService.isBrowser) return localStorage.getItem(TOKEN);
    return null;
  }

  static getUser(): any {
    if (UserStorageService.isBrowser)
      return JSON.parse(localStorage.getItem(USER));
    return null;
  }

  static getUserId(): String {
    const user = this.getUser();
    if (user == null) {
      return ''; //if user is null return empty string
    }
    return user.userId;
  }

  static getUserRole(): String {
    const user = this.getUser();
    if (user == null) {
      return ''; //if user is null return empty string
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken === null) {
      // check the token
      return false;
    }

    const role: String = this.getUserRole();
    return role == 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken === null) {
      // check the token
      return false;
    }

    const role: String = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut(): void {
    if (UserStorageService.isBrowser) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
