app.directive("checkposition", function($window) {
  return {
        restrict: 'A',
        link: function(scope, element, attrs){
            
          
            
          element.bind('mouseenter',function() {
            console.log('=======');
          ptop=   element[0].getBoundingClientRect().top;
          console.log('ptop='+ptop);
          pbottom=element[0].getBoundingClientRect().bottom;
          console.log('pbottom='+pbottom);
          wintop=80;
          winbottom=$window.innerHeight;  
              
            if(ptop<wintop&&pbottom>wintop){
                yd=wintop-ptop;  
                console.log('yd='+yd); 
                /*
                idd = setInterval(function(){
                  if(yd<=0) clearInterval(idd);
                  $window.scrollBy(0, -10);
                    console.log('scroll down');
                  yd-=10;
                },10);
                */
                $window.scrollBy(0, -1*yd);
              }
              
              if(ptop<winbottom&&pbottom>winbottom){
                
                yu=pbottom-winbottom;  
                console.log('yu='+yu); 
                /*  
                idu = setInterval(function(){
                  if(yu<=0) clearInterval(idu);
                  $window.scrollBy(0, 10);
                    console.log('scroll up ');
                  yu-=10;
                },10);
                */
                 $window.scrollBy(0, yu); 
              }   
          });
        }
  };
});