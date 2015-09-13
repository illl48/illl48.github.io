app.directive('changeDirective', function () {
  
  var linker = function (scope, element, attrs) {    
    element.on('click', function () {
      scope.$emit('myApp:change', attrs.changeDirective);
    });
  };
  
  return {
    restrict: 'A',
    link: linker
  };
  
});