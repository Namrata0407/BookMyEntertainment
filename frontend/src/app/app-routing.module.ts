import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MoviesComponent } from './movies/movies.component'; // Import the MoviesComponent
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';
import { ShowsComponent } from './shows/shows.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CreateShowsComponent } from './create-shows/create-shows.component';
const routes: Routes = [
  { path: '', component: HomePageComponent }, // Default route to the HomePageComponent
  { path: 'help', component: ChatbotComponent }, // Route to the ChatbotComponent
  { path: 'movies', component: MoviesComponent }, // Route to the MoviesComponent
  { path: 'login', component: LoginComponent }, // Route to the ChatbotComponent
  { path: 'signup', component: SignupComponent }, // Route to the MoviesComponent
  { path: 'userlist', component: UserListComponent }, // Route to the MoviesComponent
  { path: 'shows', component: ShowsComponent },
  { path: 'booking', component: BookingsComponent },
  { path: 'adminhome', component: AdminPageComponent },
    { path: 'admin', component: AdminLoginComponent },
    { path: 'createshow', component: CreateShowsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
