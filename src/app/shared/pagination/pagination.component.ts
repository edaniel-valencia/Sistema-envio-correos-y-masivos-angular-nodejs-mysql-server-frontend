import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  //VARIABLE PARA LA PAGINACION
  @Input() totalItems: number = 0;
  @Input() itemsRegisterPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();


  get startItem(): number {
    return (this.currentPage - 1) * this.itemsRegisterPage + 1
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsRegisterPage, this.totalItems);
  }

  get totalPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsRegisterPage)
    return pageCount > 1 ? Array(pageCount).fill(0).map((_, i) => i + 1) : []
  }

  onPageChange(page: number): void {
    this.pageChanged.emit(page)
  }


}
