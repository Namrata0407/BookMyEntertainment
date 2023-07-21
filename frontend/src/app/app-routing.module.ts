import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MoviesComponent } from './movies/movies.component'; // Import the MoviesComponent
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Default route to the HomePageComponent
  { path: 'help', component: ChatbotComponent }, // Route to the ChatbotComponent
  { path: 'movies', component: MoviesComponent }, // Route to the MoviesComponent
  { path: 'login', component: LoginComponent }, // Route to the ChatbotComponent
  { path: 'signup', component: SignupComponent }, // Route to the MoviesComponent
  { path: 'users', component: UserListComponent }, // Route to the MoviesComponent


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
