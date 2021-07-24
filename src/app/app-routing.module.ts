import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SessionGuard } from './shared/guards/session.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { ListHomeComponent } from './components/home/list-home/list-home.component';
import { ListCommunityComponent } from './components/community/list-community/list-community.component';

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
    component: ListHomeComponent,
    canActivate: [SessionGuard]
  },
  {
    path: 'community',
    component: ListCommunityComponent,
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
