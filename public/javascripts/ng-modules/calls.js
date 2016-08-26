/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function() {
    var app = angular.module('calls', []);

    app.directive('callBlock', function(){
        return{
            restrict: "E",
            templateUrl: "templates/calls.jade",
            controller: function($location, $scope, $http){
                //alert('top-panel');
//                $scope.path = $location.path();
//                alert($scope.path);
            },
            controllerAs: "hd"
        };
    });

})();