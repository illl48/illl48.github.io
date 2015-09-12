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
$scope.showform=false;    
     
}]);