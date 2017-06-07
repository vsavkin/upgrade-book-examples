import {AngularModule} from './app.module';
import 'angular-mocks';
import {createAngularJSTestingModule} from './utils';

declare const angular: any;
const mock = angular.mock;

describe('Test Downgraded Components', () => {
  beforeEach(mock.module(createAngularJSTestingModule([AngularModule])));
  beforeEach(mock.module('AngularJSModule'));

  let $compile;
  let $rootScope;

  beforeEach(mock.inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should work', () => {
    const element = $compile('<angular-js-component></angular-js-component>')($rootScope);

    $rootScope.$digest();
    expect(element.html()).toContain('beforeClick');

    element[0].querySelector('button').click();

    $rootScope.$digest();
    expect(element.html()).toContain('afterClick');
  });
});
