declare const angular: any;
const mock = angular.mock;

import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export function createAngularJSTestingModule(modules: any[]): string {
  return angular.module('$$angularJSTestingModule', [])
    .factory('$$angularInjector', ($injector: any) => {
      TestBed.configureTestingModule({
        imports: modules,
        providers: [{ provide: '$injector', useFactory: () => $injector }]
      });

      return TestBed.get(Injector);
    }).name;
}
