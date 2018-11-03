import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

/**
 *
 * @export
 * @interface CanComponentDeactivate
 * accpets nothing but returns a observable or a promise or just a boolean.
 */
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
 }

 @Injectable()
 export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  /**
   *
   *
   * @param {CanComponentDeactivate} component
   * @param {ActivatedRouteSnapshot} currentRoute
   * @param {RouterStateSnapshot} currentState
   * @param {RouterStateSnapshot} [nextState]
   * @returns {(Observable<boolean> | Promise<boolean> | boolean)}
   */
  canDeactivate(component: CanComponentDeactivate,
                 currentRoute: ActivatedRouteSnapshot,
                 currentState: RouterStateSnapshot,
                 nextState?: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
     return component.canDeactivate ? component.canDeactivate() : true;
   }
 }

