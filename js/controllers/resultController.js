app.controller('resultController', ['$scope','$window','listF','NgMap','changeF', function($scope,$window,listF,NgMap,changeF) {

    $scope.dest = listF.dest;
    $scope.center=[];
    $scope.business = listF.businesses['hotels'];
    $scope.map;
    $scope.offsetx;
    $scope.currentTerm="";
    $scope.started=false;
    
    NgMap.getMap().then(function(map) {
        $scope.map = map;
            var tempdest = {};
    tempdest["address"] = "";
    tempdest["latlng"] = [0,0];
        //$scope.center = tempdest;//$scope.dest;
        $scope.center.push(tempdest["latlng"][0]);
        $scope.center.push(tempdest["latlng"][1]);
        $scope.currentTerm="hotels";
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));
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
    $scope.selectedTerm = function(term){
        if($scope.currentTerm===term){
            return true;
        }
        else{
            return false;
        }
    }
    
    $scope.search = function(term){
        if(listF.businesses[term]){
            $scope.business = listF.businesses[term];
            $scope.currentTerm=term;
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
            $scope.currentTerm=term;
        });  
    }
    
    $scope.setDestCenter = function(){
        console.log("set dest center!");
        $scope.center[0] = $scope.dest["latlng"][0];
        $scope.center[1] = $scope.dest["latlng"][1];
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));    
    } 
    
    $scope.offsetCenter = function(lat, lng) {
        var scale = Math.pow(2, $scope.map.getZoom());
        var offsetx = $scope.offsetx;
        var worldCoordinateCenter = $scope.map.getProjection().fromLatLngToPoint(new google.maps.LatLng(lat, lng));
        var pixelOffset = new google.maps.Point((offsetx/scale),(-40/scale));
        var worldCoordinateNewCenter = new google.maps.Point(
            worldCoordinateCenter.x - pixelOffset.x,
            worldCoordinateCenter.y + pixelOffset.y
        );

        return $scope.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
    }
    
    changeF.onDestChanged(function(dest) { 
        $scope.map.setCenter($scope.offsetCenter(dest["latlng"][0],dest["latlng"][1]));
        //$scope.center = dest;
        $scope.center[0] = dest["latlng"][0];
        $scope.center[1] = dest["latlng"][1];
        $scope.business = listF.businesses['hotels'];
        $scope.currentTerm="hotels";
        $scope.started=true;
    });
    
    
    
    $scope.$on("window_size", function(event, data){
        if(data < 583){
            $scope.offsetx = 0;    
        }
        else{
            $scope.offsetx = Math.floor(data * 0.16);    
        }
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));
    }); 
    
    $scope.$on("currentList", function(event, data){
        var currentIndex = parseInt(data);
        $scope.center[0] = $scope.business[currentIndex]['location']['coordinate']['latitude'];
        $scope.center[1] = $scope.business[currentIndex]['location']['coordinate']['longitude'];        
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));
    }); 
    
}]);