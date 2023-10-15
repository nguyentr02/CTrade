import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(    private router: Router,
    ) {}

  @Output() newSearchEvent = new EventEmitter<string>();
    searchFunc(search?: string) {
      this.newSearchEvent.emit(search);
      console.log(search)
      this.router.navigate(['/market']);

    }
}
