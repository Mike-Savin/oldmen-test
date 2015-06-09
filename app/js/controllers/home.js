angular.module('oldmenTest').controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.data = [];

    $http.get('../data/contacts.json').success(function(data) {
	    $scope.data = data;
        $scope.currentRegion = data.regions[3];
        $scope.currentCountry = $scope.data.countries[$scope.currentRegion][9];
	});

    $scope.setCurrentCountry = function() {
        if ($scope.data.countries[$scope.currentRegion]) {
            $scope.currentCountry = $scope.data.countries[$scope.currentRegion][0];
            $scope.currentContactList = $scope.data.contacts[$scope.currentCountry];
        }
        else {
            $scope.currentCountry = null;
            $scope.currentContactList = $scope.data.contacts[$scope.currentRegion];
        }
    };

    $scope.setCurrentContactList = function() {
        $scope.currentContactList = $scope.data.contacts[$scope.currentCountry];
    };

    this.setStyles = function() {
        //$('.container').height = $(window).height;
    };

    this.setStyles();
}]);