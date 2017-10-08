/** @constructor */
var HeaderPage = function () {
  // List all public elements here. Preferably use the data-testid attrubute to select elements
  this.EXTRASMALLWIDTH = 320;
  this.SMALLWIDTH = 768;
  this.MEDIUMWIDTH = 1024;
  this.LARGEWIDTH = 1280;

  // Checkboxes
  this.singleFamily = $$('[data-id="gezinssituatie-button-a"]');
  this.marriedFamily = $$('[data-id="gezinssituatie-button-b"]');
  this.withChildren = $$('[data-id="kinderen-button-a"]');
  this.withoutChildren = $$('[data-id="kinderen-button-b"]');

  this.nextButton = element.all(by.css('[data-id="verder-button"]')).get(0);

  this.verkeerDekking = $$('[data-id="verkeer-dekking"]');
  this.consumentDekking = $$('[data-id="consument-dekking"]');
  this.medischDekking = $$('[data-id="medisch-dekking"]');
  this.werkDekking = $$('[data-id="werk-dekking"]');
  this.pensioenDekking = $$('[data-id="pensioen-dekking"]');
  this.fiscaalDekking = $$('[data-id="fiscaal-dekking"]');

  this.enabled = $$();

  this.totaalBedrag = $$('[data-id="totaal-header-bedrag"]');
  this.totalAmount = $$('[data-id="totaal-header-bedrag"]');
};
module.exports = HeaderPage;
