/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('mainMenu', [])
        .directive('mainMenu', function(){
            return{
                restrict: "E",
                templateUrl: "templates/main-menu.jade",
                controller: function($scope, $http){
                    //alert('top-panel');
                    $http.post('/admin/view/interface', {name: 'main-menu'})
                        .then(function(resp){
                            $scope.mainMenu = resp.data.interface[0];
                            $scope.menuLength = {"width": ($scope.mainMenu.item.length * 200)+"px", "margin-left": "10px"};
                            $scope.prevEnd = true;
                            if($scope.mainMenu.item.length <= 5)$scope.nextEnd = true;
                        }, function(err){alert(err.data);});
                    this.next = function(){
                        $scope.cMenu = null;
                        $scope.csMenu = null;
                        var ml = parseInt($scope.menuLength["margin-left"]);
                        
                        if(ml <= (($scope.mainMenu.item.length - 5)*197 - 10)*-1){
                            $scope.nextEnd = true;
                            return;
                        }
                        $scope.menuLength["margin-left"] = (ml - 197) + "px";
                        ml = ml - 197;
                        if(ml <= (($scope.mainMenu.item.length - 5)*197 - 10)*-1){
                            //alert(ml);
                            $scope.nextEnd = true;                            
                        }else{
                            $scope.nextEnd = false;
                        }
                        if(ml >= 10){
                            //alert(ml);
                            $scope.prevEnd = true;                            
                        }else{
                            $scope.prevEnd = false;
                        }
                    };
                    this.prev = function(){
                        $scope.cMenu = null;
                        $scope.scMenu = null;
                        var ml = parseInt($scope.menuLength["margin-left"]);                        
                        if(ml >= 10){
                            $scope.prevEnd = true;
                            return;
                        }
                        $scope.menuLength["margin-left"] = (ml + 197) + "px";
                        ml = ml + 197;
                        if(ml >= 10){
                            //alert(ml);
                            $scope.prevEnd = true;                            
                        }else{
                            $scope.prevEnd = false;
                        }
                        if(ml <= (($scope.mainMenu.item.length - 5)*197 - 10)*-1){
                            //alert(ml);
                            $scope.nextEnd = true;                            
                        }else{
                            $scope.nextEnd = false;
                        }
                    };
                    this.over = function(mi, $event){
                        //alert(mi.title);
                        this.pos($event);
                        if($scope.cMenu == mi){
                            $scope.cMenu = null;
                        }else{
                            $scope.cMenu = mi;
                        }
                    };
                    this.sover = function(smi, $event){
                        if($scope.csMenu == smi){
                            $scope.csMenu = null;
                        }else{
                            $scope.csMenu = smi;
                        }
                        $scope.ssubPos = {"left": (angular.element($event.target).prop('offsetLeft') + 250) + 'px', "top": (angular.element($event.target).prop('offsetTop')) + 'px'};
                    };
                    this.sclear = function(){
                        $scope.csMenu = null;
                    };
                    this.leave = function(){
                        $scope.cMenu = null;
                    };
                    this.pos = function($event){
                        //alert(angular.element($event.target).prop('offsetLeft'));
                        $scope.subPos = {"left": angular.element($event.target).prop('offsetLeft') + 'px', "top": (angular.element($event.target).prop('offsetTop') + 52) + 'px'};
                    }
                },
                controllerAs: "mm"
            };
        });


})();