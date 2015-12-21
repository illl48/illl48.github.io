app.factory('listF', ['$http',function($http){
    var o = {};

    o.dest = {};
    o.dest["address"] = "";
    o.dest["latlng"] = [0,0];
    o.businesses = {};
    
    //get result form yelp
    o.search = function(term, lat, lng) {
        o.dest["address"] = "";
        o.dest["latlng"] = [];
        o.dest["latlng"].push(lat);
        o.dest["latlng"].push(lng);
        return $http.jsonp('http://edwardlai3582.com/yelp?term='+term+'&lat='+lat+'&lng='+lng+'&callback=JSON_CALLBACK');
    };

    return o;
}]);