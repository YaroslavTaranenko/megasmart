/**
 * Created by yaroslav on 8/10/16.
 */
(function() {
    var app = angular.module('megasmart', ['templates', 'ngAnimate', 'mainMenu', 'mySlider']);

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
        $scope.slides = [
            {title: 'slide 1', mainPic:'slid1.jpg', desc:''}, 
            {title: 'slide 2', mainPic:'slid2.jpg', desc:''}, 
            {title: 'slide 3', mainPic:'slid3.jpg', desc:''} 
        ];
    });

    app.controller('TestCtlr', function(){
        //alert('test');
        
    });

})();;/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function() {
    var app = angular.module('calls', []);

    app.directive('callBlock', function(){
        return{
            restrict: "E",
            templateUrl: "templates/calls.jade",
            controller: function($location, $scope, $http){
                //alert('top-panel');
//                $scope.path = $location.path();
//                alert($scope.path);
            },
            controllerAs: "hd"
        };
    });

})();;/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('myHeader', ['topMenu', 'calls']);

    app.directive('myHeader', function(){
        return{
            restrict: "E",
            templateUrl: "templates/header.jade",
            controller: function($scope, $http){
                //alert('top-panel');

            },
            controllerAs: "hd"
        };
    });

})();

;/**
 * Created by yaroslav on 8/16/16.
 */
(function() {
    var app = angular.module('mainMenu', [])
        .directive('mainMenu', function(){
            return{
                restrict: "E",
                templateUrl: "templates/main-menu.jade",
                scope:{
                    lang: '='
                },
                controller: function($scope, $http){
                    //alert('top-panel');
//                    $http.post('/admin/view/interface', {name: 'main-menu'})
//                        .then(function(resp){
//                            $scope.mainMenu = resp.data.interface[0];
//                            
//                        }, function(err){alert(err.data);});
                    $scope.mainMenu = [
                        {title: {ru: '', en: ''},img: 'logo.png',href: '/'},
                        {title: {ru: 'Главная', en: 'Home'},img: '',href: '/'},
                        {title: {ru: '', en: ''},img: 'smart.png',href: '/catalog',
                            subitems: [
                                {title: {ru: 'Глянцевые модели МДФ', en: 'panels'}, href:'', img: '',
                                    subitems: [
                                        {title:{ru:'Серия SILK', en:''}, href:''},
                                        {title:{ru:'Серия EMBO волны', en:''}, href:''},
                                        {title:{ru:'Серия FLOWER', en:''}, href:''},
                                        {title:{ru:'Серия ТЕКСТУРЫ', en:''}, href:''},
                                        {title:{ru:'Серия ОДНОТОННЫЕ и ПЕРЛАМУТРОВЫЕ', en:''}, href:''}
                                    ]
                                },
                                {title: {ru: 'Кромка и профиль', en: 'panels'}, href: '', img: '', 
                                    subitems:[
                                        {title:{ru:'Кромка ПВХ', en:''}, href:''},
                                        {title:{ru:'Кромка ABS', en:''}, href:''},
                                        {title:{ru:'Профиль аллюминиевый', en:''}, href:''},
                                        {title:{ru:'Подборка кромки', en:''}, href:''}
                                    ]
                                },
                                {title: {ru: 'Новые', en: 'panels', href: '', img: ''}}
                            ]                        
                        },
                        {title: {ru: 'О компании', en: 'About'},img: '',href: '/about'}, 
                        {title: {ru: 'Готовые решения', en: 'Gallery'},img: '',href: '/gallery'}, 
                        {title: {ru: 'Контакты', en: 'Contacts'},img: '',href: '/contacts'}
                    ];
                },
                controllerAs: "mm"
            };
        });


})();;/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('mySlider', []);

    app.directive('mySlider', function(){
        return{
            restrict: "E",
            templateUrl: "templates/slider.jade",
            scope: {
                slids: "="
            },
            controller:['$scope', '$http', '$timeout', function($scope, $http, $timeout){
                $scope.cIndex = 0;
                $scope.next = function(){
                    
                    if($scope.cIndex >= $scope.slids.length - 1){
                        $scope.cIndex = 0;
                    }else{
                        $scope.cIndex++;
                    }
                    //alert($scope.cIndex);
                    $scope.changeSlide();
                };
                $scope.changeSlide = function(){
                    
                    for(var i = 0; i < $scope.slids.length; i++){
                        $scope.slids[i].show = false;
                    };
                    
                    $scope.slids[$scope.cIndex].show = true;
                    //alert($scope.slids.length);
                };
                $scope.showSlide = function(idx){                    
                    if(idx > ($scope.slids.length - 1)){
                        return;
                    }else{
                        $scope.cIndex = idx;
                    }
                    
                    $scope.changeSlide();
                };
                $scope.play = function() {
                    //alert('ok');
                    timeout = $timeout(
                        function() {
                            $scope.next();
                            $scope.play();
                            
                        }, 2000
                    );
                };
                //this.showSlide(0);
                
                $scope.play();
            }],
            controllerAs: "sl"
        };
    });

})();

