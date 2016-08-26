/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('topPanel', []);

    app.directive('topPanel', function(){
        return{
            restrict: "E",
            templateUrl: "templates/adminka/top-panel.jade",
            controller: function($scope, $http){
                //alert('top-panel');

            },
            controllerAs: "tp"
        };
    });

})();