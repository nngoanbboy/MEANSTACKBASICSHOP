import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }
  register() {
    this.authService.registerService(this.registerForm.value).subscribe({
      next: (res) => {
        alert('Register successfully');
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
