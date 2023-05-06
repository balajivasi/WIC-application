import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userData= sessionStorage.getItem('Token');
      if(userData){
        this.authService.isloggedInGuard=true;
        this.authService.loggedIn.next(true);
      }
      if(this.authService.isloggedInGuard){
        return true;
      }
      else{ 
        this.router.navigate(['/login'])
        return false;
      }
  }
  
}
