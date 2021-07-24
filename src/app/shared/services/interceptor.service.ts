import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  isLoading$ = new Subject<boolean>();

  constructor(private router: Router) {}

  show(): void {
    // const URL = this.router.url.replace('/','');
    // if(!URL.includes('home') && !URL.includes('community')) { }
    
    this.isLoading$.next(true);
  }
  hide(): void {
    this.isLoading$.next(false);
  }
}
