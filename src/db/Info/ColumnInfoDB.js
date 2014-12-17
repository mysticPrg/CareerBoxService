/**
 * Created by careerBox on 2014-12-16.
 */

var requirejs = require('../../require.config');
var ColumnInfo = requirejs('classes/Info/ColumnInfo');

var async = require('async');
var ObjectID = require('mongodb').ObjectID;

function save(data, callback) {
    var columnInfoCollection = require('../../util/DBCollections').getInstance().collections.columnInfo;

    var columnInfo = new ColumnInfo(data);
    columnInfo._id = new ObjectID(columnInfo._id);

    columnInfoCollection.save(columnInfo, function(err, savedCount, result) {
        var returnObject = null;
        if ( result.updatedExisting ) {
            returnObject = columnInfo;
        } else {
            returnObject = result.upserted[0];
        }
        callback(err, returnObject);
    });
}

function read(_member_id, callback) {
    var columnInfoCollection = require('../../util/DBCollections').getInstance().collections.columnInfo;

    columnInfoCollection.findOne({'_member_id': _member_id}, callback);
}

var exports = {
    save: save,
    read: read
};

module.exports = exports;