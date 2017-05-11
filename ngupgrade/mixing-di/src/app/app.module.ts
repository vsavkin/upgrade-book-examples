import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import 'angular';
import {downgradeInjectable, UpgradeModule} from '@angular/upgrade/static';

declare const angular: any;

export class AngularInjectable {
  get value() { return 'angularInjectable-value'; }
}

const m = angular.module('AngularJsModule', []);
m.value('angularJsInjectable', 'angularJsInjectable-value');
m.factory('angularInjectable', downgradeInjectable(AngularInjectable));
m.factory('needsAngularInjectable', (angularInjectable: AngularInjectable) => `needsAngularInjectable [got ${angularInjectable.value}]`);

export function needsAngularJsInjectableFactory($injector) {
  return `needsAngularJsInjectable [got ${$injector.get('angularJsInjectable')}]`;
}

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    {
      provide: 'needsAngularJsInjectable',
      useFactory: needsAngularJsInjectableFactory,
      deps: ['$injector']
    },
    AngularInjectable
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['AngularJsModule']);

    console.log(this.upgrade.injector.get('needsAngularJsInjectable'));
    console.log(this.upgrade.$injector.get('needsAngularInjectable'));
  }
}
