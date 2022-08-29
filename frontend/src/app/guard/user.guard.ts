import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(): boolean {
    if (localStorage.getItem('user')) {
      this.router.navigate(['home']);
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
  
}
