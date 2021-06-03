import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  
     it('should check correctness of data validation for email during registration - domain without dot', async () => {
       await page.navigateToRegister();
       await page.getLoginInputInRegistration().sendKeys("user123");
       await page.getPassInputInRegistration().sendKeys("user123");
       await page.getMailInputInRegistration().sendKeys("aaaa@aaa");
       await page.getRegisterButton().click();
       await page.sleep(3000);
       expect(await page.getErrorEmailRegistration().getText()).toEqual("Poprawny e-mail wymagany!");
     });
     it('should check correctness of data validation for email during registration - dot after at sign', async () => {
       await page.navigateToRegister();
       await page.getLoginInputInRegistration().sendKeys("user123");
       await page.getPassInputInRegistration().sendKeys("user123");
       await page.getMailInputInRegistration().sendKeys("bbb@.bb");
       await page.getRegisterButton().click();
       await page.sleep(3000);
       expect(await page.getErrorEmailRegistration().getText()).toEqual("Poprawny e-mail wymagany!");
     });
     it('should check correctness of data validation for email during registration - without at email sign', async () => {
       await page.navigateToRegister();
       await page.getLoginInputInRegistration().sendKeys("user123");
       await page.getPassInputInRegistration().sendKeys("user123");
       await page.getMailInputInRegistration().sendKeys("ccc.ccc");
       await page.getRegisterButton().click();
       await page.sleep(3000);
       expect(await page.getErrorEmailRegistration().getText()).toEqual("Poprawny e-mail wymagany!");
     });
     it('should check correctness of data validation for email during registration - checking uniqueness of the account', async () => {
       await page.navigateToRegister();
       await page.getLoginInputInRegistration().sendKeys("admin");
       await page.getPassInputInRegistration().sendKeys("admin");
       await page.getMailInputInRegistration().sendKeys("admin@admin.pl");
       await page.getRegisterButton().click();
       await page.sleep(3000);
       expect(await page.getErrorEmailRegistration().getText()).toEqual("Takie konto już istnieje!");
     });
     it('should check empty boxes in registration form - for login', async () => {
       await page.navigateToRegister();
       await page.getLoginInputInRegistration().sendKeys("");
       await page.getPassInputInRegistration().sendKeys("123456789");
       await page.getMailInputInRegistration().sendKeys("admin@admin.pl");
       await page.getRegisterButton().click();
       await page.sleep(3000);
       expect(await page.getErrorEmailRegistration().getText()).toEqual("Login wymagany!");
     });
    it('should check empty boxes in registration form - for password', async () => {
       await page.navigateToRegister();
       await page.getLoginInputInRegistration().sendKeys("qwertyuiop123456789");
       await page.getPassInputInRegistration().sendKeys("");
       await page.getMailInputInRegistration().sendKeys("admin@admin.pl");
       await page.getRegisterButton().click();
       await page.sleep(3000);
       expect(await page.getErrorEmailRegistration().getText()).toEqual("Hasło wymagane!");
     });
     it('should check empty boxes in registration form - for e-mail', async () => {
       await page.navigateToRegister();
       await page.getLoginInputInRegistration().sendKeys("qwertyuiop123456789");
       await page.getPassInputInRegistration().sendKeys("123456789");
       await page.getMailInputInRegistration().sendKeys("");
       await page.getRegisterButton().click();
       await page.sleep(3000);
       expect(await page.getErrorEmailRegistration().getText()).toEqual("Poprawny e-mail wymagany!");
     });
   
     it('should display error message about incorrect password in login form', async () => {
           // login out
       await page.navigateTo();
       await page.getLoginScreenButton().click();
       await page.sleep(1000);
   
       // login
       await page.navigateTo();
       await page.getLoginScreenButton().click();
       await page.sleep(1000);
       await page.getLoginInput().sendKeys("admin");
       await page.getPasswordInput().sendKeys("1234");
       await page.getLoginButton().click();
   
       expect(await page.getErrorMessage().getText()).toEqual("Niepoprawne dane");
   
       await page.sleep(3000);
     });
   
     it('should not login', async () => {
       // login out
       await page.navigateTo();
       await page.getLoginScreenButton().click();
   
       // login
       await page.navigateTo();
       await page.getLoginScreenButton().click();
       await page.sleep(1000);
       await page.getLoginInput().sendKeys("1");
       await page.getPasswordInput().sendKeys("1");
       await page.getLoginButton().click();
   
       expect(await page.getErrorMessage().getText()).toEqual("Niepoprawne dane");
   
       await page.sleep(3000);
     });
     
     it('should login', async () => {
       await page.navigateTo();
       await page.getLoginScreenButton().click();
       await page.sleep(1000);
       await page.getLoginInput().sendKeys("admin");
       await page.getPasswordInput().sendKeys("admin");
       await page.getLoginButton().click();
       await page.sleep(3000);
  
       expect(await page.getUserName().getText()).toEqual('admin');
     });
   
     it('should read category', async () => {
       await page.navigateToAboutMe();
       expect(await page.getCategoryText().getText()).toEqual('O naszym sklepie');
       await page.sleep(3000);
     });
   
  it('check if correct number of products were added to chart', async () => {
    // login out
    await page.navigateTo();
    await page.getLoginScreenButton().click();

    // login
    await page.navigateTo();
    await page.getLoginScreenButton().click();
    await page.sleep(1000);
    await page.getLoginInput().sendKeys("admin");
    await page.getPasswordInput().sendKeys("admin");
    await page.getLoginButton().click();

    await page.sleep(3000);

    await page.navigeteToItem(20);
    await page.sleep(3000);
    await page.inputText("body > app-root > div.content > app-item > div.item > div.buy > input[type=number]:nth-child(2)", 5);
    await page.getAddItemToChartButton().click()
    await page.sleep(3000);
    await page.navigateToOrder();

    await page.sleep(8000);

    var parents = await page.getProducts();

    var index = -1;
    for (let i = 0; i < parents.length; i++) {
      await page.sleep(3000);
      var text = await page.getTextOfElement('body > app-root > div.content > app-order > div > div:nth-child(' + (i + 2) + ') > a');
      if (text.includes('Tetra Pleco Veggie 250ml')) {
        index = i
        break;
      }
    }

    var value = await page.getValueOfInput('body > app-root > div.content > app-order > div > div:nth-child(' + (index + 2) + ') > input')
    expect(value).toBe('51')

  });

  it('should check uniqueness two random product descriptions', async () => {
    await page.navigateToItem1();
    var desc1 = await page.getDescription().getText();

    await page.navigateToItem2();
    var desc2 = await page.getDescription().getText();

    expect(desc1 != desc2);
  });


  async function login() {
    await page.navigateTo();
    await page.getLoginScreenButton().click();

    await page.navigateTo();
    await page.getLoginScreenButton().click();
    await page.sleep(1000);
    await page.getLoginInput().sendKeys("admin");
    await page.getPasswordInput().sendKeys("admin");
    await page.getLoginButton().click();

    await page.sleep(3000);
  }

  it('should place an order - empty inputs', async () => {
    await login()
    await page.sleep(2000);
    await page.navigateToCategory1()
    await page.sleep(2000);
    await page.getSecondItemInCategory().click();
    await page.sleep(2000);
    await page.addToChart().click();
    await page.sleep(2000);
    await page.navigateToOrder();
    await page.sleep(2000);
    await page.getOrderButton().click();
    await page.sleep(2000);
    await page.getOrderButton2().click();
    await page.sleep(2000);
    expect(await page.getOrderErrorMessage().getText()).toEqual('Wprowadź poprawnie dane');
  });

  it('should place an order - correct inputs', async () => {
    await login()
    await page.sleep(2000);
    await page.navigateToCategory1()
    await page.sleep(2000);
    await page.getSecondItemInCategory().click();
    await page.sleep(2000);
    await page.addToChart().click();
    await page.sleep(2000);
    await page.navigateToOrder();
    await page.sleep(2000);
    await page.getOrderButton().click();
    await page.sleep(2000);

    for (let i = 0; i < 7; i++) {
      await page.inputText('body > app-root > div.content > app-summary > div > div.personalData > tr:nth-child(' + (i + 2) + ') > td:nth-child(2) > input[type=text]', "123")
      await page.sleep(200);
    }

    await page.getSecondShipment().click()

    await page.sleep(2000);
    await page.getOrderButton2().click();
    await page.sleep(2000);
    expect(await page.getOrderSummaryUserLogin().getText()).toEqual('admin');
  });

  it('should place an order - empty chart', async () => {
    await login()
    await page.sleep(2000);
    await page.navigateToOrder();
    await page.sleep(2000);
    let isPresent;
    try {
      isPresent = await page.getOrderButton2().isPresent()
    } catch (error) {
      isPresent = false
    }
    expect(isPresent).toBeFalsy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
