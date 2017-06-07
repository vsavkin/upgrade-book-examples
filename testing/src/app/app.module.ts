import { Component, NgModule, Input, EventEmitter, Output } from '@angular/core';
import { downgradeComponent, UpgradeModule } from '@angular/upgrade/static';

import 'angular';
declare const angular: any;

@Component({
  selector: 'app-downgraded-component',
  template: `
    {{angularInput}}
    <button (click)="angularOutput.next(null)">Click</button>
  `
})
export class DowngradedComponent {
  @Input() angularInput: any;
  @Output() angularOutput = new EventEmitter<any>();
}

const angularJsModule = angular.module('AngularJSModule', []);
angularJsModule.directive('downgradedComponent', downgradeComponent({component: DowngradedComponent}));
angularJsModule.component('angularJsComponent', {
  template: `<downgraded-component [angular-input]="$ctrl.input" (angular-output)="$ctrl.onOutput()"></downgraded-component>`,
  controller: function () {
    this.input = 'beforeClick';

    this.onOutput = () => {
      this.input = 'afterClick';
    };
  }
});


@NgModule({
  imports: [
    UpgradeModule
  ],
  declarations: [
    DowngradedComponent
  ],
  entryComponents: [
    DowngradedComponent
  ]
})
export class AngularModule { }


@NgModule({})
export class AppModule {
  ngDoBootstrap() {
  }
}
