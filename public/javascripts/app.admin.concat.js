/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('adminka', ['adminTemplates', 'ngAnimate', 'topPanel', 'sidePanel', 'categories', 'products']);

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

    app.controller('TestCtlr', function(){
        //alert('test');
    });

})();;/**
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

})();;/* 
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
    "\n" +
    "--><ul id=\"main-menu\"><li ng-repeat=\"cat in mainMenu.item\" class=\"m-10\"><category-item category=\"cat\"></category-item><span class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.removeCat(mainMenu.item, $index)\" tip=\"Удалить\" class=\"fa fa-times pointer red\"></i></span><ul ng-repeat=\"sc in cat.subitems\" class=\"subitems\"><li><category-item category=\"sc\"></category-item><span class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.removeCat(cat.subitems, $index)\" tip=\"Удалить\" class=\"fa fa-times pointer red\"></i></span></li><ul ng-repeat=\"ssc in sc.subitems\" class=\"ssubitems\"><li><category-item category=\"ssc\"></category-item><span class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.removeCat(sc.subitems, $index)\" tip=\"Удалить\" class=\"fa fa-times pointer red\"></i></span></li></ul></ul></li></ul><button ng-click=\"ctg.addCategory()\" class=\"btn pointer\">Добавить Категорию</button><hr class=\"m-t-10\"><button ng-click=\"ctg.saveCat()\" class=\"btn pointer m-t-20\">Сохранить</button><button ng-click=\"ctg.saveCat()\" class=\"btn pointer m-l-10\">Отменить</button><div ng-show=\"ctg.catForm.show\" class=\"fon\"><div id=\"category-form\" style=\"border: 1px solid green;\"><h3 class=\"m-t-10\">{{ctg.catForm.title}}</h3><div class=\"m-t-20 m-l-15\"><label class=\"iblock w-100 vt h-20\">Изображение</label><span class=\"iblock w-50 h-50\"><img width=\"50\" height=\"50\" ngf-thumbnail=\"ctg.catForm.tmp.icon\"></span><input type=\"file\" ngf-select ng-model=\"ctg.catForm.tmp.icon\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\" class=\"iblock h-50 vt\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Заголовок</label><input type=\"text\" ng-model=\"ctg.catForm.tmp.title\" class=\"vm\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Код</label><input type=\"text\" ng-model=\"ctg.catForm.tmp.code\" class=\"vm\"></div><span class=\"iblock h-50 m-r-20 m-t-30 right\"><button aria-hidden=\"true\" ng-click=\"ctg.catForm.ok()\" class=\"fa fa-check pointer green m-l-15\"></button><button aria-hidden=\"true\" ng-click=\"ctg.catForm.cancel()\" class=\"fa fa-times pointer red m-l-15\"></button></span></div></div>");
}]);

angular.module("templates/adminka/category-item.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/adminka/category-item.jade",
    "<span class=\"iblock w-50 h-50\">   <img ng-if=\"!cat.ticon\" ng-src=\"/images/menu/{{cat.icon}}\" ng-show=\"!editCat\" tip=\"icon\"><img ng-if=\"cat.ticon\" ngf-thumbnail=\"cat.ticon\" ng-show=\"!editCat\" tip=\"icon\"></span><span ng-show=\"editCat\" class=\"iblock h-50 vt\"><span class=\"iblock w-50 h-50\"><img width=\"50\" height=\"50\" ngf-thumbnail=\"tmp.icon\"></span><input type=\"file\" ngf-select ng-model=\"tmp.icon\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\" class=\"iblock h-50 vt\"></span><span ng-show=\"!editCat\" class=\"iblock h-50 m-5 vm\">{{cat.title}}</span><span ng-show=\"!editCat\" class=\"iblock h-50 m-5 vm\">{{cat.code}}</span><span ng-show=\"editCat\" class=\"iblock h-50 m-5 lh-50 vt\"><input type=\"text\" ng-model=\"tmp.title\" class=\"vm\"></span><span ng-show=\"editCat\" class=\"iblock h-50 m-5 lh-50 vt\"><input type=\"text\" ng-model=\"tmp.code\" class=\"vm\"></span><span ng-hide=\"editCat\" class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"editCat = !editCat; tmp.title = cat.title; tmp.code = cat.code\" tip=\"Редактировать\" class=\"fa fa-pencil-square-o pointer blue\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ci.addSubCat(cat)\" tip=\"Добавить подкатегорию\" class=\"fa fa-plus pointer green\"></i></span><span ng-show=\"editCat\" class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"ci.accept(tmp, cat); editCat = false\" tip=\"Принять\" class=\"fa fa-check pointer green\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"editCat = !editCat\" tip=\"Отменить\" class=\"fa fa-times pointer red\"></i></span>");
}]);

angular.module("templates/adminka/products.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/adminka/products.jade",
    "<ul id=\"catalog\"><li ng-repeat=\"p in products\"><span class=\"title\">{{p.title}}</span></li></ul><hr><button ng-click=\"prod.add()\">add</button><div class=\"fon\"> <div id=\"product-form\"><ul class=\"tabs\"><li ng-click=\"prod.setTab('props')\">Свойства</li><li ng-click=\"prod.setTab('preview')\">Обзор</li><li ng-click=\"prod.setTab('full')\">Подробно</li></ul><div ng-show=\"prod.checkTab('props')\" class=\"tab-content\"><form-group><label class=\"iblock w-100\">Заголовок</label><input type=\"text\" ng-model=\"form.tmp.title\"></form-group><form-group><label class=\"iblock w-100\">код</label><input type=\"text\" ng-model=\"form.tmp.code\"></form-group><form-group><label class=\"iblock w-100\">Тип</label><select ng-model=\"tIndex\"><option ng-repeat=\"c in categories\" value=\"{{$index}}\">{{c.title}}</option></select><select ng-model=\"tsIndex\" ng-show=\"categories[tIndex].subitems.length &gt; 0\"><option ng-repeat=\"sc in categories[tIndex].subitems\" value=\"{{$index}}\">{{sc.title}}</option></select><select ng-model=\"tssType\" ng-show=\"categories[tIndex].subitems[tsIndex].subitems.length &gt; 0\"><option ng-repeat=\"ssc in categories[tIndex].subitems[tsIndex].subitems\">{{ssc.title}}</option></select></form-group></div><div ng-show=\"prod.checkTab('preview')\" class=\"tab-content\"><form-group class=\"h-260\"><label class=\"iblock w-100\">Изображение    </label><div class=\"img-btn\"><input type=\"file\" ngf-select ng-model=\"form.tmp.icon\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\"></div><div class=\"thumb\"><img ngf-thumbnail=\"form.tmp.icon\"></div></form-group><form-group><label class=\"iblock w-p100\">Описание</label><textarea ng-model=\"form.tmp.preview\" class=\"w-p90\"></textarea></form-group></div><div ng-show=\"prod.checkTab('full')\" class=\"tab-content\"><form-group><label class=\"iblock w-p100\">Изображение</label><div class=\"img-btn\"><input type=\"file\" ngf-select ng-model=\"form.tmp.mainPic\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\"></div><div class=\"thumb\"><img ngf-thumbnail=\"form.tmp.mainPic\"></div></form-group></div><div class=\"footer\"><button>Ok</button><button>Cancel</button></div></div></div>");
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
