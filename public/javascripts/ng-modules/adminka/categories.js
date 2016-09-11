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
                $http.post('/admin/view/categories', {query: {parent: null}})
                    .then(function(resp){$scope.categories = resp.data.categories}, function(err){alert(err.data);});
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
                this.editCategory = function(cat){
                    this.form.title = "Редактировать категорию";
                    this.form.tmp = cat;
                    this.form.tmp.timg = null;
                    this.form.show = true;
                    this.form.upload = this.uploadFile;
                    this.form.ok = this.insertCat;

                };
                this.insertCat = function(){                    
                    if(this.tmp.img.name){
                        this.upload(this.tmp.img);                            
                        
                        this.tmp.img = this.tmp.img.name;
                    }
                    $http.post('/admin/save/categories', {item: this.tmp, fields:['img', 'title', 'href', 'code']})
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
                this.getSubcats = function(id){
                    $scope.tmpCat = id;
                    $http.post('/admin/view/categories', {query: {parent: id}})
                        .then(function(resp){$scope.subcats = resp.data.categories; }, function(err){alert(err.data);});
                };
                this.uploadFile = function(file, next){
                    
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
                    
                };
                
                //function changeIcon(cat, tmp){cat.icon = tmp.icon.name;}
                
                this.addSubCat = function(cat){
                    alert('subcat');
                    this.form.title = "Добавить подкатегорию";
                    //this.catForm.cat = cat;
                    this.form.tmp = {img: null, parent: cat};
                    this.form.show = true;
                    this.form.upload = this.uploadFile;
                    this.form.ok = this.insertCat;
                };
                this.removeCat = function(id){
                    $http.post('/admin/remove/categories', {id: id})
                            .then(function(resp){
                                $http.post('/admin/view/categories', {query: {parent: null}})
                                    .then(function(resp){$scope.categories = resp.data.categories;}, function(err){alert(err.data);});
                            }, function(err){alert(err.data);});
                };
                this.test = function(){
                    alert('test');
                };
                
            }],
            controllerAs: "ctg"
        };
    });
    

})();