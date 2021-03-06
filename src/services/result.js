/**
 * Created by mysticPrg on 2014-09-22.
 */

var Result = function Result (data) {
	this.returnCode = '000';
	this.result = data;
};

Result.prototype.setCode = function setCode(code) {
	this.returnCode = code;

    return this;
};

Result.prototype.toString = function toString() {
	var json = {
		returnCode: this.returnCode,
		result: this.result
	};

    console.log('\nReturnCode: ' + this.returnCode);

	return JSON.stringify(json);
};

module.exports = Result;