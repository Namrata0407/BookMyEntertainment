import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 10;

  @Output() onPageChanged = new EventEmitter<number>();

  constructor() {}

  onNext(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChanged.emit(this.currentPage + 1);
    }
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.onPageChanged.emit(this.currentPage - 1);
    }
  }
}
