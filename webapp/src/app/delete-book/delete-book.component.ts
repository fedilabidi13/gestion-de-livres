import { Component, TemplateRef, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrl: './delete-book.component.scss'
})
export class DeleteBookComponent {
  toastService = inject(ToastService);
  constructor(private apiService: ApiService){}
  delete(template: TemplateRef<any>){
    const id: any = localStorage.getItem('id');
    this.apiService.deleteBook(id).subscribe({
      next: (data) => {
        
      },
      error: (error) => {
        
      },
      complete: () => {
        console.log('Request completed'); // Optional
        window.location.reload();
      }
    });
  }
  showSuccess(template: TemplateRef<any>) {
	}


}
