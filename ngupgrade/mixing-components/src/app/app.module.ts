import {BrowserModule} from '@angular/platform-browser';
import {Component, Directive, ElementRef, EventEmitter, Injector, Input, NgModule, Output} from '@angular/core';

import 'angular';
import {downgradeComponent, UpgradeComponent, UpgradeModule} from '@angular/upgrade/static';

declare const angular: any;

/**
 * # Nesting
 *
 * This example illustrates the nesting of components.
 *
 * ## Three Components
 *
 * There are three components in play: AppComponent > angularJSComponent > AngularComponent.
 *
 * * AppComponent is written in Angular and is downgraded to AngularJS.
 * * angularJSComponent is written in AngularJS and is upgraded to Angular.
 * * AngularComponent is written in Angular and is downgraded to AngularJS.
 *
 * So we demonstrate both upgrade and downgrade.
 *
 * ## Inputs/Outputs/Bindings
 *
 * * We start with the `counter` field on the AppComponent class that we pass as `counterTimes2` to angularJsComponent.
 *   We then pass it as `counterTimes4` to AngularComponent.
 * * We propagate the `multiply` event from AngularComponent to angularjsComponent, and then to AppComponent.
 * * We demonstrate the use of two-way bindings by binding `counter`.
 *
 * ## Transclusion/Reprojection
 *
 * We demonstrate the usage of transclusion/reprojection, both `from AngularJS to Angular` and `from Angular to AngularJS`.
 */

const m = angular.module('AngularJsModule', []);

@Component({
  selector: 'app-root',
  template: `
    <div style="background-color: lightblue; padding: 10px; margin: 10px;">
      <h3>AppComponent written in Angular and downgraded to AngularJS</h3>
      <div>counter {{counter}}</div>
      <angularjs-component [counterTimes2]="counter * 2" (multiply)="multiplyCounter($event)" 
                           [(twoWay)]="counter">
        Projected from parent: {{counter}}
      </angularjs-component>
    </div>  
  `
})
export class AppComponent {
  counter = 1;

  multiplyCounter(n: number): void {
    this.counter *= n;
  }
}

@Directive({selector: 'angularjs-component'})
export class AngularJSComponent extends UpgradeComponent {
  @Input() counterTimes2: number;
  @Output() multiply: EventEmitter<number>;

  @Input() twoWay: number;
  @Output() twoWayChange: EventEmitter<number>;

  constructor(ref: ElementRef, inj: Injector) {
    super('angularjsComponent', ref, inj);
  }
}
m.component('angularjsComponent', {
  bindings: {
    counterTimes2: '<',
    multiply: '&',
    twoWay: '='
  },
  template: `
    <div style="background-color: lightcoral; padding: 10px; margin: 10px;">
      <h3>angularjsComponent written in AngularJS and upgraded to Angular</h3>
      <div><ng-transclude></ng-transclude></div>
      <div>Bound via a two-way binding: <input ng-model="$ctrl.twoWay"></div>
      <div>counterTimes2: {{$ctrl.counterTimes2}}</div>
      <div><button ng-click="$ctrl.multiply(2)">Double</button></div>
      <angular-component [counter-times-4]="$ctrl.counterTimes2 * 2" (multiply)="$ctrl.multiply($event)">
        Projected from parent: {{$ctrl.counterTimes2}}
      </angular-component>
    </div>
   `
});

@Component({
  selector: 'angular-component',
  template: `
    <div style="background-color: lightgreen; padding: 10px; margin: 10px;">
      <h3>AngularComponent written in Angular and downgraded to AngularJS</h3>
      <div><ng-content></ng-content></div>
      <div>counterTimes4: {{counterTimes4}}</div>
      <div><button (click)="multiply.next(3)">Triple</button></div>
    </div>
  `
})
export class AngularComponent {
  @Input() counterTimes4: number;
  @Output() multiply = new EventEmitter();
}
m.directive('angularComponent', downgradeComponent({ component: AngularComponent }));


@NgModule({
  declarations: [
    AppComponent,
    AngularJSComponent,
    AngularComponent
  ],
  entryComponents: [
    AppComponent,
    AngularComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    { provide: '$scope', useExisting: '$rootScope' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {
    this.upgrade.bootstrap(document.body, ['AngularJsModule']);
  }
}
