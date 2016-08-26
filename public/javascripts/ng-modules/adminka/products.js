/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('products', ['ngFileUpload']);

    app.directive('products', function(){
        return{
            restrict: "E",
            templateUrl: "templates/adminka/products.jade",
            controller: function($scope, $http){
                //alert('products');
                $http.post('/admin/view/interface', {name: 'main-menu'})
                    .then(function(resp){$scope.categories = resp.data.interface[0].item}, function(err){alert(err.data);});
                this.cTab = 'props';
                $scope.form = {tmp: {}};
                this.addProd = function(){
                    $http.post('/admin/save/products', {item: this.tmp})
                        .then(function(response){}, function(err){alert(err.data)});
                };
                
                this.setTab = function(tab){
                    this.cTab = tab;
                };
                this.checkTab = function(tab){
                    return this.cTab === tab;
                };
            },
            controllerAs: "prod"
        };
    });

})();

