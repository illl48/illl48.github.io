app.controller('resultController', ['$scope','$window','listF','NgMap','changeF', function($scope,$window,listF,NgMap,changeF) {

    $scope.dest = listF.dest;
    $scope.center;
    $scope.business = listF.businesses['hotels'];
    $scope.map;
    $scope.offsetx;
    
    NgMap.getMap().then(function(map) {
        $scope.map = map;
        $scope.center = $scope.dest;
        $scope.map.setCenter($scope.offsetCenter($scope.center));
    });
    

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
    
    $scope.setDestCenter = function(){
        console.log("set dest center!");
        $scope.map.setCenter($scope.offsetCenter($scope.dest));    
    } 
    
    $scope.offsetCenter = function(dest) {
        var scale = Math.pow(2, $scope.map.getZoom());
        var offsetx = $scope.offsetx;
        var worldCoordinateCenter = $scope.map.getProjection().fromLatLngToPoint(new google.maps.LatLng(dest["latlng"][0], dest["latlng"][1]));
        var pixelOffset = new google.maps.Point((offsetx/scale),0);
        var worldCoordinateNewCenter = new google.maps.Point(
            worldCoordinateCenter.x - pixelOffset.x,
            worldCoordinateCenter.y + pixelOffset.y
        );

        return $scope.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
    }
    
    changeF.onDestChanged(function(dest) { 
        $scope.map.setCenter($scope.offsetCenter(dest));
        $scope.business = listF.businesses['hotels'];
    });
    
    
    
    $scope.$on("window_size", function(event, data){
        if(data < 583){
            $scope.offsetx = 0;    
        }
        else{
            $scope.offsetx = Math.floor(data * 0.16);    
        }
        console.log("OFFSET SET");
        $scope.map.setCenter($scope.offsetCenter($scope.center));
    }); 
    
}]);