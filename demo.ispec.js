// load pageobjects
var HeaderPage = require('./demo.po');

// load the test data
var testdata = require('./data/testdata.json'); // load test data

describe('Premium calculations', function () {

  // instantiate pageobject
  var header = new HeaderPage();
  var homepageURL = 'https://extra.abnamro.nl/interactie/rb/';



  beforeEach(function () {
    // Ensure the height of the browser is large enough to see the language switch and search and be able to click on it
    browser.driver.manage().window().maximize();

    // assure the browser does not wait for angular to load (since the page is no angular app)
    //    browser.ignoreSynchronization = true;
    browser.get(homepageURL);

    //    browser.sleep(1000);
  });

  fdescribe('Insurance premium calculator', function () {
    var Objkeys = Object.keys(testdata['testcases']);

    for (var i = 0; i < Objkeys.length; i++) {
      (function (s) {
        it(s.name, function () {

          //select family situation
          if (s.Family_situation != "single") {
            header.marriedFamily.click();
          } else {
            header.singleFamily.click();
          }

          //select kids situation
          if (s.Children != "Yes") {
            header.withoutChildren.click();
          } else {
            header.withChildren.click();
          }

          header.nextButton.click();

          browser.sleep(2000);

          //select traffic if not 0
          if (s.Traffic != 0) {
            header.verkeerDekking.click();
          }

          //select consumers and home if not 0
          if (s.Consumers_and_home != 0) {
            header.consumentDekking.click();
          }

          //select health and family if not 0
          if (s.Health_and_family != 0) {
            header.medischDekking.click();
          }

          //select work and income if not 0
          if (s.Work_and_income != 0) {
            header.werkDekking.click();
          }

          //select taxes if not 0
          if (s.Taxes_and_assets != 0) {
            header.fiscaalDekking.click();
          }


          //Validate the total amount
          if (s.Total != 0) {
            //get the actual total from the AUT
            var actualTotal = header.totalAmount.getText();

            //build the expected outcome
            var expTotalMonthly = '€ ' + s.Total;

            //validate to ensure that actual contains expected outcome
            expect(actualTotal).toContain(expTotalMonthly);
          }

        });
      })(testdata.testcases[i]);
    } //end for loop

  });
});
