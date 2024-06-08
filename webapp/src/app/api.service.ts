import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  // Define the HTTP options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Create a new book
  createBook(book: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, book, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('createBook'))
      );
  }

  // Get all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<any[]>('getBooks', []))
      );
  }

  // Get a single book by id
  getBook(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>(`getBook id=${id}`))
      );
  }

  // Update a book by id
  updateBook(id: number, book: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, book, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateBook'))
      );
  }

  // Delete a book by id
  deleteBook(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteBook'))
      );
  }

  // Handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
