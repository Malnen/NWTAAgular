import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should login', async () => {

    await page.navigateTo();
    await page.getLoginScreenButton().click();
    await page.getLoginInput().sendKeys("admin");
    await page.getPasswordInput().sendKeys("admin");
    await page.getLoginButton().click();
    await page.sleep(3000);
    console.log(await page.getUserName().getText());
    expect(await page.getUserName().getText()).toEqual('admin');
  });

  it('should read category', async () => {
    await page.navigateToAboutMe();
    expect(await page.getCategoryText().getText()).toEqual('O naszym sklepie');
    await page.sleep(3000);
  });


  it('check if correct number of products were added to chart', async () => {
    let i: number;


    // login out
    await page.navigateTo();
    await page.getLoginScreenButton().click();


    // login
    await page.navigateTo();
    await page.getLoginScreenButton().click();
    await page.getLoginInput().sendKeys("admin");
    await page.getPasswordInput().sendKeys("admin");
    await page.getLoginButton().click();

    await page.sleep(3000);


    // 
    await page.navigateToOrder();

    await page.sleep(3000);

    var parents = await page.getProducts();

    var index = -1;
    for (let i = 0; i < parents.length; i++) {
      var text = await page.getTextOfElement('body > app-root > div.content > app-order > div > div:nth-child(' + (i + 2) + ') > a');
      if (text.includes('Tetra Pleco Veggie 250ml')) {
        index = i
        break;
      }
    }

    var value = await page.getValueOfInput('body > app-root > div.content > app-order > div > div:nth-child(' + (index + 2) + ') > input')
    expect(value).toBe('5')

  });

  it('should not login', async () => {
    // login out
    await page.navigateTo();
    await page.getLoginScreenButton().click();

    // login
    await page.navigateTo();
    await page.getLoginScreenButton().click();
    await page.getLoginInput().sendKeys("1");
    await page.getPasswordInput().sendKeys("1");
    await page.getLoginButton().click();

    expect(await page.getErrorMessage().getText()).toEqual("Niepoprawne dane");

    await page.sleep(3000);

  });

  it('should login, then add and delete product from chart', async () => {
    // login out
    await page.navigateTo();
    await page.getLoginScreenButton().click();


    // login
    await page.navigateTo();
    await page.getLoginScreenButton().click();
    await page.getLoginInput().sendKeys("admin");
    await page.getPasswordInput().sendKeys("admin");
    await page.getLoginButton().click();

    await page.sleep(3000);

    // 
    await page.navigateToOrder();
    await page.sleep(3000);

    var parents = await page.getProducts();

    var index = -1;
    for (let i = 0; i < parents.length; i++) {
      var text = await page.getTextOfElement('body > app-root > div.content > app-order > div > div:nth-child(' + (i + 2) + ') > a');
      if (text.includes('Skalar')) {
        index = i
        console.log(text)
        await page.removeItem(index+2).click(); 
        break;
      }
    }

    await page.sleep(3000);

    //check if cart contains deleted item   
    var contains = false;
   for (let i = 0; i < parents.length; i++) {
      var text = await page.getTextOfElement('body > app-root > div.content > app-order > div > div:nth-child(' + (i + 2) + ') > a');
      if (text.includes('Skalar')) {
        contains = true;
        break;
      }
    }
    expect(contains).toBeFalse()
  }); 

  it('should check if in mobile version there are more icons on the left side than in desktop version', async () => {
    var size = browser.driver.manage().window().getSize();
    

    // mobile
    browser.driver.manage().window().setSize(400, 700);

    var mobile = (await (await page.getMobileOptions1()).length) + (await page.getMobileOptions2()).length;
    
    // desktop
    browser.driver.manage().window().setSize((await size).width,(await size).height);

    var desktop =  (await page.getMobileOptions2()).length;

    expect(mobile != desktop);
  });


  /*
  Pomysły na testy:



  it('should check effectiveness of adding products to chart', async () => {
    dodawanie kilkukrotne, czy liczba przedmiotów się zwiększa
  });

  it('should check uniqueness two random product descriptions', async () => {
    
  });

  it('should register, login and check basic user activities', async () => {
    
  });



  it('should check correctness of data validation during login and registration', async () => {
    
  });

  */

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
