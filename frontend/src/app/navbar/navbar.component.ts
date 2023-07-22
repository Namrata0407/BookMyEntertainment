import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('searchInputBox') searchInputBox!: ElementRef;
  recognition: any;
  isListening = false;
  micIconColor = 'white';
  spokenText = '';
  showEntityNavbar = true;

  constructor(private router: Router) {
    // Check if the Web Speech API is supported by the browser
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onresult = this.onRecognitionResult.bind(this);
    } else {
      console.error('Web Speech API is not supported in this browser.');
    }
  }

  onRecognitionResult(event: any): void {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;
    this.spokenText = transcript;
  }

  appendSpokenTextToURL(): void {
    const queryParams = { title: this.spokenText.trim() };
    const queryString = new URLSearchParams(queryParams).toString();
    const currentURL = window.location.href;

    if (currentURL.includes('?')) {
      // If there are already query parameters in the URL, append the new one
      const baseUrl = currentURL.split('?')[0];
      window.history.replaceState(null, '', baseUrl + '?' + queryString);
    } else {
      // If there are no query parameters in the URL, add the new one
      window.history.replaceState(null, '', currentURL + '?' + queryString);
    }
  }

  onSearchMovie(movieTitle: string) {
    const queryParams = { title: movieTitle.trim() };
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }


  
  toggleListening(): void {
    if (this.recognition) {
      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
        this.micIconColor = 'white';
        this.appendSpokenTextToURL();
        // this.onSearchMovie(this.spokenText)
        window.location.reload()
      } else {
        this.recognition.start();
        this.isListening = true;
        this.micIconColor = 'red';
        this.searchInputBox.nativeElement.blur(); // Remove focus from the input box while recording
      }
    }
  }



  toggleHamburgerMenu() {
    this.showEntityNavbar = !this.showEntityNavbar;
  }
}
