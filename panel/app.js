window.App = angular.module('AdoBot', [
  'ui.router',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'ngAnimate',
  'toastr',
  'angular-duration-format',
  'angularMoment',
  'http-auth-interceptor',
  'uiGmapgoogle-maps',
  'angular-loading-bar',
  'templates'
])
  .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    var config = {
      key: 'AIzaSyBnJtiSDyjIppXwy5L11VhxXlLX3pKaabo',
      v: '3.26', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    };
    if ((/herokuapp/).test(window.location.host))
      config.key = 'AIzaSyBnJtiSDyjIppXwy5L11VhxXlLX3pKaabo';
    uiGmapGoogleMapApiProvider.configure(config);
  }])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
  .run([
    '$http',
    '$rootScope',
    function($http, $rootScope) {
      $http.defaults.headers.common.username = localStorage.getItem('username');
      $http.defaults.headers.common.password = localStorage.getItem('password');
      $rootScope.$on('event:auth-loginRequired', function(event, data) {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.location.reload();
      });
    }
  ]);
