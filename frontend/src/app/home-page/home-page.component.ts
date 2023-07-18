import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isHamburgerMenuOpen = false;
  slides: HTMLElement[] = []; // Initialize the slides property with an empty array
  currentIndex: number = 0;

  toggleHamburgerMenu() {
    this.isHamburgerMenuOpen = !this.isHamburgerMenuOpen;
  }

  // Close the hamburger menu when clicking outside of it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.isHamburgerMenuOpen = false;
  }

  ngOnInit() {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.slides[this.currentIndex].classList.add('active');
    setInterval(this.slideNext.bind(this), 2000); // Adjust the interval time (e.g., 2000ms for 2 seconds)
  }

  slideNext() {
    this.slides[this.currentIndex].classList.remove('active');
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.slides[this.currentIndex].classList.add('active');
  }

  jumpToSlide(slide: HTMLElement) {
    this.slides[this.currentIndex].classList.remove('active');
    this.currentIndex = this.slides.indexOf(slide);
    this.slides[this.currentIndex].classList.add('active');
  }
  
}
