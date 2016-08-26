/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('mySlider', []);

    app.directive('mySlider', function(){
        return{
            restrict: "E",
            templateUrl: "templates/slider.jade",
            scope: {
                slids: "="
            },
            controller:['$scope', '$http', '$timeout', function($scope, $http, $timeout){
                $scope.cIndex = 0;
                $scope.next = function(){
                    
                    if($scope.cIndex >= $scope.slids.length - 1){
                        $scope.cIndex = 0;
                    }else{
                        $scope.cIndex++;
                    }
                    //alert($scope.cIndex);
                    $scope.changeSlide();
                };
                $scope.changeSlide = function(){
                    
                    for(var i = 0; i < $scope.slids.length; i++){
                        $scope.slids[i].show = false;
                    };
                    
                    $scope.slids[$scope.cIndex].show = true;
                    //alert($scope.slids.length);
                };
                $scope.showSlide = function(idx){                    
                    if(idx > ($scope.slids.length - 1)){
                        return;
                    }else{
                        $scope.cIndex = idx;
                    }
                    
                    $scope.changeSlide();
                };
                $scope.play = function() {
                    //alert('ok');
                    timeout = $timeout(
                        function() {
                            $scope.next();
                            $scope.play();
                            
                        }, 2000
                    );
                };
                //this.showSlide(0);
                
                $scope.play();
            }],
            controllerAs: "sl"
        };
    });

})();

