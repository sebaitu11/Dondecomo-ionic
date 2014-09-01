
angular.module('restoApp', ['ionic', 'restoApp.controllers', 'restoApp.services', 'restoApp.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.useXDomain = true;
  
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.barrios', {
      url: '/barrios',
      views: {
        'tab-restos': {
          templateUrl: 'templates/tab-barrios.html',
          controller: 'BarriosCtrl'
        }
      }
    })

    .state('tab.restos', {
      url: '/barrio/:barrioId',
      views: {
        'tab-restos': {
          templateUrl: 'templates/tab-restos.html',
          controller: 'RestosCtrl'
        }
      }
    })

    .state('tab.resto-detail', {
      url: '/resto/:id',
      views: {
        'tab-restos': {
          templateUrl: 'templates/resto-detail.html',
          controller: 'RestoDetailCtrl'
        }
      }
    })

    .state('tab.carta', {
      url: '/carta',
      views: {
        'tab-carta': {
          templateUrl: 'templates/tab-carta.html',
          controller: 'CartaCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/barrios');

});

