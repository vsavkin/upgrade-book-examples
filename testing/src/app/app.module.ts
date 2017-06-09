import {Component, NgModule, Input, EventEmitter, Output} from '@angular/core';

import 'angular';

import {downgradeComponent, UpgradeModule} from '@angular/upgrade/static';
import {ClarityModule, Modal} from 'clarity-angular';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
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

angularJsModule.directive('clrModal', downgradeComponent({component: Modal}));
angularJsModule.component('showDialog', {
  template: `
      <clr-modal [clr-modal-open]="$ctrl.isOpen()">
        <h3 class="modal-title">I have a nice title</h3>
        <div class="modal-body">
          <p>But not much to say...</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" ng-click="$ctrl.close()">Cancel</button>
          <button type="button" class="btn btn-primary" ng-click="$ctrl.close()">Ok</button>
        </div>
      </clr-modal>
      
      <button ng-click="$ctrl.open()">Show Dialog</button>
  `,
  controller: function () {
    this._open = false;

    this.isOpen = () => {
      return this._open;
    };

    this.open = () => {
      this._open = true;
    };

    this.close = () => {
      this._open = false;
    };
  }
});


@NgModule({
  imports: [
    UpgradeModule,
    ClarityModule,
    NoopAnimationsModule
  ],
  declarations: [
    DowngradedComponent
  ],
  entryComponents: [
    DowngradedComponent,
    Modal
  ]
})
export class AngularModule {
}


@Component({
  selector: 'app-root',
  template: `
    <!--<clr-modal [(clrModalOpen)]="basic">-->
      <!--<h3 class="modal-title">I have a nice title</h3>-->
      <!--<div class="modal-body">-->
        <!--<p>But not much to say...</p>-->
      <!--</div>-->
      <!--<div class="modal-footer">-->
        <!--<button type="button" class="btn btn-outline" (click)="basic = false">Cancel</button>-->
        <!--<button type="button" class="btn btn-primary" (click)="basic = false">Ok</button>-->
      <!--</div>-->
    <!--</clr-modal>-->
  `
})
export class ShowModalComponent {
  _open = true;
}


@NgModule({
  imports: [BrowserModule, NoopAnimationsModule, ClarityModule, AngularModule],
  declarations: [ShowModalComponent]
  // bootstrap: [ShowModalComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['AngularJSModule']);
  }
}
