app.directive('list', ['$window','$document',
  function($window,$document) {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {

        $document.bind('scroll', function() {
            /*
            console.log("list #"+attrs.list+" height="+ele[0].clientHeight);
            console.log("list #"+attrs.list+"    top="+ele[0].getBoundingClientRect().top);
            console.log("==================");
            */
            var iH = angular.element($window)[0].innerHeight;
            var iW = angular.element($window)[0].innerWidth;
            var top = ele[0].getBoundingClientRect().top;
            var height = ele[0].clientHeight;
            
            if(iW > 583){
                if(Math.floor((iH-52)/2)>top && Math.floor((iH-52)/2)<(top+height)){
                    ele.css('background-color', '#9FD7C9');
                    scope.$emit("currentList", attrs.list); 
                }
                else{
                    ele.css('background-color', 'white');    
                }                  
            }
            else{
                if(390>top && 390<(top+height)){
                    ele.css('background-color', '#9FD7C9');
                    scope.$emit("currentList", attrs.list); 
                }
                else{
                    ele.css('background-color', 'white');    
                }   
            }
        });       
      }}
}])

