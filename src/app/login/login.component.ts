import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MaxValidator,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { emit } from 'process';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe({
      next: (v) => {
        //in case of success
        // this.snackBar.open('Login Success', 'ok', { duration: 5000 });
        // this.router.navigateByUrl('/login');
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin/dashboard');
        } else if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('customer/dashboard');
        }
      },
      error: (e) => {
        this.snackBar.open('Bad credentials', 'ERROR', {
          duration: 5000,
        });
      },
    });
  }
}
