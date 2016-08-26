/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('sidePanel', []);

    app.directive('sidePanel', function(){
        return{
            restrict: "E",
            templateUrl: "templates/adminka/side-panel.jade",
            controller: function($scope, $http){
                //alert('top-panel');

            },
            controllerAs: "tp"
        };
    });

})();