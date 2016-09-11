angular.module('adminTemplates', ['templates/adminka/categories.jade', 'templates/adminka/category-item.jade', 'templates/adminka/products.jade', 'templates/adminka/side-panel.jade', 'templates/adminka/top-panel.jade']);

angular.module("templates/adminka/categories.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/adminka/categories.jade",
    "<!--Created by yaroslav on 8/16/16.\n" +
    "\n" +
    "--><ul id=\"main-menu\"><li ng-repeat=\"cat in categories\" class=\"m-10\"><span class=\"iblock w-50 h-50\">   <img ng-if=\"!cat.img.name\" ng-src=\"/images/catalog/{{cat.img}}\" tip=\"icon\"><img ng-if=\"cat.img.name\" ngf-thumbnail=\"cat.img\" tip=\"icon\"></span><span class=\"iblock h-50 m-5 vm\">{{cat.title[lang]}}</span><span class=\"iblock h-50 m-5 vm\">{{cat.code}}</span><span class=\"iblock h-50 m-5 vm\">{{cat.href}}</span><span class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"ctg.editCategory(cat)\" tip=\"Редактировать\" class=\"fa fa-pencil-square-o pointer blue\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.getSubcats(cat._id)\" tip=\"Показать подкатегории\" class=\"fa fa-plus pointer green\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.removeCat(cat._id)\" tip=\"Удалить\" class=\"fa fa-times pointer red\"> </i></span></li></ul><button ng-click=\"ctg.addCategory()\" class=\"btn pointer\">Добавить Категорию</button><hr class=\"m-t-10\"># {{tmpCat}}<ul id=\"main-subs\"><li ng-repeat=\"cat in subcats\" class=\"m-10\"><span class=\"iblock w-50 h-50\">   <img ng-if=\"!cat.img.name\" ng-src=\"/images/catalog/{{cat.img}}\" tip=\"icon\"><img ng-if=\"cat.img.name\" ngf-thumbnail=\"cat.img\" tip=\"icon\"></span><span class=\"iblock h-50 m-5 vm\">{{cat.title[lang]}}</span><span class=\"iblock h-50 m-5 vm\">{{cat.code}}</span><span class=\"iblock h-50 m-5 vm\">{{cat.href}}</span><span class=\"iblock h-50 m-5 lh-50 vt\"><i aria-hidden=\"true\" ng-click=\"ctg.editCategory(cat)\" tip=\"Редактировать\" class=\"fa fa-pencil-square-o pointer blue\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.addSubCat(cat._id)\" tip=\"Показать подкатегории\" class=\"fa fa-plus pointer green\"></i><i aria-hidden=\"true\" style=\"margin-left: 10px;\" ng-click=\"ctg.removeCat(cat._id)\" tip=\"Удалить\" class=\"fa fa-times pointer red\"> </i></span></li></ul><button ng-click=\"ctg.addCategory(tmpCat)\" ng-show=\"tmpCat\" class=\"btn pointer\">Добавить подкатегорию</button><div ng-show=\"ctg.form.show\" class=\"fon\"><div id=\"category-form\" style=\"border: 1px solid green;\"><h3 class=\"m-t-10\">{{ctg.form.title}}</h3><div class=\"m-t-20 m-l-15\"><label class=\"iblock w-100 vt h-20\">Изображение</label><span class=\"iblock w-50 h-50\"><img ng-if=\"!ctg.form.tmp.img.name\" width=\"50\" height=\"50\" ng-src=\"/images/catalog/{{ctg.form.tmp.img}}\" tip=\"icon\"><img ng-if=\"ctg.form.tmp.img.name\" width=\"50\" height=\"50\" ngf-thumbnail=\"ctg.form.tmp.img\"></span><input type=\"file\" ngf-select ng-model=\"ctg.form.tmp.img\" name=\"file\" accept=\"image/*\" ngf-max-size=\"2MB\" required ngf-model-invalid=\"errorFile\" class=\"img-btn iblock h-50 vt\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Заголовок</label><input type=\"text\" ng-model=\"ctg.form.tmp.title.ru\" class=\"vm\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Header</label><input type=\"text\" ng-model=\"ctg.form.tmp.title.en\" class=\"vm\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Ссылка</label><input type=\"text\" ng-model=\"ctg.form.tmp.href\" class=\"vm\"></div><div class=\"m-t-10 m-l-15\"><label class=\"iblock w-100 vt h-20\">Код</label><input type=\"text\" ng-model=\"ctg.form.tmp.code\" class=\"vm\"></div><span class=\"iblock h-50 m-r-20 m-t-30 right\"><button aria-hidden=\"true\" ng-click=\"ctg.form.ok()\" class=\"fa fa-check pointer green m-l-15\"></button><button aria-hidden=\"true\" ng-click=\"ctg.form.cancel()\" class=\"fa fa-times pointer red m-l-15\"></button></span></div></div>");
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
