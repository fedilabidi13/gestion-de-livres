import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.scss'
})
export class BookUpdateComponent implements OnInit{
  nomAuteur !: string ; 
  nomLivre !: string ; 
  id !: any; 
  constructor(private apiService : ApiService){}
  ngOnInit(): void {
    this.id = localStorage.getItem('id')
    this.apiService.getBook(this.id).subscribe({
      next: (data) => {
        this.nomAuteur = data.author
        this.nomLivre = data.title
        console.log(data)
      },
      error: (error) => {
        
      },
      complete: () => {
        console.log('Request completed'); 
      }
    });
  }
  onSubmit(){
      const book = {
        id: this.id,
        title: this.nomLivre,
        author: this.nomAuteur
      }
      this.apiService.updateBook(this.id, book).subscribe({
        next: (data) => {
          console.log(data)
        },
        error: (error) => {
          
        },
        complete: () => {
          console.log('Request completed'); 
        }
      });
  }
}
