/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('categories', ['ngFileUpload', 'popups']);

    app.directive('categories', function(){
        return{
            restrict: "E",
            templateUrl: "templates/adminka/categories.jade",
            controller: ['$scope', 'Upload', '$timeout', '$http', function($scope, Upload, $timeout, $http){
                
//                $http.post('/admin/view/categories', {})
//                    .then(function(resp){$scope.categories = resp.data.categories}, function(err){alert(err.data);});
                $http.post('/admin/view/categories', {query: {parent: null}})
                    .then(function(resp){$scope.categories = resp.data.categories[0]}, function(err){alert(err.data);});
                
                this.form = {
                    show: false,
                    cancel: function cancel(){
                        this.show = false;
                    }
                };
                this.addCategory = function(parent){
                    this.form.title = "Добавить категорию";
                    this.form.tmp = {img: null, parent: parent};
                    this.form.show = true;
                    this.form.upload = this.uploadFile;
                    this.form.ok = this.insertCat;

                };
                this.addSubCategory = function(cat){
                    this.form.title = "Добавить категорию";
                    this.form.tmp = {img: null};
                    
                    this.form.parent = cat;
                    this.form.show = true;
                    this.form.upload = this.uploadFile;
                    this.form.ok = this.addSubcat;

                };
                this.editCategory = function(cat){
                    this.form.title = "Редактировать категорию";
                    this.form.tmp = cat;
                    this.form.tmp.timg = null;
                    this.form.show = true;
                    this.form.upload = this.uploadFile;
                    this.form.ok = function(){this.show = false;};

                };
                this.insertCat = function(){                    
                    if(this.tmp.img.name){
                        this.upload(this.tmp.img);                            
                        
                        this.tmp.img = this.tmp.img.name;
                    }
                    if($scope.categories == null)$scope.categories = {items: []};
                    if($scope.categories.items == null)$scope.categories.items = [];
                    $scope.categories.items.push(this.tmp);
                    this.show = false;
                };
                this.addSubcat = function(){
                    if(this.tmp.img.name){
                        this.upload(this.tmp.img);                                                    
                        this.tmp.img = this.tmp.img.name;
                    }
                    if(this.parent == null){
                        return;
                    }else{
                        if(this.parent.subitems == null)this.parent.subitems = [];
                        this.parent.subitems.push(this.tmp);
                    }
                    this.show = false;
                };
                this.uploadFile = function(file, next){
                    
                    Upload.upload({
                        url:'/admin/upload',
                        data: {'file': file, location: '/images/catalog'}
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
                function remTicon(arr){
                    for(var i = 0; i < arr.length; i++){
                        arr[i].ticon = null;
                        if(arr[i].subitems){
                            remTicon(arr[i].subitems);
                        }
                    }
                };
                this.save = function(){                    
                    $http.post('/admin/save/categories', {item: $scope.categories , fields:['items']})
                        .then(function(resp){
                            $http.post('/admin/view/categories', {})
                                .then(function(resp){
                                    
                                    $scope.categories = resp.data.categories[0];
                                    $scope.popShow('Данные успешно сохранены.');
                                }, function(err){alert(err.data);});
                        }, function(err){alert(err.data);});
                };
                
                //function changeIcon(cat, tmp){cat.icon = tmp.icon.name;}
                
                
                this.removeCat = function(id){
                    $http.post('/admin/remove/categories', {id: id})
                            .then(function(resp){
                                $http.post('/admin/view/categories', {query: {parent: null}})
                                    .then(function(resp){$scope.categories = resp.data.categories[0];}, function(err){alert(err.data);});
                            }, function(err){alert(err.data);});
                };
                this.removeSubCat = function(arr, index){
                    arr.splice(index, 1);
                }
                this.test = function(){
                    alert('test');
                };
                
            }],
            controllerAs: "ctg"
        };
    });
    

})();

