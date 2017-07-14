import {Component, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {module} from './angularjsapp';
import {UpgradeModule} from '@angular/upgrade/static';
import {setUpLocationSync} from '@angular/router/upgrade';
import {setAngularLib} from '@angular/upgrade/static';
import angular from 'angular';

/**
 * This module is written at the beginning of the upgrade process.
 * It does not need to change with the upgrade process.
 */

@Component({template: ``})
export class EmptyComponent {}

@NgModule({
  declarations: [
    EmptyComponent
  ],
  imports: [
    UpgradeModule,
    RouterModule.forChild([
      {path: '**', component: EmptyComponent}
    ])
  ]
})
export class AngularJSModule {
  // The constructor is called only once, so we bootstrap the application
  // only once, when we first navigate to the legacy part of the app.
  constructor(upgrade: UpgradeModule) {
    setAngularLib(angular);
    upgrade.bootstrap(document.body, [module.name]);
    setUpLocationSync(upgrade);
  }
}
