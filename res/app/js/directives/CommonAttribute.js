/**
 * Created by gimbyeongjin on 14. 10. 18..
 */

define([
    'app',
    'jquery-ui',
    'services/EditorData',
    'services/ApplyCommonItemAttribute',
    'services/SetAttributeInformation'
], function (app) {
    app.directive('commonAttribute', ['$compile', 'EditorData', 'ApplyCommonItemAttribute', 'SetAttributeInformation', function ($compile, EditorData, ApplyCommonItemAttribute, SetAttributeInformation) {
        function setCommonWatch(scope, element, att) {
            if(!(window.location.href.split("#/")[1] != 'TemplateEditor' && att.id == 'canvas-content')){
                // pos

                // row, col이 있는 경우(pos-x속성이 존재한다)

//                console.log('att.row', "row" in att);
                if("row" in att){
                    element.css({
                        top:  (element.position().top + att.row * element.height()) + "px",
                        left: (element.position().left + att.col * element.width()) + "px"
                    });
                }
                else
                scope.$watch("attributeInformation.pos",function() {
                    if(EditorData.focusId == att.id){
                      ApplyCommonItemAttribute.pos(element, scope.attributeInformation);
                    }
                },true);

                // outline 색
                scope.$watch("attributeInformation.outline",function() {
//                    if(EditorData.focusId == att.id)
                    ApplyCommonItemAttribute.outline(element, scope.attributeInformation);
                },true);

                // radius
                scope.$watch("attributeInformation.radius",function() {
                    // 쉐이프일 경우에는 적용되지 않도록함.
//                    if(typeof att.shape == 'undefined')
                    {
//                    if(EditorData.focusId == att.id)
                        ApplyCommonItemAttribute.radius(element, scope.attributeInformation);
                    }

                },true);

                // alpha 리스너 달기
                scope.$watch("attributeInformation.alpha",function() {
//                    if(EditorData.focusId == att.id)
                    ApplyCommonItemAttribute.alpha(element, scope.attributeInformation);
                },true);
                // rotate
//                scope.$watch("attributeInformation.rotate",function() {
////                if(EditorData.focusId == att.id)
//                    ApplyCommonItemAttribute.rotate(element, scope.attributeInformation);
//                },true);

                // z - index
                scope.$watch("attributeInformation.zOrder", function () {
                    if(scope.attributeInformation._id == att.id)
                        ApplyCommonItemAttribute.zOrder(element, scope.attributeInformation);
                }, true);
            }

            // fill 리스너 달기
            scope.$watch("attributeInformation.fill",function() {
                ApplyCommonItemAttribute.fill(element, scope.attributeInformation);

            },true);

            // size

            console.log('att.grid', att.grid != null)

            // grid
            if(att.grid != null){
                console.log('att.grid', att.grid)
                console.log('scope.attributeInformation.colCount', scope.attributeInformation.colCount)
                element.css({
                    width: (scope.attributeInformation.size.width * scope.attributeInformation.colCount) + "px",
                    height: (scope.attributeInformation.size.height * scope.attributeInformation.rowCount) + "px"
                });
            }
            else
            // 그외
            scope.$watch("attributeInformation.size",function() {
//                if(EditorData.focusId == att.id)
                ApplyCommonItemAttribute.size(element, scope.attributeInformation);

            },true);
        };

        return {

            // A = attribute, E = Element, C = Class and M = HTML Comment
            restrict: 'A',
            scope : true,   // 새로운 스코프
            //The link function is responsible for registering DOM listeners as well as updating the DOM.
            link: function (scope, element, att) {

                // 모델 GET
                var info = SetAttributeInformation(att.id);
                scope.attributeInformation = info.attributeInformation;
                scope.parentArray  = info.parentArray;

                scope.type = info.type;

                if(scope.attributeInformation){
                    // 로딩시 CSS 적용
                    if(!(window.location.href.split("#/")[1] != 'TemplateEditor' && att.id == 'canvas-content')){
                        ApplyCommonItemAttribute.all(element, scope.attributeInformation);
                    }else if(!(window.location.href.split("partials/")[1].split('?')[0] != 'templatePreview.html' && att.id == 'canvas-content')){
                        ApplyCommonItemAttribute.all(element, scope.attributeInformation);
                    }
                    else {
                        ApplyCommonItemAttribute.fill(element, scope.attributeInformation);
                        ApplyCommonItemAttribute.size(element, scope.attributeInformation);
                    }


                    // 아티클, 아이템 공통
                    setCommonWatch(scope, element, att);
                }

                // 포커싱 되었을 때 박스 쉐도우가 보이도록 함
//                scope.id = att.id;
//                var handle = element.find('.ui-rotatable-handle');
//                handle.attr('ng-show',"id == EditorData.focusId");
//                $compile(handle)(scope);
            }
        };
    }]);
});
