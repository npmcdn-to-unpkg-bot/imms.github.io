/**
 * Created by GregRos on 27/05/2016.
 */
"use strict";
const helpers_1 = require('../../helpers');
class TestSuites {
    static byName(arr, name) {
        return arr.find(x => x.name == name);
    }
    static toSuite(data, suite) {
        const arr = data;
        const newSuite = helpers_1.clone(suite);
        newSuite.groups = [];
        for (let group of suite.groups) {
            const newGroup = helpers_1.clone(group);
            newGroup.tests = [];
            for (let test of group.tests) {
                const resultsOfTest = arr.filter(x => x.Test === test.test).map(x => {
                    const result = {
                        result: x.Time.Fields[0],
                        footnote: "sdf",
                        target: x.Target
                    };
                    return result;
                });
                const newTest = helpers_1.clone(test);
                newTest.results = resultsOfTest;
                newGroup.tests.push(newTest);
            }
            newSuite.groups.push(newGroup);
        }
        return newSuite;
    }
}
exports.TestSuites = TestSuites;
//# sourceMappingURL=types.js.map