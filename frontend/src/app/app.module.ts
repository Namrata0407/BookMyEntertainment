import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ShowsComponent } from './shows/shows.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CreateShowsComponent } from './create-shows/create-shows.component';
import { UpdateShowDialogComponent } from './update-show-dialog/update-show-dialog.component';
import { AddMovieModalComponent } from './add-movie-modal/add-movie-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BackToTopComponent,
    FooterComponent,
    NavbarComponent,
    ChatbotComponent,
    MoviesComponent,
    LoginComponent,
    SignupComponent,
    UserListComponent,
    UpdateUserDialogComponent,
    PaginationComponent,
    ShowsComponent,
    BookingsComponent,
    AdminPageComponent,
    AdminLoginComponent,
    CreateShowsComponent,
    UpdateShowDialogComponent,
    AddMovieModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add FormsModule here
    HttpClientModule, // Add HttpClientModule here
    BrowserAnimationsModule, // Add BrowserAnimationsModule here
    MatSnackBarModule, // Add MatSnackBarModule here
    MatDialogModule,
    CarouselModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
