import { Component, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;


@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss'
})
export class BookTableComponent {
  private modalService = inject(NgbModal)
  page = 1;
	pageSize = 4;
	collectionSize !: number;
	books!: any[];
  total !: any;

	constructor(private api: ApiService) {
    api.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log(this.books)
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        console.log('Request completed'); // Optional
        this.collectionSize = this.books.length
        this.total = new BehaviorSubject<number>(this.books.length);

      }
    });
	}
  deleteBookContent(id:any){
    localStorage.setItem('id', id);
    $('#deleteModal').modal('show');
  }
  updateBookContent(id: any){
    localStorage.setItem('id', id)
    $('#updateModal').modal('show');

  }
  addBookContent(){
    $('#addModal').modal('show');

  }

	
}
