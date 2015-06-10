angular.module('oldmenTest', ['ngDialog']).controller('HomeCtrl', ['$scope', '$http', '$window', 'ngDialog', function ($scope, $http, $window, ngDialog) {
    $scope.data = [];
    $scope.currentContactList = null;

    $http.get('../data/contacts.json').success(function(data) {
	    $scope.data = data;
        $scope.currentRegion = data.regions[3];
        $scope.currentCountry = $scope.data.countries[$scope.currentRegion][9];
	});

    $scope.setCurrentCountry = function() {
        if ($scope.data.countries[$scope.currentRegion]) {
            $scope.currentCountry = $scope.data.countries[$scope.currentRegion][0];
        }
        else {
            $scope.currentCountry = null;
            $scope.currentContactList = $scope.data.contacts[$scope.currentRegion];
            ngDialog.open({template:'modal', scope: $scope});
        }
    };

    $scope.setCurrentContactList = function() {
        $scope.currentContactList = $scope.data.contacts[$scope.currentCountry];
        ngDialog.open({template:'modal', scope: $scope});
    };

    $scope.setContainerPadding = function() {
        $('.container').css('padding-top', ($(window).height() - 100) / 2);
    };

    $scope.setModalPadding = function(value) {
        var modalHeight  = value || $('.ngdialog-content').height(),
            balance = $(window).height() - modalHeight;
        if (balance > 0) {
            $('.ngdialog').css('padding-top', balance / 2);
        }
        else {
            $('.ngdialog').css('padding-top', 15);
        }
        $('.ngdialog').css('padding-bottom', 0);
    };

    angular.element($window).bind('resize', function() {
        $scope.setContainerPadding();
        $scope.setModalPadding();
    });

    $scope.$watch(function() { return $('.ngdialog-content').height() },
    function(newValue, oldValue) {
        if (newValue != oldValue)
            $scope.setModalPadding(newValue);
    });

    $scope.setContainerPadding();
}]);