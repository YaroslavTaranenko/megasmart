angular.module('templates', ['templates/calls.jade', 'templates/header.jade', 'templates/main-menu.jade', 'templates/slider.jade', 'templates/test.jade', 'templates/top-menu.jade', 'templates/top-panel.jade']);

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
    " # {{ssubPos}} --><div class=\"menu-wrapper\"><div id=\"main-menu\"><div class=\"subprev\"><div ng-click=\"mm.prev()\" ng-class=\"{'mm-disabled': prevEnd}\" class=\"prev left fa fa-angle-left\"></div></div><ul ng-style=\"menuLength\"><li ng-repeat=\"mi in mainMenu.item\" ng-click=\"mm.over(mi, $event); mm.sclear()\" class=\"vt\"><a href><img ng-src=\"/images/menu/{{mi.icon}}\" class=\"left\"><div class=\"title\">{{mi.title}}</div><i ng-show=\"mi.subitems.length &gt; 0\" class=\"fa fa-angle-down\"></i></a></li></ul><div class=\"subnext\"><div ng-click=\"mm.next()\" ng-class=\"{'mm-disabled': nextEnd}\" class=\"next right fa fa-angle-right\"></div></div></div><div id=\"subitems\" ng-style=\"subPos\"><ul><li ng-repeat=\"si in cMenu.subitems\" ng-click=\"mm.sover(si, $event)\"><a href><img ng-src=\"/images/menu/{{si.icon}}\" class=\"h-50 w-50 left\"><div class=\"title\">{{si.title}}</div></a><i ng-show=\"si.subitems.length &gt; 0\" class=\"fa fa-angle-right\"></i></li></ul><div id=\"subitems\" ng-style=\"ssubPos\"><ul><li ng-repeat=\"ssi in csMenu.subitems\"><a href><img ng-src=\"/images/menu/{{ssi.icon}}\" class=\"h-50 w-50 left\"><div class=\"title\">{{ssi.title}}                </div></a></li></ul></div></div></div>");
}]);

angular.module("templates/slider.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/slider.jade",
    "<div id=\"main-slider\"><ul><li ng-repeat=\"slide in slids\" ng-show=\"slide.show\" class=\"animation-fade\"><img ng-src=\"/images/menu/{{slide.mainPic}}\" class=\"slide-img\"><div class=\"slide-desc\"><span class=\"slide-title\">{{slide.title}}</span><span class=\"slide-preview\">{{slide.desc}}</span></div></li></ul><button ng-click=\"next()\">Next</button></div>");
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
