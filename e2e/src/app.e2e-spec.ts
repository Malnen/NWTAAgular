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


    // remove old addition from chart
    await page.navigateToOrder();

    await page.sleep(3000);

    var parents = await page.getProducts();

    parents.find('xxx');
  
/*
    await page.sleep(3000);


    for (i=0; i < size; i++)
      if (expect(await page.getProductsNameInChart().getText()).toEqual('Tetra Pleco Veggie 250ml'))
        await page.getChartButton(i).click();
    

    // add specify quantity od product
    await page.navigateToCategory1();
    await page.openProduct();
    await page.getAmountOfProductsInput().sendKeys("5");
    await page.addProductToChart();

    await page.navigateToOrder();

    for (i=0; i < size; i++)
      if (expect(await page.getProductsNameInChart().getText()).toEqual('Tetra Pleco Veggie 250ml'))
        expect(await page.getCategoryText().getText()).toEqual('5');


    */
  });

  /*it('should login, then add and delete product from chart', async () => {
    await page.navigateTo();
    await page.getLoginScreenButton().click();
    await page.getLoginInput().sendKeys("admin");
    await page.getPasswordInput().sendKeys("admin");
    await page.getLoginButton().click();

    await page.sleep(3000);

    await page.navigateToCategory1();
    await page.openProduct();


  });*/

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
