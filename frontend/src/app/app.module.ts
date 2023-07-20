import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MoviesComponent } from './movies/movies.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BackToTopComponent,
    FooterComponent,
    NavbarComponent,
    ChatbotComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule // Add the FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
