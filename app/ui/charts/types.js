/**
 * Created by GregRos on 27/05/2016.
 */
"use strict";
/**
 * Created by GregRos on 29/07/2016.
 */
var _ = require('lodash');
var Charts;
(function (Charts) {
    function open(data, suite) {
        var arr = data;
        var newSuite = _.cloneDeep(suite);
        newSuite.groups = [];
        for (var _i = 0, _a = suite.groups; _i < _a.length; _i++) {
            var group = _a[_i];
            var newGroup = _.cloneDeep(group);
            newGroup.tests = [];
            var _loop_1 = function(test) {
                var resultsOfTest = arr.filter(function (x) { return x.Test === test.test; }).map(function (x) {
                    var result = {
                        result: x.Time.Fields[0],
                        footnote: "sdf",
                        target: x.Target
                    };
                    return result;
                });
                var newTest = _.cloneDeep(test);
                newTest.results = resultsOfTest;
                newGroup.tests.push(newTest);
            };
            for (var _b = 0, _c = group.tests; _b < _c.length; _b++) {
                var test = _c[_b];
                _loop_1(test);
            }
            newSuite.groups.push(newGroup);
        }
        return newSuite;
    }
    Charts.open = open;
})(Charts = exports.Charts || (exports.Charts = {}));
//# sourceMappingURL=types.js.map