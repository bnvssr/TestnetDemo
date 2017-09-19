var jsonfile = require('jsonfile');

// load pageobjects
var PO = require('./aab.po');

// load the test data
//var testdata = require('./aab.data.json'); // load test data
var file = './aab.data.json'
var testdata = jsonfile.readFileSync(file);
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

    for (var i = 0; i < testcases.length; i++) {
      (function (testcase) {
        it('Test case ' + i, function () {

          if (testcase.Family === "married") {
            po.marriedFamily.click();
          } else {
            po.singleFamily.click();
          }

          if (testcase.Children === "yes") {
            po.withChildren.click();
          } else {
            po.withoutChildren.click();
          }

          po.nextButton.click();

          browser.sleep(2000);

          if (testcase.Traffic === "yes") {
            po.verkeerDekking.click();
          }

          if (testcase.Consumers === "yes") {
            po.consumentDekking.click();
          }

          if (testcase.Health === "yes") {
            po.medischDekking.click();
          }

          if (testcase.Work === "yes" && testcase.Pension === "yes") {
            console.log("Oeps verkeerd ...");
          } else {

            if (testcase.Work === "yes") {
              po.werkDekking.click();
            }

            if (testcase.Pension === "yes") {
              po.pensioenDekking.click();
            }
          }

          if (testcase.Taxes === "yes") {
            po.fiscaalDekking.click();
          }

          // get expected result

          po.totaalBedrag.getText().then(function (textValue) {
            //            console.log(testcases[0].expected_result, textValue[0]);
            testcase["Expected result"] = textValue[0];

            jsonfile.writeFileSync(file, testdata)

          });

        });
      })(testdata.testcases[i]);
    }
  });
});
