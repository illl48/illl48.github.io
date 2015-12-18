app.directive('setpadding', ['$window',  
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
              return angular.element($window)[0].innerHeight;
          }, function() {
              var iH = angular.element($window)[0].innerHeight;
              console.log("innerHeight="+iH);
              console.log("padding-top="+Math.floor((iH-52)*0.3));
              console.log("padding-bottom="+Math.floor((iH-52)*0.7));
              ele.css('padding-top', Math.floor((iH-52)*0.3) + 'px');
              ele.css('padding-bottom', Math.floor((iH-52)*0.5) + 'px');
          });
      }}
}])