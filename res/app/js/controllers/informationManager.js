/**
 * Created by JEONGBORAM-PC-W1 on 2014-12-11.
 */
define([
    'jquery',
    'angular',
    'app',
    'bootstrap',
    'component/menu/component',
    'component/information/personalInformation/component',
    'component/information/additionalInformation/component',
    'component/information/workingInformation/component'
], function ($, ng, app) {
    app.controller('informationManager', ['$scope', '$http', function ($scope, $http) {
        $scope.initialize = function () {
            $('#informationTab a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            $('#personalInformationLink').click();
        }

    }]);
});
