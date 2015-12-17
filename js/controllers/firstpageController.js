app.controller('firstpageController', ['$scope','$http', function($scope,$http) {
    $scope.prewelcome = "Press";
    $scope.postwelcome = "to start.";
    
    $scope.send=function(){
        //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=AIzaSyAMOszNOH-Bf1QX68qGtSD_9QGmJDLlP1g
        $http.jsonp("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=AIzaSyAMOszNOH-Bf1QX68qGtSD_9QGmJDLlP1g")
            .error(function(error){
                   console.log("error: "+error);
            })
            .success(function(res){
                    console.log("res: "+res);
            });
    }
    
}]);