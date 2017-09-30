// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['./runTest.ispec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    resultJsonOutputFile: './testResults.json'
  },

  params: {
    max: 3,
    //testdata: './data/allValues.data.json'
    testdata: './data/allpairs.data.json'
    //  testdata: './data/allCombination.data.json'
  }

};
