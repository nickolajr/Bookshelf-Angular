import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';
interface ApiResponse {
  data: {
    Media: Book;
  };
}
@Component({
  selector: 'BookInfo', 
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
public booklist:Book[]=[];
title:string="";

//it has a DI on the parameter
//this line tells us that we have a prop called service- its a design pattern
constructor(private service:BookService) { 
  

}
Title(event:any){
  this.title=event.target.value;
  console.log(this.title);

}
GetByTitle(){
  console.log("component");
  this.service.GetByTitle(this.title).subscribe((response: ApiResponse) => {
    console.log(response);
    const book = response.data.Media;
    this.booklist.push(book);
    console.log(this.booklist);
    console.log(this.booklist[0].title.english);
  });
}
Addbook(book: Book, accountId: number){
  this.service.Addbook(book, accountId).subscribe((response: ApiResponse) => {
    console.log(response);
    
  });
}



}
