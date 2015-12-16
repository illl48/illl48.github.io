app.factory('listF', ['$http',function($http){
    var o = {};

    o.dest = {};
    o.dest["address"] = "";
    o.dest["latlng"] = [];
    o.businesses = {};
    
    o.search = function(term, lat, lng) {
        console.log("term="+term+", lat="+lat+", lng="+lng);
        o.dest["address"] = "";
        o.dest["latlng"] = [];
        o.dest["latlng"].push(lat);
        o.dest["latlng"].push(lng);
        return $http.jsonp('http://edwardlai3582.com/yelp?term='+term+'&lat='+lat+'&lng='+lng+'&callback=JSON_CALLBACK');
    };

    return o;
}]);