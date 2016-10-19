var app = angular.module("TikvaApp");

app.controller("installCtrl", function($scope, io) {
    console.log("INSTALL");

    $scope.install = function() {
        io.install($scope.input);
    };
});