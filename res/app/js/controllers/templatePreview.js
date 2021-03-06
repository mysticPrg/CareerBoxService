/**
 * Created by careerBox on 2014-12-20.
 */

/**
 * Created by JEONGBORAM-PC-W1 on 2014-12-20.
 */
define([
    'jquery',
    'angular',
    'app',
    'service/HTMLGenerator',
    'service/serverURL',
    'component/item/line/component',
    'component/item/shape/component',
    'component/item/text/component',
    'component/item/link/component',
    'component/item/image/component',
    'directives/CommonAttribute'
], function ($, ng, app) {
    app.controller('templatePreview', ['$scope', '$http', '$compile', 'EditorData', 'HTMLGenerator', 'serverURL', function ($scope, $http, $compile, EditorData, HTMLGenerator, serverURL) {
        // z index 초기화
        EditorData.end_zOrder = 0;
        EditorData.start_zOrder = 0;

        $(document).ready(function () {
            $scope.templateId = window.location.href.split("id=")[1].split("&")[0];

            $http({
                method: 'GET',
                url: serverURL + '/template/preview/' + $scope.templateId,
                responseType: 'json',
                withCredentials: true
            }).success(function (data) {
                EditorData.template = data.result;
                $scope.template = EditorData.template;
                loadTemplate();
                $compile($('#canvas-content'))($scope);

            });
        });

        // Load Element
        function loadTemplate() {
            var size = $scope.template.target.size;
            loadEditorCanvas(size);

            var itemArray = $scope.template.target.childArr[0];
            for (var index = 0; index < itemArray.length; index++) {
                delete itemArray[index].state;
                EditorData.templateItemArray[itemArray[index]._id] = itemArray[index];
            }
            loadTemplateElement();
        }

        function loadEditorCanvas(size){
            $('#canvas-content').width(size.width);
            $('#canvas-content').height(size.height);
        }

        function loadTemplateElement() {
            for (var key in EditorData.templateItemArray) {
                loadElement(EditorData.templateItemArray[key]);
            }
        }

        // 템플릿에서 edit 눌러서 저장된 아이템이 로드될 때 발생!
        function loadElement(item) {
            var option = {draggable: true, resizable: true, rotatable: true};

            var domObj = HTMLGenerator('loadItem', item, item._id, option);

            $('#canvas-content').append(domObj);
            $compile($('#' + item._id))($scope);

//            EditorData.focusId = id;    // 포커스 지정
            EditorData.end_zOrder++;
        }
    }]);
});