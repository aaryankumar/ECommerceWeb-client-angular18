import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserStorageService } from './services/storage/user-storage.service';
import { Router } from '@angular/router';
//import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  //imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ECommerceWeb';

  constructor(
    private router: Router //private userStorageService: UserStorageService
  ) {}
  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      //whenever routes get changed we need to check and update these variables.
      this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    });
  }

  logout() {
    UserStorageService.signOut();
    this.router.navigateByUrl('login');
  }
}
