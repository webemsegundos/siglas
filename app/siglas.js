'use strict';
var App = angular.module('SiglaApp', ['ngSanitize']);
App.config(['$locationProvider', function AppConfig($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

App.run(function($rootScope, $http, $location){
   $rootScope.busca="";
   $rootScope.feeds={};
   $rootScope.inicio=1;
   $rootScope.buscado="";

   $rootScope.getItems = function () {
        $location.path($rootScope.busca.toUpperCase());
        $http.get('/api.php?busca='+$rootScope.busca.toUpperCase())
            .success(function(data, status) {
                $rootScope.buscado=$rootScope.busca.toUpperCase();
                $rootScope.feeds=data;
                if(Object.keys(data).length > 0) {
                    $rootScope.inicio=1;
                } else {
                    $rootScope.inicio=0;
                }
            })
            .error(function(data,status,error,config){
                console.log(status);
                console.log(error);
            });
        
    }

   $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });        

   $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        if($rootScope.actualLocation === newLocation) {
            var dadosurl = $location.path().split("/");
            if(dadosurl[1]) {
                $rootScope.busca=dadosurl[1].toUpperCase();
                $rootScope.getItems();
            }

        }
    });
});
App.controller("SiglaCtrl", function($scope, $rootScope, $http, $location) {
    $scope.formadicionar=0;

    var dadosurl = $location.path().split("/");
    if(dadosurl[1]) {
        $rootScope.busca=dadosurl[1].toUpperCase();
        $rootScope.getItems();
    }

});
App.directive('postRender',['$timeout', function (timer) {
    return {
        link: function (scope, elem, attrs, ctrl) {
            timer(function () {
                    jQuery('.nano').nanoScroller({preventPageScrolling: true})
                 }
                 , 0);
        }
    }
}]);
