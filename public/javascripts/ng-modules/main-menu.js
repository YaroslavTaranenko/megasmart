/**
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


})();