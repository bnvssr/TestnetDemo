// load pageobjects
var HeaderPage = require('./db-tools.po');

// load the test data
var testdata = require('./db-tools.data.json'); // load test data

describe('Tools Page', function () {

  // instantiate pageobject
  var header = new HeaderPage();
  var homepageURL = 'https://extra.abnamro.nl/interactie/rb/';

  beforeEach(function () {
    // Ensure the height of the browser is large enough to see the language switch and search and be able to click on it
    browser.driver.manage().window().maximize();

    // assure the browser does not wait for angular to load (since the page is no angular app)
    browser.ignoreSynchronization = true;
    browser.get(homepageURL);
  });

  describe('Tests for display of Checkboxes', function () {
    var Objkeys = Object.keys(testdata['testcases']); // Retrieve test cases for PIN5Messages
    for (var i = 0; i < Objkeys.length; i++) {
      (function (s) {
        console.log(s);
        it('Prive checkbox should be displayed', function () {

          if (s.family_situation != "single") {
            header.marriedFamily.click();
          } else {
            header.singleFamily.click();
          }

          if (s.Children != "yes") {
            header.withoutChildren.click();
          } else {
            header.withChildren.click();
          }

          header.nextButton.click();

          browser.sleep(2000);

          if (s.consumers_and_home != "0") {
            header.verkeerDekking.click();
          }

          if (s.Health_and_family != "0") {
            header.consumentDekking.click();
          }

          if (s.Work_and_income != "0") {
            header.medischDekking.click();
          }

          if (s.Taxes_and_assets != "0") {
            header.fiscaalDekking.click();
          }

          console.log(s.traffic);
        });
      })(testdata.testcases[i]);
    } //end for loop

  });
});
