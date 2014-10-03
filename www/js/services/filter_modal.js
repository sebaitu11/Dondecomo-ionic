$ionicModal.fromTemplateUrl('templates/partials/tab-restos/_filters.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $scope.items = [
    { name: "peruano" , checked: false},
    { name: "coffee" , checked:false},
    { name: "italiano", checked: false}
  ];

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.selecteds = $scope.items.filter(function(obj){
      return obj.checked == true
    })
    if($scope.selecteds.length > 0){
      $ionicScrollDelegate.scrollTop(true)
      $scope.currentPage = 1;
      getFilteredData(false)
     }else {
      if($scope.selecteds){
        $scope.selecteds = null;
        getScrollData(false);
      }
     }
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
