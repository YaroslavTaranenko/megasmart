/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('categories', ['ngFileUpload']);

    app.directive('categories', function(){
        return{
            restrict: "E",
            templateUrl: "templates/adminka/categories.jade",
            controller: ['$scope', 'Upload', '$timeout', '$http', function($scope, Upload, $timeout, $http){
                
//                $http.post('/admin/view/categories', {})
//                    .then(function(resp){$scope.categories = resp.data.categories}, function(err){alert(err.data);});
                $http.post('/admin/view/interface', {name: 'main-menu'})
                    .then(function(resp){$scope.mainMenu = resp.data.interface[0]}, function(err){alert(err.data);});
                this.catForm = {
                    show: false,
                    cancel: function cancel(){
                        this.show = false;
                    }
                };
                this.addCategory = function(){
                    this.catForm.title = "Добавить категорию";
                    this.catForm.tmp = {};
                    this.catForm.show = true;
                    this.catForm.upload = this.uploadFile;
                    this.catForm.ok = this.pushCat;

                };
                this.pushCat = function(){                    
                    if(this.tmp.icon){
                            this.upload(this.tmp.icon);
                            this.tmp.ticon = this.tmp.icon;
                            this.tmp.icon = this.tmp.ticon.name;
                        }
                    $scope.mainMenu.item.push(this.tmp);
                    this.show = false;
                };
                
                this.uploadFile = function(file, next){
                    //alert('uploading');
                    Upload.upload({
                        url:'/admin/upload',
                        data: {'file': file}
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
                this.saveCat = function(){
                    remTicon($scope.mainMenu.item);
                    $http.post('/admin/save/interface', {item: $scope.mainMenu, fields: ['item']})
                        .then(function(response){                            
                            $http.post('/admin/view/interface', {name: 'main-menu'})
                                .then(function(resp){$scope.mainMenu = resp.data.interface[0]}, function(err){alert(err.data);});
                        }, function(err){alert(err.data);});
                    this.show = false;
                };
                
                //function changeIcon(cat, tmp){cat.icon = tmp.icon.name;}
                
                this.addSubCat = function(cat){

                    this.catForm.title = "Добавить подкатегорию";
                    //this.catForm.cat = cat;
                    this.catForm.tmp = {};
                    this.catForm.show = true;
                    this.catForm.upload = this.uploadFile;
                    this.catForm.ok = function(){
                        //alert(cat.title);
                        if(!cat.subitems){
                            cat.subitems = [];
                        }
                        
                        if(this.tmp.icon){
                            this.upload(this.tmp.icon);
                            this.tmp.ticon = this.tmp.icon;
                            this.tmp.icon = this.tmp.ticon.name;
                        }
                        cat.subitems.push(this.tmp);
                        this.show = false;
                    };
                };
                this.removeCat = function(arr, idx){
                    arr.splice(idx, 1);
                };
                this.test = function(){
                    alert('test');
                };
                
            }],
            controllerAs: "ctg"
        };
    });
    app.directive('categoryItem', function(){
        return{
            require: '^^categories',
            restrict: "E",
            scope: {
                cat: '=category',
                idx: '=index'
            },
            templateUrl: "templates/adminka/category-item.jade",
            controller: ['$scope', 'Upload', '$http', function($scope, Upload, $http){
                //this.testc = function(){};
                this.pctrl = undefined;
                this.addSubCat = function(cat){
                    pctrl.addSubCat(cat);
                };
                this.accept = function(tmp, cat){
                    
                    if(tmp.icon){
                        this.uploadFile(tmp.icon);
                        cat.ticon = tmp.icon;
                        cat.icon = tmp.icon.name;
                        tmp.icon = null;
                    }
                    cat.title = tmp.title;
                    cat.code = tmp.code;
                    ///tmp = null;
                };
                this.uploadFile = function(file, next){
                    //alert('uploading');
                    Upload.upload({
                        url:'/admin/upload',
                        data: {'file': file}
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
            controllerAs: 'ci',
            link: function(scope,element,attr, parentCtrl){
                this.pctrl = parentCtrl;
            }
            
        };
    });

})();