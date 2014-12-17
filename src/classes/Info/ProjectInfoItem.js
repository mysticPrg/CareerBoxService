/**
 * Created by careerBox on 2014-12-17.
 */


if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    'classes/Structs/Term'
], function (Term) {

    var dictionary = {
        'S_title': '프로젝트명',
        'S_part': '담당부분',
        'T_term': '기간',
        'L_description': '설명',
        'I_image': '이미지',
        'F_file': '첨부파일'
    }

    function ProjectInfoItem(props) {

        this.S_title = ''; // 프로젝트명
        this.S_part = ''; // 담당 부분
        this.T_term = new Term(); // 기간
        this.L_description = ''; // 설명
        this.I_image = ''; // 이미지
        this.F_file = ''; // 첨부파일

        if (props) {
            this.S_title = props.S_title ? props.S_title : this.S_title;
            this.S_part = props.S_part ? props.S_part : this.S_part;
            this.T_term = props.T_term ? props.T_term : this.T_term;
            this.L_description = props.L_description ? props.L_description : this.L_description;
            this.I_image = props.I_image ? props.I_image : this.I_image;
            this.F_file = props.F_file ? props.F_file : this.F_file;
        }

        ProjectInfoItem.prototype.getAttributeName = function getAttributeName(key) {
            return dictionary[key];
        }
    }

    return ProjectInfoItem;
});