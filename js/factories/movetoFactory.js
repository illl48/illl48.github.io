app.factory('movetoF', ['$window',function($window){
    var o = {};

    //move the selected list to the middle
    o.moveTo = function(listId) {
        if(!document.getElementById(listId)) return;
        var top = document.getElementById(listId).getBoundingClientRect().top;
        var iH = angular.element($window)[0].innerHeight;
        var iW = angular.element($window)[0].innerWidth;   
        var totalpadding =(iW > 583)? Math.floor((iH-52)*0.3)+92 : (iW > 420)? 300 : 244;
        var distance =(top - totalpadding === 0)? 1 : top - totalpadding;
        var up =(distance > 0)? false : true;
        var interval;
        
        $window.scrollBy(0, distance);
        /*
        interval = setInterval(function(){
          if(up){
              if(distance >= 0) clearInterval(interval);
              $window.scrollBy(0, -5);
              distance += 5;    
          }
          else{
              if(distance <= 0) clearInterval(interval);
              $window.scrollBy(0, 5);
              distance -= 5;     
          }
        },1);
        */
    };
    
    //scroll to top
    o.moveToTop = function(){
        $window.scrollTo(0, 0);
    }

    return o;
}]);