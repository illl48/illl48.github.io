app.controller('aboutmeController', ['$scope','$window', function($scope,$window) {

$scope.linkedinlink='https://www.linkedin.com/in/edlai48';    
$scope.email='edwardlai3582@gmail.com'; 
    
$scope.gallery=[
    {image: './pics/siteuse/withpete.jpg', description: '# Pete Rock & me'},
    {image: './pics/siteuse/NABLER.jpg', description: '# Toy I got recently!'},
    {image: './pics/siteuse/mocha.jpg', description: '# Mocha lol'},
];

$scope.imagenumber=$scope.gallery.length;    
$scope.selected={value: 0};
//$scope.frontp='';    
$scope.showform=false;    
$scope.frontp=$scope.gallery[0].image;
$scope.frontdescription=$scope.gallery[0].description;    
$scope.backp=$scope.gallery[0].image;
$scope.backdescription=$scope.gallery[0].description;     
$scope.currentside=0; //0 front, 1 back  what we see
$scope.currentnumber=0;    
    
$scope.$on('myApp:change', function (event, data) {
    console.log('On: '+data);
    if(data===$scope.currentnumber) return;
    else{
      $scope.$apply(function () {
        if($scope.currentside==0){
          $scope.backp=$scope.gallery[data].image;
          $scope.backdescription=$scope.gallery[data].description;
          $scope.currentside=1;
          $scope.currentnumber=data;     
          document.querySelector('#fml').classList.toggle('hover'); 
        }
        else{
          $scope.frontp=$scope.gallery[data].image;
          $scope.frontdescription=$scope.gallery[data].description;
          $scope.currentside=0;
          $scope.currentnumber=data;     
          document.querySelector('#fml').classList.toggle('hover'); 
        }     
      }); 
    } 
  });    
    
}]);