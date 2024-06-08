import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.scss'
})
export class BookAddComponent {
  nomLivre !: string; 
  nomAuteur !: string; 
  constructor(private apiService : ApiService){}
  onSubmit(){
    console.log(this.nomAuteur)
    console.log(this.nomLivre)
    const book={
      title: this.nomLivre,
      author: this.nomAuteur
    }
    this.apiService.createBook(book).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        
      },
      complete: () => {
        console.log('Request completed'); 
        window.location.reload()
      }
    });
  }

}
