/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('adminka', ['adminTemplates', 'textAngular', 'ngAnimate', 'topPanel', 'sidePanel', 'categories', 'products']);

    app.directive("scroll", function ($window) {
        return function (scope, element, attrs) {
            angular.element($window).bind("scroll", function () {
                if (this.pageYOffset >= 50) {
                    scope.boolPageScrolled = true;
                } else {
                    scope.boolPageScrolled = false;
                }
                scope.$apply();
            });
        };
    });

    app.controller('mainCtrl', function($scope){
        $scope.lang = 'ru';
    });

})();;/**
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

;(function() {
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

})();;/* 
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

;/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('sidePanel', []);

    app.directive('sidePanel', function(){
        return{
            restrict: "E",
            templateUrl: "templates/adminka/side-panel.jade",
            controller: function($scope, $http){
                //alert('top-panel');

            },
            controllerAs: "tp"
        };
    });

})();;/**
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

})();;angular.module('adminTemplates', ['templates/adminka/categories.jade', 'templates/adminka/category-item.jade', 'templates/adminka/products.jade', 'templates/adminka/side-panel.jade', 'templates/adminka/top-panel.jade']);

angular.module("templates/adminka/categories.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/adminka/categories.jade",
    "<!--Created by yaroslav on 8/16/16.\n" +
    "--><popup-msg></popup-msg><ul id=\"main-menu\"><!--div {{categories}}--><li><span class=\"iblock w-50\">img</span><span class=\"iblock m-5 vm\">title</span><span class=\"iblock m-5 vm\">Code</span><span class=\"iblock m-5 vm\">Href </span></li><li ng-repeat=\"cat in categories.items\" class=\"m-10\"><span class=\"iblock w-50 h-50\">   <img ng-if=\"!cat.img.name\" ng-src=\"/images/catalog/{{cat.img}}\" tip=\"icon\"><img ng-if=\"cat.img.name\" ngf-thumbnail=\"cat.img\" tip=\"icon\"></span><span class=\"iblock h-50 m-5 vm\">{{cat.title[lang]}}</span><span class=\"iblock h-50 m-5 vm\">{{cat.code}}</span><span class=\"iblock h-50 m-5 vm\">{{cat.href}}</span><span class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"ctg.editCategory(cat)\" tip=\"Редактировать\" class=\"fa fa-pencil-square-o pointer blue\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.addSubCategory(cat)\" tip=\"Добавить подкатегории\" class=\"fa fa-plus pointer green\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.removeCat(cat._id)\" tip=\"Удалить\" class=\"fa fa-times pointer red\"> </i></span><ul class=\"subitems\"><li ng-repeat=\"scat in cat.subitems\" class=\"m-10\"><span class=\"iblock w-50 h-50\">   <img ng-if=\"!scat.img.name\" ng-src=\"/images/catalog/{{scat.img}}\" tip=\"icon\"><img ng-if=\"scat.img.name\" ngf-thumbnail=\"scat.img\" tip=\"icon\"></span><span class=\"iblock h-50 m-5 vm\">{{scat.title[lang]}}</span><span class=\"iblock h-50 m-5 vm\">{{scat.code}}</span><span class=\"iblock h-50 m-5 vm\">{{scat.href}}</span><span class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"ctg.editCategory(scat)\" tip=\"Редактировать\" class=\"fa fa-pencil-square-o pointer blue\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.addSubCategory(scat)\" tip=\"Добавить подкатегории\" class=\"fa fa-plus pointer green\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.removeSubCat(cat.subitems, $index)\" tip=\"Удалить\" class=\"fa fa-times pointer red\"></i></span><ul class=\"ssubitems\"><li ng-repeat=\"sscat in scat.subitems\" class=\"m-10\"><span class=\"iblock w-50 h-50\">   <img ng-if=\"!sscat.img.name\" ng-src=\"/images/catalog/{{sscat.img}}\" tip=\"icon\"><img ng-if=\"sscat.img.name\" ngf-thumbnail=\"sscat.img\" tip=\"icon\"></span><span class=\"iblock h-50 m-5 vm\">{{sscat.title[lang]}}</span><span class=\"iblock h-50 m-5 vm\">{{sscat.code}}</span><span class=\"iblock h-50 m-5 vm\">{{sscat.href}}</span><span class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"ctg.editCategory(sscat)\" tip=\"Редактировать\" class=\"fa fa-pencil-square-o pointer blue\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.addSubCategory(sscat)\" tip=\"Добавить подкатегории\" class=\"fa fa-plus pointer green\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.removeSubCat(scat.subitems, $index)\" tip=\"Удалить\" class=\"fa fa-times pointer red\"></i></span></li></ul></li></ul></li></ul><button ng-click=\"ctg.addCategory(null)\" class=\"btn pointer\">Добавить Категорию</button><hr><br><br><button ng-click=\"ctg.save()\" class=\"btn\">Сохранить</button><button ng-click=\"ctg.cancel()\" class=\"btn\">Отмена</button><div ng-show=\"ctg.form.show\" class=\"fon\"><div id=\"category-form\" style=\"border: 1px solid green;\"><h3 class=\"m-t-10\">{{ctg.form.title}}</h3><div class=\"m-t-20 m-l-15\"><label class=\"iblock w-100 vt h-20\">Изображение</label><span class=\"iblock w-50 h-50\"><img ng-if=\"!ctg.form.tmp.img.name\" width=\"50\" height=\"50\" ng-src=\"/images/catalog/{{ctg.form.tmp.img}}\" tip=\"icon\"><img ng-if=\"ctg.form.tmp.img.name\" width=\"50\" height=\"50\" ngf-thumbnail=\"ctg.form.tmp.img\"></span><input type=\"file\" ngf-select ng-model=\"ctg.form.tmp.img\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\" class=\"img-btn iblock h-50 vt\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Заголовок</label><input type=\"text\" ng-model=\"ctg.form.tmp.title.ru\" class=\"vm\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Заголовок (en)</label><input type=\"text\" ng-model=\"ctg.form.tmp.title.en\" class=\"vm\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Ссылка</label><input type=\"text\" ng-model=\"ctg.form.tmp.href\" class=\"vm\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Код</label><input type=\"text\" ng-model=\"ctg.form.tmp.code\" class=\"vm\"></div><span class=\"iblock h-50 m-r-20 m-t-30 right\"><button aria-hidden=\"true\" ng-click=\"ctg.form.ok()\" class=\"fa fa-check pointer green m-l-15\"></button><button aria-hidden=\"true\" ng-click=\"ctg.form.cancel()\" class=\"fa fa-times pointer red m-l-15\"></button></span></div></div>");
}]);

angular.module("templates/adminka/category-item.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/adminka/category-item.jade",
    "<span class=\"iblock w-50 h-50\">   <img ng-if=\"!cat.ticon\" ng-src=\"/images/menu/{{cat.icon}}\" ng-show=\"!editCat\" tip=\"icon\"><img ng-if=\"cat.ticon\" ngf-thumbnail=\"cat.ticon\" ng-show=\"!editCat\" tip=\"icon\"></span><span ng-show=\"editCat\" class=\"iblock h-50 vt\"><span class=\"iblock w-50 h-50\"><img width=\"50\" height=\"50\" ngf-thumbnail=\"tmp.icon\"></span><input type=\"file\" ngf-select ng-model=\"tmp.icon\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\" class=\"iblock h-50 vt\"></span><span ng-show=\"!editCat\" class=\"iblock h-50 m-5 vm\">{{cat.title}}</span><span ng-show=\"!editCat\" class=\"iblock h-50 m-5 vm\">{{cat.code}}</span><span ng-show=\"editCat\" class=\"iblock h-50 m-5 lh-50 vt\"><input type=\"text\" ng-model=\"tmp.title\" class=\"vm\"></span><span ng-show=\"editCat\" class=\"iblock h-50 m-5 lh-50 vt\"><input type=\"text\" ng-model=\"tmp.code\" class=\"vm\"></span><span ng-hide=\"editCat\" class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"editCat = !editCat; tmp.title = cat.title; tmp.code = cat.code\" tip=\"Редактировать\" class=\"fa fa-pencil-square-o pointer blue\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ci.addSubCat(cat)\" tip=\"Добавить подкатегорию\" class=\"fa fa-plus pointer green\"></i></span><span ng-show=\"editCat\" class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"ci.accept(tmp, cat); editCat = false\" tip=\"Принять\" class=\"fa fa-check pointer green\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"editCat = !editCat\" tip=\"Отменить\" class=\"fa fa-times pointer red\"></i></span>");
}]);

angular.module("templates/adminka/products.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/adminka/products.jade",
    "<popup-msg></popup-msg><hr><table id=\"catalog\"><tr><th>id</th><th>Name</th><th>Code</th><th>Actions</th></tr><tr ng-repeat=\"p in products\"><td>{{p._id}}</td><td><span class=\"title\">{{p.title}}</span></td><td>{{p.code}}</td><td><button>Edit</button><button>Delete</button></td></tr></table><hr><button ng-click=\"addProd = true\">add</button><hr><div ng-show=\"addProd\" class=\"fon\"><div id=\"product-form\"><ul class=\"tabs\"><li ng-click=\"prod.setTab('props')\">Свойства</li><li ng-click=\"prod.setTab('preview')\">Обзор</li><li ng-click=\"prod.setTab('full')\">Подробно</li></ul><div ng-show=\"prod.checkTab('props')\" class=\"tab-content\"><form-group><label class=\"iblock w-100\">Заголовок</label><input type=\"text\" ng-model=\"form.tmp.title\"></form-group><form-group><label class=\"iblock w-100\">код</label><input type=\"text\" ng-model=\"form.tmp.code\"></form-group><form-group><label class=\"iblock w-100\">Тип</label><select ng-model=\"tIndex\"><option ng-repeat=\"c in categories\" value=\"{{$index}}\">{{c.title}}</option></select><select ng-model=\"tsIndex\" ng-show=\"categories[tIndex].subitems.length &gt; 0\"><option ng-repeat=\"sc in categories[tIndex].subitems\" value=\"{{$index}}\">{{sc.title}}</option></select><select ng-model=\"tssIndex\" ng-show=\"categories[tIndex].subitems[tsIndex].subitems.length &gt; 0\"><option ng-repeat=\"ssc in categories[tIndex].subitems[tsIndex].subitems\" value=\"{{$index}}\">{{ssc.title}}</option></select><span class=\"m-10 w-50\">{{categories[tIndex].code}}</span><span class=\"m-10 w-50\">{{categories[tIndex].subitems[tsIndex].code}}</span><span class=\"m-10 w-50\">{{categories[tIndex].subitems[tsIndex].subitems[tssIndex].code}}</span></form-group></div><div ng-show=\"prod.checkTab('preview')\" class=\"tab-content\"><form-group class=\"h-260\"><label class=\"iblock w-100\">Изображение    </label><div class=\"img-btn\"><input type=\"file\" ngf-select ng-model=\"form.tmp.icon\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\"></div><div class=\"thumb\"><img ngf-thumbnail=\"form.tmp.icon\"></div></form-group><form-group><label class=\"iblock w-p100\">Описание</label><div text-angular ng-model=\"form.tmp.short\" class=\"text-area full-text\"></div></form-group></div><div ng-show=\"prod.checkTab('full')\" class=\"tab-content\"><form-group><label class=\"iblock w-p100\">Изображение</label><div class=\"img-btn\"><input type=\"file\" ngf-select ng-model=\"form.tmp.mainPic\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\"></div><div class=\"thumb\"><img ngf-thumbnail=\"form.tmp.mainPic\"></div><div style=\"clear: both;\"></div><div text-angular ng-model=\"form.tmp.full\" class=\"text-area full-text\"></div></form-group></div><div class=\"footer\"><button ng-click=\"prod.addProd()\">Ok</button><button ng-click=\"addProd = false\">Cancel</button></div></div></div>");
}]);

angular.module("templates/adminka/side-panel.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/adminka/side-panel.jade",
    "<!--Created by yaroslav on 8/16/16.--><div class=\"side-panel\"><div class=\"logo\"><a href=\"/\"><img src=\"/images/logo.png\" height=\"50\"></a></div><ul class=\"menu\"><li><a href=\"/admin/categories\">Категории</a></li><li><a href=\"/admin/users\">Пользователи</a></li><li><a href=\"/admin/catalog\">Каталог</a></li><li><a href=\"/admin/types\">Типы инфоблоков</a></li></ul></div>");
}]);

angular.module("templates/adminka/top-panel.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/adminka/top-panel.jade",
    "<!--Created by yaroslav on 8/16/16.\n" +
    "--><ul><li>Users</li><li>Admins</li></ul>");
}]);