;/* 
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

})();;/**
 * Created by yaroslav on 8/15/16.
 */
(function(){
    var app = angular.module('panelTop', [])
        .directive('topPanel', function(){
            return{
                restrict: "E",
                templateUrl: "templates/top-panel.jade",
                controller: function($scope, $http){
                    //alert('top-panel');

                },
                controllerAs: "tp"
            };
        });

})();;angular.module('templates', ['templates/calls.jade', 'templates/header.jade', 'templates/main-menu.jade', 'templates/slider.jade', 'templates/test.jade', 'templates/top-menu.jade', 'templates/top-panel.jade']);

angular.module("templates/calls.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/calls.jade",
    "<div class=\"call-wrapper\"><ul id=\"call-block\"><li><i class=\"fa fa-phone\"></i><span>&nbsp;(7252)29-27-83</span></li><li> <i class=\"fa fa-mobile\"></i><span>&nbsp;+7(708)478-67-07</span></li><li> <i class=\"fa fa-mobile\"></i><span>&nbsp;+7(771)052-48-48</span></li><li> <a href tip=\"Заказать звонок\"><i class=\"fa fa-phone\"></i><span>&nbsp;Позвонить мне</span></a></li></ul></div>");
}]);

angular.module("templates/header.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/header.jade",
    "<div class=\"logo iblock w-200\"> <a href=\"/\"><img src=\"/images/logo.png\" class=\"w-200\"><span class=\"w-200\">Магазин цифровой техники</span></a></div><top-menu></top-menu><call-block></call-block>");
}]);

