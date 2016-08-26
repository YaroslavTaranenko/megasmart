/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('adminka', ['adminTemplates', 'ngAnimate', 'topPanel', 'sidePanel', 'categories', 'products']);

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

    app.controller('TestCtlr', function(){
        //alert('test');
    });

})();