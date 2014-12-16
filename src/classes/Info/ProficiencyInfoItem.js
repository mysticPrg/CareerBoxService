/**
 * Created by careerBox on 2014-12-17.
 */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([], function () {

    function UnivSchoolInfoItem(props) {

        this.S_name = '';              // 언어명
        this.S_reg_number = '';        // 등록번호
        this.D_date = new Date();     // 취득일자
        this.S_grade = '';             // 등급
        this.S_proficiency = '';       // 활용수준
        this.F_file = '';              // 첨부파일

        if ( props ) {
            this.S_name = props.S_name ? props.S_name : this.S_name;
            this.S_reg_number = props.S_reg_number ? props.S_reg_number : this.S_reg_number;
            this.D_date = props.D_date ? props.D_date : this.D_date;
            this.S_grade = props.S_grade ? props.S_grade : this.S_grade;
            this.S_proficiency = props.S_proficiency ? props.S_proficiency : this.S_proficiency;
            this.F_file = props.F_file ? props.F_file : this.F_file;
        }
    }

    return UnivSchoolInfoItem;
});