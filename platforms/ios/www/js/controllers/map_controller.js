angular.module('restoApp.controllers')
    
.controller('MapCtrl', function($scope, $ionicLoading, $compile,$timeout,LoadingService) {
  function initialize() {
    LoadingService.hide();
    $scope.selected = "";
    $scope.triggerDuration = false;
    $scope.myLatlng = new google.maps.LatLng($scope.resto.lat,$scope.resto.lng);

    _directionsRenderer = new google.maps.DirectionsRenderer();

    var mapOptions = {
      center: $scope.myLatlng,
      zoom: 16,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    
     _directionsRenderer.setMap(map);
    //Marker + infowindow + angularjs compiled ng-click
    var contentString = '<div class="info-window"><a>{{resto.name}}</a></div>';
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    $scope.marker = new google.maps.Marker({
      position: $scope.myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    // infowindow.open(map,$scope.marker);

    $scope.map = map;
  }
  window.initialize = initialize;
  
  window.loadScript = function() {
    LoadingService.show();
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
        'callback=initialize';
    document.body.appendChild(script);
  }
  $scope.selectTransport = function(modo){
    $scope.triggerDuration = true;
    if($scope.selected != modo){
      $scope.centerOnMe(modo);
    }
    $scope.selected = modo;
  }
  $scope.centerOnMe = function(modo) {
    if(!$scope.map) {
      return;
    }
    LoadingService.show(true,"Obteniendo Ubicación");
    $scope.marker.setMap(null);

    navigator.geolocation.getCurrentPosition(function(pos) {
      LoadingService.hide();
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLatlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(myLatlng);
      $scope.map.fitBounds(bounds);
      if(modo == "Vehiculo"){
        _request = {
          origin: myLatlng,
          destination: $scope.myLatlng,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
      }else {
        _request = {
          origin: myLatlng,
          destination: $scope.myLatlng,
          travelMode: google.maps.DirectionsTravelMode.WALKING
        };
      }

      var directionsService = new google.maps.DirectionsService();
      
      directionsService.route(_request, function (_response, _status) {
        if (_status == google.maps.DirectionsStatus.OK) {
          _directionsRenderer.setDirections(_response);
          $scope.duration = _response.routes[0].legs[0].duration.text;
          $scope.$apply();
        }
    });


    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };
  
  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };
  
});