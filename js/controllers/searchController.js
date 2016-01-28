app.controller('searchController', ['$scope','listF','$state','changeF', function($scope,listF,$state,changeF) {
    $scope.showForm = false;
    $scope.showt = "search";
    $scope.address = "";
    $scope.geocoder = new google.maps.Geocoder();
    
    $scope.show = function(){
        $scope.showForm=!$scope.showForm;
        $scope.address = "";
    }
    
    //search list of hotels
    $scope.yelpSearch = function(lat, lng){
        listF.search("hotels", lat, lng)
        .error(function(error){
            $scope.error = error;
        })
        .success(function(res){
            listF.businesses={};
            listF.businesses["hotels"]=[];
            angular.copy(res.businesses, listF.businesses["hotels"]);
            changeF.changeDest(listF.dest);
            listF.dest["address"] = $scope.address;
            $scope.showForm = false;
            $state.go('result');
        });
    }
    
    //search by address
    $scope.search=function() {
        var address = $scope.address;
        $scope.geocoder.geocode({'address': address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var temp = JSON.parse(JSON.stringify(results[0].geometry.location));
                $scope.yelpSearch(temp['lat'], temp['lng']);
            } 
            else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    
    //search by current location
    $scope.searchByCurrent=function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.yelpSearch(position.coords.latitude, position.coords.longitude);
            }, function(error){
                console.log("ERROR:"+error);    
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
  
}]);