import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListComponent } from './components/community/list/list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SessionGuard } from './shared/guards/session.guard';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'community',
    component: ListComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [SessionGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
