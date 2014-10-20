angular.module('restoApp.controllers')
    
.controller('MapCtrl', function($scope, $ionicLoading, $compile,$timeout,LoadingService) {
  function initialize() {
    $scope.myLatlng = new google.maps.LatLng($scope.resto.lat,$scope.resto.lng);

    _directionsRenderer = new google.maps.DirectionsRenderer();

    var mapOptions = {
      center: $scope.myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    
     _directionsRenderer.setMap(map);
    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: $scope.myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
  window.initialize = initialize;
  
  window.loadScript = function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
        'callback=initialize';
    document.body.appendChild(script);
  }

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }
    LoadingService.show(true,"Obteniendo Ubicación");
    navigator.geolocation.getCurrentPosition(function(pos) {
      LoadingService.hide();
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLatlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
      var bounds = new google.maps.LatLngBounds();
      bounds.extend(myLatlng);
      $scope.map.fitBounds(bounds);

      _request = {
        origin: myLatlng,
        destination: $scope.myLatlng,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };

      var directionsService = new google.maps.DirectionsService();
      
      directionsService.route(_request, function (_response, _status) {
        if (_status == google.maps.DirectionsStatus.OK) {
            _directionsRenderer.setDirections(_response);
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