/**
 * Created by careerBox on 2014-11-30.
 */

var Uploader = require('express-uploader');
var multipart = require('connect-multiparty')();
var FileDB = require('../db/FileDB');
var ServiceUtil = require('../util/ServiceUtil');

var Result = require('./result');

var fs = require('fs');

var fileDir = __dirname + '/../../res/uploads/file';

var uploader = new Uploader({
//    debug: true,
    validate: true,
    safeName: true,
    publicDir: __dirname + '/../../res',
    uploadDir: fileDir,
    uploadUrl: '/upload/file',
    maxFileSize: 5242880 //0000 5
});

function checkArgForFiles(req, res) {
    if (!req.files) {

        var result = new Result(null);
        result.setCode('001');
        res.end(result.toString());

        return false;
    }

    return true;
}

function checkArgForIsBinding(req, res) {
    if ( req.body.isBinding === null || req.body.isBinding === undefined ) {

        var result = new Result(null);
        result.setCode('001');
        res.end(result.toString());

        return false;
    }

    return true;
}

function checkArgForIdOnParams(req, res) {
    if (!req.params._id) {

        var result = new Result(null);
        result.setCode('001');
        res.end(result.toString());

        return false;
    }

    return true;
}

function checkArgForIdOnBody(req, res) {
    if (!req.body._id) {

        var result = new Result(null);
        result.setCode('001');
        res.end(result.toString());

        return false;
    }

    return true;
}

function uploadService(req, res) {

    uploader.uploadFile(req, function (data) {

        ServiceUtil.setResHeader(res);
        if (!ServiceUtil.checkSession(req, res)) {
            return;
        }
        if (!checkArgForFiles(req, res)) {
            return;
        }
        if (!checkArgForIsBinding(req, res)) {
            return;
        }

        var isBinding = (req.body.isBinding === 'true');

        var fileData = {
            originalName: data[0].originalName,
            _member_id: req.session._id,
            name: data[0].name,
            filesize: data[0].size,
            isBinding: isBinding
        };

        FileDB.write(fileData, function(err, writed) {
            ServiceUtil.sendResult(err, res, writed[0]);
            delete req.files;
        });
    });
}

function downloadService(req, res) {
    if (!checkArgForIdOnParams(req, res)) {
        return;
    }

    FileDB.read(req.params._id, function(err, finded) {

        var filepath = fileDir + '/' + finded.name;

        res.download(filepath, finded.originalName);
    });
}

function getListService(req, res) {
    ServiceUtil.setResHeader(res);
    if (!ServiceUtil.checkSession(req, res)) {
        return;
    }

    FileDB.getList(req.session._id, function(err, findedArr) {
        ServiceUtil.sendResult(err, res, findedArr);
    });
}

function deleteService(req, res) {
    ServiceUtil.setResHeader(res);
    if (!ServiceUtil.checkSession(req, res)) {
        return;
    }
    if (!checkArgForIdOnBody(req, res)) {
        return;
    }

    var _id = req.body._id;

    FileDB.read(_id, function(err, finded) {
        FileDB.deleteFile(req.body._id, function(err2) {

            var filepath = fileDir + '/' + finded.name;
            fs.unlinkSync(filepath);
            ServiceUtil.sendResult(err2, res, null);
        });
    });
}

module.exports.set = function (server) {
    server.post('/file', multipart, uploadService);
    server.get('/file/:_id', downloadService);
    server.get('/file', getListService);
    server.delete('/file', deleteService);
};