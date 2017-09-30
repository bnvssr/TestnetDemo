'use strict';

var jsonfile = require('jsonfile');

// load pageobjects
var PO = require('./aab.po');

// load the test data
console.log("testdata file used: ", browser.params.testdata);
var testdata = jsonfile.readFileSync(browser.params.testdata);
var testcases = testdata.testcases;

describe('Legal Expenses Insurance, ', function () {

  // instantiate pageobject
  var po = new PO();
  var homepageURL = 'https://extra.abnamro.nl/interactie/rb/';

  describe('get expected result ', function () {

    beforeEach(function () {
      // Ensure the height of the browser is large enough to see the language switch and search and be able to click on it
      browser.driver.manage().window().maximize();

      // assure the browser does not wait for angular to load (since the page is no angular app)
      //      browser.ignoreSynchronization = true;
      browser.get(homepageURL);
    });

    testcases.map(function (testcase, index) {
      it('Test case ' + index, function () {

        if (testcase.Family === "married") {
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

        if (testcase.Traffic === "Yes") {
          po.verkeerDekking.click();
        }

        if (testcase.Consumers === "Yes") {
          po.consumentDekking.click();
        }

        if (testcase.Health === "Yes") {
          po.medischDekking.click();
        }

        if (testcase.Work === "Yes" && testcase.Pension === "Yes") {
          console.log("Oeps verkeerd ...");
        } else {

          if (testcase.Work === "Yes") {
            po.werkDekking.click();
          }

          if (testcase.Pension === "Yes") {
            po.pensioenDekking.click();
          }
        }

        if (testcase.Taxes === "Yes") {
          po.fiscaalDekking.click();
        }

        // get expected result
        po.totaalBedrag.getText().then(function (textValue) {
          testcase["Expected result"] = textValue[0];

          jsonfile.writeFileSync(browser.params.testdata, testdata)

        });
      });
    });
  });
});
