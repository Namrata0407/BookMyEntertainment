import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MoviesComponent } from './movies/movies.component'; // Import the MoviesComponent

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Default route to the HomePageComponent
  { path: 'help', component: ChatbotComponent }, // Route to the ChatbotComponent
  { path: 'movies', component: MoviesComponent }, // Route to the MoviesComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
