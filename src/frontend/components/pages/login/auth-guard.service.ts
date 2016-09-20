import {Injectable}     from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot}    from '@angular/router';
import {LoginService} from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.loginService.isLoggedIn) {
            return true
        }
        this.loginService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
