describe('Test', function() {
  it('demo test', function(browser) {
    browser
      .url('http://ordralphabetix.dti.crosemont.quebec:8018/')
      /*.setValue('input[type=search]', 'nightwatch')*/
      .click('button.btn')
      .waitForElementVisible('#login')
      /*.assert.containsText('.mainline-results', 'Nightwatch.js')*/
      .end();
  });

});
