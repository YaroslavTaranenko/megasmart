/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('products', ['ngFileUpload', 'popups']);

    app.directive('products', function(){
        return{
            restrict: "E",
            templateUrl: "templates/adminka/products.jade",
            controller: ['$scope', 'Upload', '$timeout', '$http', function($scope, Upload, $timeout, $http){
                //alert('products');
                $http.post('/admin/view/products', {})
                    .then(function(resp){$scope.products = resp.data.products}, function(err){alert(err.data);});
                $http.post('/admin/view/categories', {query: {parent: null}})
                    .then(function(resp){$scope.categories = resp.data.categories[0].items}, function(err){alert(err.data);});
                this.cTab = 'props';
                $scope.form = {tmp: {}};
                this.addProd = function(){
                    $http.post('/admin/save/products', {item: $scope.form.tmp})
                        .then(function(response){$scope.form.tmp = null; $scope.addProd = null;}, function(err){alert(err.data)});
                };
                
                this.setTab = function(tab){
                    this.cTab = tab;
                };
                this.checkTab = function(tab){
                    return this.cTab === tab;
                };
                this.addProduct = function(){
                    this.form.title = "Добавить продукт";
                    this.form.tmp = {img: null};
                    this.form.show = true;
                    this.form.upload = this.uploadFile;
                    this.form.ok = this.saveProduct;

                };
                this.editCategory = function(product){
                    this.form.title = "Редактировать продукт";
                    this.form.tmp = product;
                    this.form.tmp.timg = null;
                    this.form.show = true;
                    this.form.upload = this.uploadFile;
                    this.form.ok = this.saveProduct;

                };
                this.saveProduct = function(){                    
                    if(this.tmp.img.name){
                        this.upload(this.tmp.img);                            
                        
                        this.tmp.img = this.tmp.img.name;
                    }
                    $http.post('/admin/save/categories', {item: this.tmp, fields:['img', 'title', 'category_id', 'code']})
                        .then(function(resp){
                            $http.post('/admin/view/categories', {query: {parent: this.tmp.parent}})
                                .then(function(resp){
                                    alert(this.tmp.parent);
                                    if(this.tmp.parent){
                                        $scope.subcats = resp.data.categories;
                                    }else{
                                        $scope.categories = resp.data.categories;
                                    }
                                }, function(err){alert(err.data);});
                        }, function(err){alert(err.data);});
                    this.show = false;
                };
                
                this.uploadFile = function(file, next){
                    
                    Upload.upload({
                        url:'/admin/upload',
                        data: {'file': file, location: '/images/products'}
                    }).then(function (response) {
                        next();                        
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        // Math.min is to fix IE which reports 200% sometimes
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                };
            }],
            controllerAs: "prod"
        };
    });

})();

