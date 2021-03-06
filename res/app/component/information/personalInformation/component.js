/**
 * Created by JEONGBORAM-PC-W1 on 2014-12-11.
 */
define([
    'app',
    'service/InformationData',
    'angular-upload',
    'service/ImageUpload',
    'service/serverURL'
], function (app, InformationData) {
    app.controller('personalInformationController', ['$scope', '$upload', 'ImageUpload', 'serverURL', function ($scope, $upload, ImageUpload, serverURL) {
        $scope.InformationData = InformationData;
        $scope.progress = 0;
        $scope.serverURL = serverURL;

        $scope.$watch("InformationData.personalInfo", function () {
            $scope.personalInfo = InformationData.personalInfo.items[0];
        }, true);

        $scope.onFileSelectProfileImage = function ($files) {
            if($files[0].size > 5242880){
                alert('파일 크기는 5MB를 넘을 수 없습니다.');
                return;
            }

            $scope.fileName = $files[0].name;
            $('#personal_picture_progressbar').fadeIn('slow');

            ImageUpload($upload, $files, 'profile', function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            }, function (data) {
                $scope.personalInfo.I_picture = data.result;
                $('#personal_picture').attr('src', serverURL + '/image/profile/thumb/' + data.result._id);
            });
        };

    }]);

    app.directive('personalInformation', function () {
        return {
            restrict: 'E',
            templateUrl: require.toUrl('component/information/personalInformation/template.html'),
            controller: 'personalInformationController'
        };
    });

});