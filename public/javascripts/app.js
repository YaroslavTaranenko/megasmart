/**
 * Created by yaroslav on 8/10/16.
 */
(function() {
    var app = angular.module('bitkom', ['templates', 'ngAnimate', "panelTop", 'mainMenu', "myHeader", 'mySlider']);

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
        $scope.slides = [
            {title: 'slide 1', mainPic:'10190337.jpg', desc:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.'}, 
            {title: 'slide 2', mainPic:'567.jpg.png', desc:'В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.'}, 
            {title: 'slide 3', mainPic:'Untitled.png', desc:'Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.'}, 
            {title: 'slide 5', mainPic:'batman.jpg', desc:'Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.'}
        ];
    });

    app.controller('TestCtlr', function(){
        //alert('test');
        
    });

})();