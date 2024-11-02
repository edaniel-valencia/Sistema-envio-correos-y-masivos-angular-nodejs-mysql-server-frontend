import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr:ToastrService) {}


   messageError(e: HttpErrorResponse){
    if(e.error.message){
      this.toastr.error(e.error.message, 'Error')
    }else{
      this.toastr.error("Hubo un error en el sistemas comunicate con el Admnistrador", 'Error')

    }
   }
}