angular.module("templates/main-menu.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/main-menu.jade",
    "<!--Created by yaroslav on 8/16/16.\n" +
    " # {{cMenu}}\n" +
    " # {{ssubPos}} --><div class=\"menu-wrapper\"><div id=\"main-menu\"><ul><li class=\"vt\"><a href=\"{{mainMenu[0].href}}\"><img ng-src=\"/images/{{mainMenu[0].img}}\" ng-show=\"mainMenu[0].img.length &gt; 0\"><div ng-show=\"{{mainMenu[0].title[lang].length &gt; 0\" class=\"title\">{{mainMenu[0].title[lang]}}</div></a></li><li class=\"vt\"><a href=\"{{mainMenu[1].href}}\"><img ng-src=\"/images/{{mainMenu[1].img}}\" ng-show=\"mi.img.length &gt; 0\"><div ng-show=\"{{mainMenu[1].title[lang].length &gt; 0\" class=\"title\">{{mainMenu[1].title[lang]}}</div></a></li><li class=\"logo vt\"><a href=\"{{mainMenu[2].href}}\"><img ng-src=\"/images/{{mainMenu[2].img}}\" ng-show=\"mainMenu[2].img.length &gt; 0\"><div ng-show=\"{{mainMenu[2].title[lang].length &gt; 0\" class=\"title\">{{mainMenu[2].title[lang]}}</div><i id=\"logo-arrow\" class=\"fa fa-angle-down\"></i></a><ul class=\"subitems animation-fade\"><li ng-repeat=\"si in mainMenu[2].subitems\"><a href=\"{{si.href}}\"><i class=\"fa fa-circle mm-active\"></i><div class=\"title\">{{si.title[lang]}}</div><i ng-show=\"si.subitems.length &gt; 0\" class=\"fa fa-angle-right\"></i></a><ul class=\"sub-subitems\"><li ng-repeat=\"ssi in si.subitems\"><a href=\"{{ssi.href}}\"><i class=\"fa fa-circle mm-active\"></i><div class=\"title\">{{ssi.title[lang]}}</div><i ng-show=\"ssi.subitems.length &gt; 0\" class=\"fa fa-angle-right\"></i></a></li></ul></li></ul></li><li class=\"vt\"><a href=\"{{mainMenu[3].href}}\"><img ng-src=\"/images/{{mainMenu[3].img}}\" ng-show=\"mainMenu[3].img.length &gt; 0\"><div ng-show=\"{{mainMenu[3].title[lang].length &gt; 0\" class=\"title\">{{mainMenu[3].title[lang]}}</div></a></li><li class=\"vt\"><a href=\"{{mainMenu[4].href}}\"><img ng-src=\"/images/{{mainMenu[4].img}}\" ng-show=\"mainMenu[4].img.length &gt; 0\"><div ng-show=\"{{mainMenu[4].title[lang].length &gt; 0\" class=\"title\">{{mainMenu[4].title[lang]}}</div></a></li><li class=\"vt\"><a href=\"{{mainMenu[5].href}}\"><img ng-src=\"/images/{{mainMenu[5].img}}\" ng-show=\"mainMenu[5].img.length &gt; 0\"><div ng-show=\"{{mainMenu[5].title[lang].length &gt; 0\" class=\"title\">{{mainMenu[5].title[lang]}}</div></a></li><!--.next.right.fa.fa-angle-right(ng-click=\"mm.next()\" ng-class=\"{'mm-disabled': nextEnd}\")--></ul></div><div id=\"subitems\" ng-style=\"subPos\"><ul><li ng-repeat=\"si in cMenu.subitems\" ng-click=\"mm.sover(si, $event)\"><a href><img ng-src=\"/images/menu/{{si.icon}}\" class=\"h-50 w-50 left\"><div class=\"title\">{{si.title}}</div></a><i ng-show=\"si.subitems.length &gt; 0\" class=\"fa fa-angle-right\"></i></li></ul><div id=\"subitems\" ng-style=\"ssubPos\"><ul><li ng-repeat=\"ssi in csMenu.subitems\"><a href><img ng-src=\"/images/menu/{{ssi.icon}}\" class=\"h-50 w-50 left\"><div class=\"title\">{{ssi.title}}                </div></a></li></ul></div></div></div>");
}]);

angular.module("templates/slider.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/slider.jade",
    "<div id=\"main-slider\"><ul><li ng-repeat=\"slide in slids\" ng-show=\"slide.show\" class=\"animation-fade\"><img ng-src=\"/images/slider/{{slide.mainPic}}\" class=\"slide-img\"><div class=\"slide-desc\"></div></li></ul></div>");
}]);

angular.module("templates/test.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/test.jade",
    "<ul><li>j1</li><li>j2</li><li>j3</li><li>j4</li><li>j5</li></ul>");
}]);

angular.module("templates/top-menu.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/top-menu.jade",
    "<div id=\"top-menu\" class=\"iblock vt\"><ul><li><a href>Акции</a></li><li> <a href>Газета</a></li><li> <a href>Калькулятор компьютера</a></li><li> <a href>Оптовые продажи</a></li><li> <a href>Обмен и возврат </a></li></ul></div>");
}]);

angular.module("templates/top-panel.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/top-panel.jade",
    "<div id=\"top-panel\"><a href id=\"enter\"> <i class=\"fa fa-user\"> </i># Вход на сайт</a><ul class=\"right\"><li class=\"iblock p-10\"><a href=\"/\">Главная</a></li><li class=\"iblock p-10\"><a href>Доставка</a></li><li class=\"iblock p-10\"><a href>Способы оплаты</a></li></ul><div style=\"clear:both\"></div></div>");
}]);
