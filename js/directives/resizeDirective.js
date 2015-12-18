app.directive('resize', ['$window', 
  function($window) {
    return {
      restrict: 'A',
      scope: {
      },
      link: function(scope, ele, attrs) {
          $window.onresize = function() {
            scope.$apply();
          };

          scope.$watch(function() {
              return angular.element($window)[0].innerWidth;
          }, function() {
              console.log("window size: "+angular.element($window)[0].innerWidth);
              scope.$emit("window_size",angular.element($window)[0].innerWidth); 
          });
      }}
}])