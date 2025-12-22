import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InscriptionService } from '../Service/inscription.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  emailAlreadyExists = false;

  constructor(
    private fb: FormBuilder,
    private inscriptionService: InscriptionService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(2)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],

        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],

        addressNumero: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        addressRue: ['', [Validators.required, Validators.minLength(3)]],
        addressCode: ['', [Validators.required, Validators.pattern(/^\d{4,5}$/)]]
      },
      {
        validators: this.passwordsMatchValidator
      }
    );

    this.registerForm.get('email')?.valueChanges.subscribe(() => {
      this.emailAlreadyExists = false;
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.emailAlreadyExists = false;

    const f = this.registerForm.value;

    const user = {
      name: f.lastname,
      firstname: f.firstname,
      email: f.email,
      password: f.password,
      adresse: `${f.addressRue} ${f.addressNumero}, ${f.addressCode}`,
      id_Role: 2
    };

    this.inscriptionService.register(user).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/connection']), 1500);
      },
      error: (err) => {
        this.loading = false;

        console.log('ERREUR BACKEND:', err);

        const errorMsg =
          err.error?.message ||
          err.error?.Message ||
          err.error ||
          '';

        if (errorMsg.toString().toLowerCase().includes('email')) {
          this.emailAlreadyExists = true;
          this.registerForm.get('email')?.setErrors({ emailExists: true });
        } else {
          this.errorMessage = 'Erreur lors de l’inscription';
        }
      }
    });
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get addressNumero() { return this.registerForm.get('addressNumero'); }
  get addressRue() { return this.registerForm.get('addressRue'); }
  get addressCode() { return this.registerForm.get('addressCode'); }
}
