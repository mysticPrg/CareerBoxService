/**
 * Created by JEONGBORAM-PC-W1 on 2014-12-16.
 */
define([
    'app',
    'classes/Info/PersonalInfo',
    'classes/Info/AdditionalInfo',
    'classes/Info/HighSchoolInfo',
    'classes/Info/UnivSchoolInfo',
    'classes/Info/WorkingInfo',
    'classes/Info/CertificationAbilityInfo',
    'classes/Info/ProficiencyInfo',
    'classes/Info/ComputerAbilityInfo',
    'classes/Info/PaperAbilityInfo',
    'classes/Info/ScholarshipInfo',
    'classes/Info/AwardInfo',
    'classes/Info/LocalActivityInfo',
    'classes/Info/GlobalActivityInfo',
    'classes/Info/ProjectInfo',
    'classes/Info/ColumnInfo'
], function (app, PersonalInfo, AdditionalInfo, HighSchoolInfo, UnivSchoolInfo, WorkingInfo, CertificationAbilityInfo, ProficiencyInfo, ComputerAbilityInfo, PaperAbilityInfo, ScholarshipInfo, AwardInfo, LocalActivityInfo, GlobalActivityInfo, ProjectInfo, ColumnInfo) {

    var InformationData = {
        personalInfo : new PersonalInfo(),
        additionalInfo : new AdditionalInfo(),
        highSchoolInfo : new HighSchoolInfo(),
        univSchoolInfo : new UnivSchoolInfo(),
        workingInfo : new WorkingInfo(),
        certificateAbilityInfo : new CertificationAbilityInfo(),
        proficiencyInfo : new ProficiencyInfo(),
        computerAbilityInfo : new ComputerAbilityInfo(),
        paperAbilityInfo : new PaperAbilityInfo(),
        scholarshipInfo : new ScholarshipInfo(),
        awardInfo : new AwardInfo(),
        localActivityInfo : new LocalActivityInfo(),
        globalActivityInfo : new GlobalActivityInfo(),
        projectInfo : new ProjectInfo(),
        columnInfo : new ColumnInfo()
    };

    app.factory('InformationData', function () {
        return InformationData;
    });

    return InformationData;
});

