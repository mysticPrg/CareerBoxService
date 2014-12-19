/**
 * Created by KHW on 2014-12-17.
 */
define([
    'jquery',
    'angular',
    'app',
    'classes/Enums/InfoCategory',
    'services/getAvailableAttribute'
], function ($, ng, app, InfoCategory) {
    app.controller('testController', ['$scope', 'getAvailableAttribute', function ($scope, getAvailableAttribute) {
        $scope.infoCategory = InfoCategory;
        $scope.category = '';

//        $scope.types = ['string', 'number', 'boolean', 'file', 'image', 'term', 'date'];
        $scope.types = {
            'string' : 'S',
            'number' : 'N',
            'boolean' : 'B',
            'file' : 'F',
            'image' : 'I',
            'term' : 'T',
            'date' : 'D'
        };

        $scope.type;

        $scope.result;

        $scope.test = function (){
            var category = $scope.category.infoType;

            var infoType = $scope.type;

            $scope.result = getAvailableAttribute(category, infoType);
        }
    }]);
});
