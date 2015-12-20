app.controller('resultController', ['$scope','$window','listF','NgMap','changeF','$location', 'movetoF',function($scope,$window,listF,NgMap,changeF,$location,movetoF) {

    $scope.dest = listF.dest;
    $scope.center = [];
    $scope.business = listF.businesses['hotels'];
    $scope.map;
    $scope.offsetx;
    $scope.currentTerm = "";
    $scope.started = false;
    
    $scope.showDirection = false;
    $scope.directionsOrigin = "";
    $scope.directionsDestination = "";
    
    $scope.getDirection = function(index){
        $scope.directionsOrigin=new google.maps.LatLng($scope.dest["latlng"][0], $scope.dest["latlng"][1]);
        $scope.directionsDestination=new google.maps.LatLng($scope.business[index]['location']['coordinate']['latitude'], $scope.business[index]['location']['coordinate']['longitude']);
        $scope.map.directionsRenderers[0].setMap($scope.map);
        $scope.showDirection = true; 
        movetoF.moveTo("l"+index);
    }
    
    $scope.closeDirection = function(){
        $scope.showDirection = false;
        $scope.map.directionsRenderers[0].setMap(null);
    }
    
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
            $scope.clearMarker();
            $window.scrollTo(0, 0);
            movetoF.moveTo("l0");
            return;
        }
        
        listF.search(term, $scope.dest["latlng"][0], $scope.dest["latlng"][1])
        .error(function(error){
            console.log("ERROR:"+error);
        })
        .success(function(res){
            listF.businesses[term] = [];
            angular.copy(res.businesses, listF.businesses[term]);
            $scope.business = listF.businesses[term];
            $scope.currentTerm=term;
            $scope.clearMarker();
            $window.scrollTo(0, 0);
            movetoF.moveTo("l0");
        });  
    }
    
    $scope.setDestCenter = function(){
        $scope.center[0] = $scope.dest["latlng"][0];
        $scope.center[1] = $scope.dest["latlng"][1];
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));   
    } 
    
    $scope.offsetCenter = function(lat, lng) {
        var scale = Math.pow(2, $scope.map.getZoom());
        var offsetx = $scope.offsetx;
        var offsety = -22;
        var worldCoordinateCenter = $scope.map.getProjection().fromLatLngToPoint(new google.maps.LatLng(lat, lng));
        var pixelOffset = new google.maps.Point((offsetx/scale),(offsety/scale));
        var worldCoordinateNewCenter = new google.maps.Point(
            worldCoordinateCenter.x - pixelOffset.x,
            worldCoordinateCenter.y + pixelOffset.y
        );

        return $scope.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
    }
    
    $scope.clearMarker = function(){
         for(var i=1; i<=$scope.business.length; i++){
            if(!$scope.map.customMarkers[i]) continue;
            $scope.map.customMarkers[i].removeClass('selected');
            $scope.map.customMarkers[i].setZIndex(1);
         }  
    }
    
    changeF.onDestChanged(function(dest) {
        $scope.closeDirection();
        $scope.map.setCenter($scope.offsetCenter(dest["latlng"][0],dest["latlng"][1]));
        $scope.center[0] = dest["latlng"][0];
        $scope.center[1] = dest["latlng"][1];
        $scope.business = listF.businesses['hotels'];
        $scope.currentTerm="hotels";
        $scope.started=true;
        $scope.clearMarker();
        $window.scrollTo(0, 0);
    });
    
    $scope.$on("window_size", function(event, data){
        if(data < 583){
            $scope.offsetx = 0;    
        }
        else{
            $scope.offsetx = Math.floor(data * 0.16);    
        }
        if(!$scope.map) return;
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));
    }); 
    
    $scope.$on("currentList", function(event, data){
        var currentIndex = parseInt(data);
        $scope.center[0] = $scope.business[currentIndex]['location']['coordinate']['latitude'];
        $scope.center[1] = $scope.business[currentIndex]['location']['coordinate']['longitude'];        
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));
        $scope.clearMarker();
        $scope.map.customMarkers[currentIndex+1].addClass('selected'); 
        $scope.map.customMarkers[currentIndex+1].setZIndex(50);        
    }); 

    NgMap.getMap().then(function(map) {
        $scope.map = map;
        $scope.center.push(0);
        $scope.center.push(0);
        $scope.currentTerm="hotels";
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));
        $scope.map.customMarkers.dest.setZIndex(49);
    });
    
    $scope.moveto = function (listId){
        movetoF.moveTo(listId);
    };
    
}]);