'use strict';

var jsonfile = require('jsonfile');
//var jr = require('jasmine-reporters');

// load pageobjects
var PO = require('./aab.po');

// load the test data
console.log("testdata file used: ", browser.params.testdata);
var testdata = jsonfile.readFileSync(browser.params.testdata);
var testcases = testdata.testcases;

console.log('max number of test runs: ', browser.params.max);

describe('Legal Expenses Insurance, ', function () {

  // instantiate pageobject
  var po = new PO();
  var homepageURL = 'https://extra.abnamro.nl/interactie/rb/';

  describe('test ', function () {

    beforeEach(function () {
      // Ensure the height of the browser is large enough to see the language switch and search and be able to click on it
      browser.driver.manage().window().maximize();

      // assure the browser does not wait for angular to load (since the page is no angular app)
      //      browser.ignoreSynchronization = true;
      browser.get(homepageURL);
    });

    testcases.map(function (testcase, index) {

      if (index < browser.params.max) { // for demo purposes, break after a few test runs

        it('Test case ' + index, function () {

          if (testcase.Family_situation === "married") {
            po.marriedFamily.click();
          } else {
            po.singleFamily.click();
          }

          if (testcase.Children === "Yes") {
            po.withChildren.click();
          } else {
            po.withoutChildren.click();
          }

          po.nextButton.click();

          browser.sleep(2000);

          if (testcase.Traffic != 0) {
            po.verkeerDekking.click();
          }

          if (testcase.Consumers_and_home != 0) {
            po.consumentDekking.click();
          }

          if (testcase.Health_and_family != 0) {
            po.medischDekking.click();
          }

          if (testcase.Work_and_income != 0) {
            po.werkDekking.click();
          }

          if (testcase.Taxes_and_assets === "Yes") {
            po.fiscaalDekking.click();
          }


          // get actual result
          var actualResult = po.totaalBedrag.getText().then(function (textValue) {
            return textValue[0];
          });

          expect(actualResult).toBe(testcase.Total);

        });

      } else {
        console.log('test run: ', index + 1, ' skipped.')
      };
    });
  });
});
