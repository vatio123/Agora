// jQuery code
$(document).ready(function () {

});

(function(){
  var hotelbApp = angular.module('hotelbApp', ['ng-currency', 'ui.bootstrap', 'ngCookies', 'angularUtils.directives.dirPagination']);

  hotelbApp.controller('mainController', ['$scope', '$window', function($scope, $window) {
    //Properties

    //Scope variables
    $scope.showAction = 0;
  }]);
})();
