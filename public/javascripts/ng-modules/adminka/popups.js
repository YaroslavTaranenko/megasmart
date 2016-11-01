(function() {
    var app = angular.module('popups', [])
    .directive('popupMsg', function(){
        return{
            restrict: "E",
            template: '<div id="pop" ng-show="popvisible"><span>{{pMsg}}</span><button ng-click="popvisible = false">Ok</button></div>',
            controller: ['$scope', '$timeout', function($scope, $timeout){
                $scope.pMsg = "Hello world";
                $scope.popvisible = false;


                $scope.popShow = function(msg){
                    $scope.pMsg = msg;
                    $scope.popvisible = true;
                    $timeout(function(){$scope.popvisible = false;}, 3000);
                    //alert('It\'s work');
                };
            }],
            controllerAs: "pop"
        };
    });

})();