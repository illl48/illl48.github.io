app.controller('resultController', ['$scope','listF','NgMap','changeF', 'movetoF',function($scope,listF,NgMap,changeF,movetoF) {

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
    $scope.currentIndex = 0;
    $scope.Math=Math;
    //show direction
    $scope.getDirection = function(index){
        $scope.currentIndex = index;
        movetoF.moveToTop();
        $scope.directionsOrigin=new google.maps.LatLng($scope.dest["latlng"][0], $scope.dest["latlng"][1]);
        $scope.directionsDestination=new google.maps.LatLng($scope.business[index]['location']['coordinate']['latitude'], $scope.business[index]['location']['coordinate']['longitude']);
        $scope.map.directionsRenderers[0].setMap($scope.map);
        $scope.showDirection = true; 
    }
    
    //close direction
    $scope.closeDirection = function(){
        $scope.showDirection = false;
        setTimeout(function() {
            $scope.moveto("l"+$scope.currentIndex);
        }, 0);
        $scope.map.directionsRenderers[0].setMap(null);
        $scope.directionsOrigin = "";
        $scope.directionsDestination = "";
    }
    
    //what is the current term
    $scope.selectedTerm = function(term){
        if($scope.currentTerm===term){
            return true;
        }
        else{
            return false;
        }
    }
    
    //search list of term
    $scope.search = function(term){
        if(listF.businesses[term]){
            $scope.business = listF.businesses[term];
            $scope.currentTerm=term;
            $scope.clearMarker();
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
            movetoF.moveTo("l0");
        });  
    }
    
    //set destination to the center
    $scope.setDestCenter = function(){
        $scope.center[0] = $scope.dest["latlng"][0];
        $scope.center[1] = $scope.dest["latlng"][1];
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));   
    } 
    
    //set target's latlng to the center of the right part of the window
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
    
    //clear marker
    $scope.clearMarker = function(){
         for(var i=1; i<=$scope.business.length; i++){
            if(!$scope.map.customMarkers[i]) continue;
            $scope.map.customMarkers[i].removeClass('selected');
            $scope.map.customMarkers[i].setZIndex(1);
         }  
    }
    
    //move the selected list to the middle
    $scope.moveto = function (listId){
        movetoF.moveTo(listId);
    };
    
    //reset when destination changed
    changeF.onDestChanged(function(dest) {
        $scope.currentIndex = 0;
        $scope.closeDirection();
        $scope.map.setCenter($scope.offsetCenter(dest["latlng"][0],dest["latlng"][1]));
        $scope.center[0] = dest["latlng"][0];
        $scope.center[1] = dest["latlng"][1];
        $scope.business = listF.businesses['hotels']; 
        $scope.currentTerm="hotels";
        $scope.started=true;
        $scope.clearMarker();
        movetoF.moveTo("l0");
    });
    
    //remove center if window size changed
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
    
    //if current list changed, reset center
    $scope.$on("currentList", function(event, data){
        var currentIndex = parseInt(data);
        $scope.center[0] = $scope.business[currentIndex]['location']['coordinate']['latitude'];
        $scope.center[1] = $scope.business[currentIndex]['location']['coordinate']['longitude'];        
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));
        $scope.clearMarker();
        $scope.map.customMarkers[currentIndex+1].addClass('selected'); 
        $scope.map.customMarkers[currentIndex+1].setZIndex(50);        
    }); 
    
    //initialize map
    NgMap.getMap().then(function(map) {
        $scope.map = map;
        $scope.center.push(0);
        $scope.center.push(0);
        $scope.currentTerm="hotels";
        $scope.map.setCenter($scope.offsetCenter($scope.center[0],$scope.center[1]));
        $scope.map.customMarkers.dest.setZIndex(49);
    });

    
}]);