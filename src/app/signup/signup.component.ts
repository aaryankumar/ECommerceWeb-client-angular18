import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
//import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;
  //MatSnackBar is used to show the messages to user
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]], //null is the default value of name
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'close', {
        duration: 5000,
        panelClass: 'error-snackbar',
      });
      return;
    }

    // this.authService.register(this.signupForm.value).subscribe(
    //   (response) => {
    //     //in case of success
    //     this.snackBar.open('Sign up successfull', 'close', { duration: 5000 });
    //     this.router.navigateByUrl('/login');
    //   },

    //   (error) => {
    //     this.snackBar.open('Sign up failed. Please try again', 'Close', {
    //       duration: 5000,
    //       panelClass: 'error-snackbar',
    //     });
    //   }
    // );

    this.authService.register(this.signupForm.value).subscribe({
      next: (v) => {
        //in case of success
        this.snackBar.open('Sign up successfull', 'close', { duration: 5000 });
        this.router.navigateByUrl('/login');
      },
      error: (e) => {
        this.snackBar.open('Sign up failed. Please try again', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      },
    });
  }
}
