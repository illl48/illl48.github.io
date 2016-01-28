app.factory('changeF', [function(){
    var o = {};
    
    o.callbacks = [];
    o.dest={};
    //if destination changed, execute the callback function
    o.changeDest = function(newDest) {
        o.dest=newDest;
        o.callbacks[0](o.dest); 
    }

    //add callback function
    o.onDestChanged = function(callback) {
        o.callbacks.push(callback);
    }

    return o;
}]);