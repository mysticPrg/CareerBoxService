/**
 * Created by JEONGBORAM-PC-W1 on 2014-12-23.
 */

define([
    'app',
    'services/HTMLGenerator',
    'services/EditorData',
    'services/SetAttributeInformation',
    'services/SavePaper',
    'services/LoadPaper',
    'services/loadArticle'
], function (app) {
    app.factory('reloadPaper', function (HTMLGenerator, EditorData, SetAttributeInformation, SavePaper, LoadPaper, loadArticle, $http) {
        function reloadPaper($scope, callback) {
            var paper = EditorData.paper;
            paper.childArr = getPaperChildArr(EditorData.childArr);

            //페이퍼 저장
            var data = {_portfolio_id: EditorData.portfolio._id, paper: paper};
            console.log('save data', data.paper.childArr[0].bindingData);

            SavePaper($http, data, function (result) {
                if (result.returnCode === '000') {
                    // 페이퍼 로드
                    LoadPaper($http, EditorData.paperId, function (result) {
                        EditorData.paper = result.result;
                        EditorData.paperTitle = result.result.title;

                        // reload
                        $('#' + EditorData.focusId).remove();
                        var articleModel = SetAttributeInformation(EditorData.focusId).attributeInformation;
                        loadArticle(articleModel, $scope);

                        callback();
                    });

                } else if (result.returnCode === '001') {
                } else if (result.returnCode === '002') {
                }
            });
        }

        function getPaperChildArr(childArr) {
            var paperChildArr = new Array();

            for (var key in childArr) {
                var child = childArr[key];

                if (child.state == 'new') {
                    delete child._id;
                }

                if (child.state == 'del') {
                    continue;
                }

                delete  child.state;

                paperChildArr.push(child);
            }

            return paperChildArr;
        }

        return reloadPaper;
    });

});