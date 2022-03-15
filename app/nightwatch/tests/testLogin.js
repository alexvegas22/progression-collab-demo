
describe('Page Login', function() {
    it('mauvais login', function(browser) {
      browser
        .url('http://ordralphabetix.dti.crosemont.quebec:8018/login')
        .waitForElementVisible('#login')
        .sendKeys('div[val="STANDARD"] input#username', "une serie de charactères")
        .sendKeys('div[val="STANDARD"] input#passwd', "un mot de passe")
        .click('div[val="STANDARD"] input[type="submit"]')
        .expect.url().to.match(/^http:\/\/ordralphabetix.dti.crosemont.quebec:8018\/login$/);
    });

    it('login valide', function(browser) {
        browser
          .url('http://ordralphabetix.dti.crosemont.quebec:8018/login')
          .waitForElementVisible('#login')
          .sendKeys('div[val="STANDARD"] input#username', "test")
          .sendKeys('div[val="STANDARD"] input#passwd', "test")
          .click('div[val="STANDARD"] input[type="submit"]')
          .expect.url().to.match(/^http:\/\/ordralphabetix.dti.crosemont.quebec:8018\/?$/);
      });
  
  });
  