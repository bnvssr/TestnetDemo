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
  specs: ['aab.ispec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    resultJsonOutputFile: './testResults.json'
  },

  params: {
    //testdata: './allValues.data.json'
        testdata: './allpairs.data.json'
    //  testdata: './allCombination.data.json'
  }

};
