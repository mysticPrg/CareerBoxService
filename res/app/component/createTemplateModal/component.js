/**
 * Created by JEONGBORAM-PC-W1 on 2014-11-16.
 */
define([
    'app',
    '../../js/classes/Templates/Template'
], function (app, Template) {
    app.controller('createTemplateModalController', function ($scope, $modalInstance) {
        $scope.template = new Template();
        $scope.save = function () {
            $modalInstance.close($scope.template);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    });
    return {
        templateUrl: require.toUrl('component/createTemplateModal/template.html'),
        controller: 'createTemplateModalController'
    }
});