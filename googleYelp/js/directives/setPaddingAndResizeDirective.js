app.directive('spar', ['$window',  
  function($window) {
    return {
      restrict: 'A',
      scope: {
      },
      link: function(scope, ele, attrs) {
          //keep first item in the list in the middle
          var setPading = function(){
              var iH = angular.element($window)[0].innerHeight;
              if(angular.element($window)[0].innerWidth>583){
                  ele.css('padding-top', Math.floor((iH-52)*0.3) + 'px');
                  ele.css('padding-bottom', Math.floor((iH-52)*0.5) + 'px');       
              }
              else{
                  ele.css('padding-top', '0px');
                  ele.css('padding-bottom','0px');    
              }
              scope.$emit("window_size",angular.element($window)[0].innerWidth); 
          }
          
          $window.onresize = function() {
              scope.$apply();
          };

          scope.$watch(function() {
              return angular.element($window)[0].innerHeight;
          }, setPading);
          
          scope.$watch(function() {
              return angular.element($window)[0].innerWidth;
          }, setPading);
          
      }}
}])