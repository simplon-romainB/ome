import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from "./users.service";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { FilterpipePipe } from './filterpipe.pipe';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    BlogComponent,
    HomeComponent,
    FilterpipePipe,
    ContactComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:"blog", component: BlogComponent, data: {animation : "blogpage"} },
      {path: "home", component: HomeComponent, data: {animation : "homepage"}},
      {path: "projects", component: ProjectsComponent, data: {animation: "projectspage"}},
      {path: "contact", component: ContactComponent, data: {animation: "contactpage"}}
    ])
  ],
  providers: [ UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
