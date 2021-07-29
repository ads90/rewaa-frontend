import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';  
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (!this.tokenStorageService.isLoggedIn) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }


}