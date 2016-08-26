/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function() {
    var app = angular.module('topMenu', []);

    app.directive('topMenu', function(){
        return{
            restrict: "E",
            templateUrl: "templates/top-menu.jade",
            controller: function($scope, $http){
                //alert('top-panel');

            },
            controllerAs: "hd"
        };
    });

})();