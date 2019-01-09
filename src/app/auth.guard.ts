import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { APIService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class NeedAuthGuard implements CanActivate {

	constructor(private api: APIService, private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		
		const redirectUrl = route['_routerState']['url'];

		if (this.api.isLoggedIn()) {
			return true;
		}
		
		var path = '/login';
		// if (localStorage.getItem('cur_page').length > 3)
		// 	path = '/' + localStorage.getItem('cur_page');
		console.log(localStorage.getItem('cur_page'));
		this.router.navigateByUrl(
			this.router.createUrlTree(
				[path], {
					queryParams: {
						redirectUrl
					}
				}
			)
		);

		

		return false;
	}
}