// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('9gag_viewer', ['ionic', 'ngCordova']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            StatusBar.overlaysWebView(true);
            StatusBar.style(1);
        }
    });
});

app.controller('mainCtrl', ['$scope', '$http', '$ionicSideMenuDelegate', '$ionicScrollDelegate',
    function ($scope, $http, $ionicSideMenuDelegate, $ionicScrollDelegate) {
        $scope.cards = [];
        $scope.cur_category = 'hot';
        var nextPage = 0;

        $scope.getCards = function (page) {
            $http.get('http://infinigag.eu01.aws.af.cm/' + $scope.cur_category + '/' + page)
                .success(function (data, status) {
                    $scope.cards = $scope.cards.concat(data.data);
                    nextPage = data.paging.next;
                    console.log(data);
                }).error(function (data, status) {
                    console.log(data);
                }).finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
        };

        $scope.doRefresh = function() {
            $scope.cards = [];
            $scope.getCards(0, $scope.cur_category);
        };

        $scope.loadMore = function () {
            $scope.getCards(nextPage, $scope.cur_category);
        };

        $scope.show_categories = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.select_category = function(category) {
            $scope.cur_category = category;
            $scope.cards = [];
            $scope.getCards(0, category);
            $ionicSideMenuDelegate.toggleLeft(false);
            $ionicScrollDelegate.scrollTop();
        };

        $scope.getCards(0, $scope.cur_category);
    }]);
