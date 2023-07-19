import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css']
})
export class BackToTopComponent {
  // Set a threshold for scrolling, after which the button will be shown
  private readonly SCROLL_THRESHOLD = 300;
  showBackToTop = false;

  // Listen for window scroll event
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset >= this.SCROLL_THRESHOLD;
  }

  // Scroll to top when the button is clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
