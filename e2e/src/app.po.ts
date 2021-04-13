import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  async sleep(ms: number) {
    await browser.sleep(ms)
  }
  getLoginScreenButton() {
    return element(by.css('body > app-root > header > div.right_area > a:nth-child(1)'))
  }
  getLoginInput() {
    return element(by.css('body > app-root > div.content > app-login > div > div > input[type=text]:nth-child(2)'))
  }
  getPasswordInput() {
    return element(by.css('body > app-root > div.content > app-login > div > div > input[type=password]:nth-child(4)'))
  }
  getLoginButton() {
    return element(by.css('body > app-root > div.content > app-login > div > div > div:nth-child(5) > button'))
  }
  getUserName() {
    return element(by.css('body > app-root > div.sidebar > div.login_feature > h4'))
  }

  navigateToAboutMe() {
    return browser.get('/info');
  }
  getCategoryText() {
    return element(by.css('body > app-root > div.content > app-info > div.choosenCategory'));
  }

  navigateToCategory1() {
    return browser.get('/category/1');
  }
  openProduct() {
    return element(by.css('body > app-root > div.content > app-shop > div.shop > div##mainSide > a:nth-child(2)'))
  }
  addProductToChart() {
    return element(by.css('body > app-root > div.content > app-item > div.item-mobile > div.buy > input[type=number]:nth-child(2)'))
  }
  getAmountOfProductsInput() {
    return element(by.css('body > app-root > div.content > app-item > div.item-mobile > div.buy > input[type=number]:nth-child(2)'))
  }
  navigateToOrder() {
    return browser.get('/order');
  }
  getProducts(){
    return element.all(by.css('body > app-root > div.content > app-order > div > div > a'));
  }
  getProductsNameInChart(){
    return element(by.css('body > app-root > div.content > app-order > div > div > a'));
  }
  getChartButton(i) {
    return element(by.css('body > app-root > div.content > app-login > div > div > div:nth-child(i) > button'))
  }

  

}
