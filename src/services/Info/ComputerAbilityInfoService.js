/**
 * Created by careerBox on 2014-12-16.
 */


var ComputerAbilityInfoDB = require('../../db/Info/ComputerAbilityInfoDB');
var Result = require('../result');
var ServiceUtil = require('../../util/ServiceUtil');

module.exports.set = function (server) {
    server.post('/info/computerAbility', saveService);
    server.get('/info/computerAbility', readService);
};

function checkArgForComputerAbilityInfo(req, res) {
    if (!req.body.computerAbilityInfo) {

        var result = new Result(null);
        result.setCode('001');
        res.end(result.toString());

        return false;
    }

    return true;
}

function saveService(req, res) {

    ServiceUtil.setResHeader(res);
    if (!ServiceUtil.checkSession(req, res)) {
        return;
    }
    if (!checkArgForComputerAbilityInfo(req, res)) {
        return;
    }

    var data = req.body.computerAbilityInfo;
    data._member_id = req.session._id;

    ComputerAbilityInfoDB.save(data, function (err, saved) {
        ServiceUtil.sendResult(err, res, saved._id);
    });

}

function readService(req, res) {

    ServiceUtil.setResHeader(res);
    if (!ServiceUtil.checkSession(req, res)) {
        return;
    }

    var _member_id = req.session._id;

    ComputerAbilityInfoDB.read(_member_id, function (err, finded) {
        ServiceUtil.sendResult(err, res, finded);
    });
}