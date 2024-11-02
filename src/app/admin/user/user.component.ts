import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../services/error.service';
import { Email } from '../../interfaces/email';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PaginationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  listUser: User[] = [];
  fileSelected: boolean = false;
  fileName: string = '';
  fileExcel: File | null = null;

  imageSelected: string | ArrayBuffer | null = null;
  file: File | null = null;
  form: FormGroup;
  title?: string;
  message?: string;

  currentModalId: number | null = null;
  currentModalType: 'Create' | 'CreateUserFile' | 'Read' | 'Delete' | null = null;

  //VARIABLE PARA LA PAGINACION
    totalItems: number = 0;
    itemsRegisterPage: number = 10;
    currentPage: number = 1 ;


  constructor(
    private _userService: UserService,
    private fb: FormBuilder,
    private _emailService: EmailService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ListUserAll();
  }

  ListUserAll(page: number = 1) {

    this.currentPage = page;

    this._userService.ReadAll(page, this.itemsRegisterPage).subscribe({
      next: (data: User[]) => {
        this.totalItems = data.length
        this.listUser = data.slice((page-1) * this.itemsRegisterPage, page * this.itemsRegisterPage);
        console.log(data);
      }
    });
  }

   
  onPageChanged(page: number): void{
    this.ListUserAll(page)
  }


  SendEmailMasive() {
    if (this.form.invalid) {
      this.toastr.error('No haz completado todo los datos', 'Alerta Campos Vacios');
      return;
    }

    const email: Email = {
      title: this.form.value.title,
      message: this.form.value.message
    };

    if (!this.file) {
      this.toastr.error('Selecciona una imagen', 'Alerta Imagen Vacia');
      return;
    }

    console.log(email);

    this._emailService.SendEmailMasive(email, this.file).subscribe({
      next: (v) => {
        this.toastr.success("Correo enviado exitosamente", "Correo Enviado");
        this.form.reset();
        this.resetImage();
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.messageError(e);
      },
      complete: () => console.info('complete')
    });
  }
 
  createCargarFile(): void {
    
    if (!this.fileExcel) {
      this.toastr.error('Por favor, selecciona un archivo', 'Error');
      return;
    }

    this._userService.createUserFile(this.fileExcel).subscribe({
      next: () => {
        this.toastr.success('Archivo procesado correctamente', 'Éxito');
        this.fileExcel = null; // Cambiar a fileExcel
        this.fileSelected = false;
        this.ListUserAll();
        this.closeModal()

      },
      error: (error) => {
        this.toastr.error('Error al cargar el archivo', 'Error');
        console.error(error);
      }
    });
  }



  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.fileExcel = <File>event.target.files[0];
      console.log('Archivo seleccionado:', this.fileExcel.name); // Log para verificar el archivo
      this.fileSelected = true;
    }
  }




  resetImage(): void {
    this.imageSelected = null;
    this.file = null;
    const input = document.getElementById('dropzone-file') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  openModal(modalId: number, modalType: 'Create' | 'CreateUserFile' | 'Read' | 'Delete') {
    this.currentModalId = modalId,
      this.currentModalType = modalType;
  }

  isModalOpen(modalType: 'Create' | 'CreateUserFile' | 'Read' | 'Delete') {
    return this.currentModalType === modalType;
  }

  closeModal() {
    this.currentModalId = null,
      this.currentModalType = null;
  }




}