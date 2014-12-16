/**
 * Created by JEONGBORAM-PC-W1 on 2014-12-16.
 */
define([
    'app',
    'classes/Info/PersonalInfo',
    'classes/Info/AdditionalInfo',
    'classes/Info/HighSchoolInfo',
    'classes/Info/UnivSchoolInfo',
    'classes/Info/WorkingInfo'
], function (app, PersonalInfo, AdditionalInfo, HighSchoolInfo, UnivSchoolInfo, WorkingInfo) {

    var InformationData = {
        personalInfo : new PersonalInfo(),
        additionalInfo : new AdditionalInfo(),
        highSchoolInfo : new HighSchoolInfo(),
        univSchoolInfo : new UnivSchoolInfo(),
        workingInfos : [],
        certificateAbilityInfos : []
    };

    app.factory('InformationData', function () {
        return InformationData;
    });

    return InformationData;
});

