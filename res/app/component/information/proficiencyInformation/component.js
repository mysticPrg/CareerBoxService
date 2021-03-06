/**
 * Created by mysticPrg on 2014-12-11.
 */

define([
    'app',
    'service/InformationData',
    'classes/Info/ProficiencyInfoItem',
    'angular-upload',
    'service/fileUpload',
    'service/serverURL'
], function (app, InformationData, ProficiencyInfoItem) {
    app.controller('proficiencyInformationContorller', ['$scope', '$upload', 'fileUpload', 'serverURL', function ($scope, $upload, fileUpload, serverURL) {
        $scope.proficiencyInfoItem = new ProficiencyInfoItem();
        $scope.progress = 0;
        $scope.serverURL = serverURL;

        $scope.InformationData = InformationData;

        $scope.$watch("InformationData.proficiencyInfo", function () {
            $scope.proficiencyInfoItems = InformationData.proficiencyInfo.items;
        }, true);

        function initializeFileForm(){
            $scope.progress = 0;
            $('#proficiency_file').val('');
            $('#proficiency_upload').css('display', 'none');
            $('#proficiency_progressbar').css('display', 'none');
        }

        $scope.addProficiencyInfo = function () {
            var newProficiencyInfoItem = new ProficiencyInfoItem($scope.proficiencyInfoItem);
            $scope.proficiencyInfoItems.push(newProficiencyInfoItem);
            $scope.proficiencyInfoItem = new ProficiencyInfoItem();
            $scope.fileNameForProficiency = '';

            initializeFileForm();
        };

        $scope.delProficiencyInfo = function (index) {
            $scope.proficiencyInfoItems.splice(index, 1);
        };

        $scope.onFileSelectProficiencyInfo = function ($files) {
            if($files[0].size > 5242880){
                alert('파일 크기는 5MB를 넘을 수 없습니다.');
                return;
            }

            $scope.fileNameForProficiency = $files[0].name;
            $scope.files = $files;
            $('#proficiency_upload').fadeIn('slow');
        };

        $scope.uploadProficiencyInfo = function (){
            $('#proficiency_progressbar').fadeIn('slow');

            fileUpload($upload, $scope.files, true, function(evt){
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            },function(data){
                $scope.proficiencyInfoItem.F_file = data.result;
            });
        };
    }]);

    app.directive('proficiencyInformation', function () {
        return {
            restrict: 'E',
            templateUrl: require.toUrl('component/information/proficiencyInformation/template.html'),
            controller: 'proficiencyInformationContorller'
        };
    });
});