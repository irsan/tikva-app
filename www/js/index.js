var socketioURL = "http://192.168.0.172:3000";

document.addEventListener("deviceready", function() {
    console.log('device is ready.');
    console.log(device);
    //---
    window.onerror = function (errorMsg, url, lineNumber) {
        console.error('..[window.onerror: ' + errorMsg + '] Script: ' + url + ' Line: ' + lineNumber);
    }
    //---
    /*
     if (device.platform.toLowerCase() == 'android') {
     document.addEventListener("backbutton", function (e) {
     e.preventDefault();
     }, false );
     }
     */
    //---
    var domElement = document.documentElement;
    angular.bootstrap(domElement, ["TikvaApp"]);
    //---
    var $body = angular.element(document.body);
    var $rootScope = $body.scope().$root;
    $rootScope.$apply(function () {
        $rootScope.$broadcast('initialized', 'initialized');
    });
});

var app = angular.module('TikvaApp', [ 'ngRoute',  'ngMaterial' ]);

app.factory('io', function($rootScope) {
    var ioFactory = {
        connect : function() {
            ioFactory.socket = io.connect(socketioURL);
            ioFactory.socket.on("install", function(data) {
                window.location.href = "#/install";
            })
            ioFactory.socket.on("response_install", function(data) {
                console.log("RESPONSE INSTALL", data);
            });
        },
        install : function(data) {
            ioFactory.socket.emit("install", data);
        }
    };

    return ioFactory;
});

app.run(function($location, io) {
    console.log("CONNECTING IO");
    io.connect();
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'modules/welcome/view/index.html',
        controller: 'welcomeCtrl',
    }).when('/install', {
        templateUrl: 'modules/install/view/index.html',
        controller: 'installCtrl',
    }).otherwise({
        redirectTo: '/'
    });
});