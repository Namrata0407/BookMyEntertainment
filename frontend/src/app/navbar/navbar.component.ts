import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() searchMovie: EventEmitter<string> = new EventEmitter<string>();
  showEntityNavbar: boolean = true;
  isHamburgerMenuOpen: boolean = false;

  constructor(private router: Router) {}

  
  toggleHamburgerMenu() {
    this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
  }

  onSearchMovie(movieTitle: string) {
    const queryParams = { title: movieTitle.trim() };
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }
}


