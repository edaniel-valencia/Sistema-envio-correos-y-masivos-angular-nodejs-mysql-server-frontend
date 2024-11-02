import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Marketing } from '../../interfaces/marketing';
import { MarketingService } from '../../services/marketing.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [CommonModule, PaginationComponent, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.css'
})
export class MarketingComponent  implements OnInit {


    listMarketing: Marketing[] = []
  
    myUrl: string = "http://localhost:3002/"
    myUrlAssets: string = "assets/marketing/"
    
    baseUrl: string =  this.myUrl+this.myUrlAssets

      //VARIABLE PARA LA PAGINACION
      totalItems: number = 0;
      itemsRegisterPage: number = 10;
      currentPage: number = 1 ;
  
     
      title?: string;
      message?: string;
  
    constructor(
      private _marketingServices: MarketingService,
  
      private route: ActivatedRoute,    
      private toastr: ToastrService,
      private _errorService: ErrorService,
  
    ) {
    
     }
  
    ngOnInit(): void {
      this.Read()
      console.log(this.baseUrl);
      
    }
  
  
   
    onPageChanged(page: number): void{
      this.Read(page)
    }
     
    Read(page: number = 1) {
      this.currentPage = page;
  
      this._marketingServices.ReadAll(page, this.itemsRegisterPage).subscribe({
        next: (data: Marketing[]) => {
          this.totalItems = data.length
          this.listMarketing = data.slice((page-1) * this.itemsRegisterPage, page * this.itemsRegisterPage);
          console.log(data);
        }
      });
    }
  
  
  
  
  }
