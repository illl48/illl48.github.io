app.controller('resultController', ['$scope','listF','NgMap','changeF', function($scope,listF,NgMap,changeF) {

    $scope.dest = listF.dest;
    $scope.business = listF.businesses['hotels'];
    $scope.map;
    
    NgMap.getMap().then(function(map) {
        $scope.map = map;
    });
    
    $scope.click = function() {
        $scope.map.setCenter(chicago);
    };
     /*
    var vm = this;
    vm.setPositions = function(pos) {
      vm.positions = angular.copy(pos);
    };
    vm.setPositions(vm.positions1);

    $scope.currentIndex = 0;
    $scope.selectNextCustomMarker = function() {
      $scope.map.customMarkers[$scope.currentIndex].removeClass('selected');
      $scope.currentIndex = ($scope.currentIndex+1) % $scope.positions.length;
      $scope.map.customMarkers[$scope.currentIndex].addClass('selected');
      $scope.currentPosition = $scope.positions[$scope.currentIndex];
    }
    */
    $scope.search = function(term){
        if(listF.businesses[term]){
            $scope.business = listF.businesses[term];
            return;
        }
        
        listF.search(term, $scope.dest["latlng"][0], $scope.dest["latlng"][1])
        .error(function(error){
            $scope.error = error;
        })
        .success(function(res){
            listF.businesses[term] = [];
            angular.copy(res.businesses, listF.businesses[term]);
            $scope.business = listF.businesses[term];
        });  
    }
    
    changeF.onDestChanged(function(dest) {
        console.log("onDestChanged");  
        $scope.map.setCenter(new google.maps.LatLng(dest["latlng"][0], dest["latlng"][1]));
        $scope.business = listF.businesses['hotels'];
    });
    
}]);