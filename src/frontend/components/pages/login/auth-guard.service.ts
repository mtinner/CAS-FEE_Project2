import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {LoginManagingService} from './login-managing.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginManaginService: LoginManagingService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.loginManaginService.isLoggedIn) {
            return true;
        }
        this.loginManaginService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
