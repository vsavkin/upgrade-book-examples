import 'angular';
import 'angular-ui-router';

declare const angular: any;

export const module = angular.module('AngularJSApp', ['ui.router']);

module.config(($locationProvider, $stateProvider) => {
  $locationProvider.html5Mode(true);

  $stateProvider.state('angularjs_a', {
    url: '/angularjs_a',
    template: `
      <div style="background-color: yellow">
        <div>AngularJS A!</div>
        <div><a href="/angular_a">Go to Angular A</a></div>
        <div><a href="/angular_b">Go to Angular B</a></div>
        <div>Go to AngularJS A</div>
        <div><a href="/angularjs_b">Go to Angular JS B</a></div>
      </div>
    `
  });

  $stateProvider.state('angularjs_b', {
    url: '/angularjs_b',
    template: `
      <div style="background-color: yellow">
        <div>AngularJS B!</div>
        <div><a href="/angular_a">Go to Angular A</a></div>
        <div><a href="/angular_b">Go to Angular B</a></div>
        <div><a href="/angularjs_a">Go to Angular JS A</a></div>
        <div>Go to AngularJS B</div>
      </div>
    `
  });

  $stateProvider.state('sink', {
    url: '/*path',
    template: ''
  });
});

module.run(($rootScope) => {
  console.log('Running AngularJS application');

  $rootScope.$on('$stateChangeStart', (e, toState, toParams) => {
    console.log('$stateChangeStart', toState, toParams);
  });
});
