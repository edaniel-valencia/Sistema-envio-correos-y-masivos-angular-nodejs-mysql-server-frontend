import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './services/error.service';
import { Admin } from './interfaces/admin';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend-envio-correos';

  emailTSE: string = "tsoftwareecuador@gmail.com"
  phoneTSE: string = "593995411589"

  email?: string

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10)]]
    })
  }
  ngOnInit(): void {
    initFlowbite();
  }


  login() {

    if (this.form.invalid) {

      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);

        if (control?.invalid && control.touched) {
          if (control.errors?.['required']) {
            this.toastr.error(`El campo ${key} esta vacio`, 'Error')
          }   else if (control.errors?.['email']) {
            this.toastr.error(`El ${key} tiene un formato incorrecto`, 'Error')
          } else if (control.errors?.['minlength'] || control.errors?.['maxlength']) {
            this.toastr.error(`El ${key} debe tener al menos entre 10 a 15 digitos`, 'Error')
          }
        }
        control?.markAsTouched()
      })
      return
    }

    const admin: Admin = {
      Aemail: this.form.value.email,
      Apassword: this.form.value.password,
    }

    console.log(admin);
    
    this._authService.loginAdmin(admin).subscribe({
      next: () => {
        this.toastr.success("Correo enviado exitosamente", "Correo Enviado")
        this.form.reset()
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.messageError(e)
      },
      complete: () => console.info('complete')
    })

  }
}
