import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  public saveToken(token: string): void {
    //remove the exixting token if we have it in the local storage
    window.localStorage.removeItem(TOKEN);
    //Now store a new token which we are getting in the paarameter of this function
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user): void {
    //remove the exixting user if we have it in the local storage
    window.localStorage.removeItem(USER);
    //Now store a new user which we are getting in the paarameter of this function
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
}
