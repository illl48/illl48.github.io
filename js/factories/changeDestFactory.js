app.factory('changeF', [function(){
    var o = {};
    
    o.callbacks = [];
    o.dest={};
    o.changeDest = function(newDest) {
        o.dest=newDest;
        o.callbacks[0](o.dest); 
    }

    o.onDestChanged = function(callback) {
        o.callbacks.push(callback);
    }

    return o;
}]);