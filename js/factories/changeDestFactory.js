app.factory('changeF', [function(){
    var o = {};
    
    o.callbacks = [];
    o.dest={};
    o.changeDest = function(newDest) {
        o.dest=newDest;
        var i = 0;
        for (i = 0; i < o.callbacks.length; i++){
            o.callbacks[i](o.dest);    
        }
    }

    o.onDestChanged = function(callback) {
        o.callbacks.push(callback);
    }

    return o;
}]);