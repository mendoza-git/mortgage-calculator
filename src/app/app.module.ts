import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
import { AppComponent } from './app.component';
import { GraphsComponent } from './graphs/graphs.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'graphs', component: GraphsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GraphsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
