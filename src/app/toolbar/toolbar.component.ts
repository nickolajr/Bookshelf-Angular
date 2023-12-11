import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem('accountId') != null;
  }
}
