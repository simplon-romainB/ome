import { AppPage } from './app.po';
import { browser, by, element, logging, ExpectedConditions } from 'protractor';

describe('ome', () => {
  let page: AppPage;
  let login = element(by.id('connexionEmailInput'));
  let loginEmail = element(by.id('loginEmail'));
  let loginPassword = element(by.id('loginPassword'));
  let loginConnexion = element(by.id('loginConnexion'));
  let EC = ExpectedConditions;




  beforeEach(() => {
    browser.get('/blog');


  });

  it('should login admin', () => {
    browser.sleep(5000);
    login.click();
    loginEmail.sendKeys('romain.barry69@gmail.com');
    loginPassword.sendKeys('Magicstar198.');
    loginConnexion.click();
    browser.wait(EC.elementToBeClickable(element(by.id('addArticleButton'))), 5000);
    console.log('ok ajouter article est clickable');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
