/**
 * Created by careerBox on 2014-12-16.
 */

var requirejs = require('../../require.config');
var ProjectInfo = requirejs('classes/Info/ProjectInfo');

var ObjectID = require('mongodb').ObjectID;

function save(data, callback) {
    var projectInfoCollection = require('../../util/DBCollections').getInstance().collections.projectInfo;

    var projectInfo = new ProjectInfo(data);
    projectInfo._id = new ObjectID(projectInfo._id);

    for ( var i=0 ; i<projectInfo.items.length ; i++ ) {
        if (!projectInfo.items[i]._id) {
            projectInfo.items[i]._id = new ObjectID().toHexString();
        }
    }

    projectInfoCollection.save(projectInfo, function(err, savedCount, result) {
        var returnObject = null;
        if ( result.updatedExisting ) {
            returnObject = projectInfo;
        } else {
            returnObject = result.upserted[0];
        }
        callback(err, returnObject);
    });
}

function read(_member_id, callback) {
    var projectInfoCollection = require('../../util/DBCollections').getInstance().collections.projectInfo;

    projectInfoCollection.findOne({'_member_id': _member_id}, callback);
}

function useCheck(_member_id, _item_id, callback) {
    var awardInfoCollection = require('../../util/DBCollections').getInstance().collections.awardInfo;

    awardInfoCollection.findOne({
        '_member_id': _member_id,
        'items': {$elemMatch: {_id: _item_id}}
    }, function(err, finded) {
        if ( finded ) {
            callback(err, true);
        } else {
            callback(err, false);
        }
    });
}

function reset() {
    var projectInfoCollection = require('../../util/DBCollections').getInstance().collections.projectInfo;
    projectInfoCollection.remove({}, function() {
    });
}

var exports = {
    save: save,
    read: read,
    useCheck: useCheck,
    reset: reset
};

module.exports = exports;