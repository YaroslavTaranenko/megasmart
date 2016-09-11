/**
 * Created by yaroslav on 8/10/16.
 */
(function() {
    var app = angular.module('megasmart', ['templates', 'ngAnimate', 'mainMenu', 'mySlider']);

    app.directive("scroll", function ($window) {
        return function (scope, element, attrs) {
            angular.element($window).bind("scroll", function () {
                if (this.pageYOffset >= 50) {
                    scope.boolPageScrolled = true;
                } else {
                    scope.boolPageScrolled = false;
                }
                scope.$apply();
            });
        };
    });
    app.controller('mainCtrl', function($scope){
        $scope.lang = 'ru';
        $scope.slides = [
            {title: 'slide 1', mainPic:'slid1.jpg', desc:''}, 
            {title: 'slide 2', mainPic:'slid2.jpg', desc:''}, 
            {title: 'slide 3', mainPic:'slid3.jpg', desc:''} 
        ];
    });

    app.controller('TestCtlr', function(){
        //alert('test');
        
    });

})();