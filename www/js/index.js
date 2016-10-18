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
        }
    };

    return ioFactory;
});

app.run(function(io) {
    console.log("CONNECTING IO");
    io.connect();
    io.socket.on("install", function(data) {
        console.log("NEED INSTALLATION", data);
    })
});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'modules/test/view/test.html',
        controller: 'testCtrl',
    }).otherwise({
        redirectTo: '/'
    });
});