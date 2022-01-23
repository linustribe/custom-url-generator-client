import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const path = route.url[0].path
      if(path === 'my-account' || path === 'generate-url') {
        if (!this.auth.isLoggedIn) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      } else {
        if (this.auth.isLoggedIn) {
          this.router.navigate(['my-account']);
          return false;
        }
        return true
      }
  }
  
}
