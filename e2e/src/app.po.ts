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
    return browser.get('shop/category/1');
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
  getProducts() {
    return element.all(by.css('body > app-root > div.content > app-order > div > div'));
  }
  getProductsNameInChart() {
    return element(by.css('body > app-root > div.content > app-order > div > div > a'));
  }
  getChartButton(i) {
    return element(by.css('body > app-root > div.content > app-login > div > div > div:nth-child(i) > button'))
  }

  getTextOfElement(selector) {
    return element(by.css(selector)).getText().then(function (text) {
      return text
    });
  }
  getValueOfInput(selector) {
    return element(by.css(selector)).getAttribute('value').then(function (value) {
      return value
    });
  }
  removeItem(i) {
    return element(by.css('body > app-root > div.content > app-order > div > div:nth-child(' + i + ') > i'));
  }
  getLoginMenuTextMobile() {
    return element(by.css('body > app-root > div.sidebar > #mobile-part-one > a.buttonRouter.active > span'));
  }
  getLoginMenuText() {
    return element(by.css('body > app-root > header > div.right_area > a:nth-child(1)'));
  }
  getErrorMessage() {
    return element(by.css('body > app-root > div.content > app-login > div > div > div:nth-child(5) > div'));
  }

  getMobileOptions1() {
    return element.all(by.css('body > app-root > div.sidebar > #mobile-part-one > a'));
  }
  getMobileOptions2() {
    return element.all(by.css('body > app-root > div.sidebar > #mobile-part-two > a'));
  }

  getSecondItemInCategory(){
    return element(by.css('#mainSide > a:nth-child(3)'));
  }

  navigateToItem1() {
    return browser.get('/item/0');
  }
  navigateToItem2() {
    return browser.get('/item/1');
  }
  getDescription(){
    return element(by.css('body > app-root > div.content > app-item > div.item > div.description > span'));
  }

  navigateToRegister(){
    return browser.get('/register');
  }

  getLoginInputInRegistration() {
    return element(by.css('body > app-root > div.content > app-register > div > input[type=text]:nth-child(2)'))
  }
  getPassInputInRegistration() {
    return element(by.css('body > app-root > div.content > app-register > div > input[type=password]:nth-child(5)'))
  }
  getMailInputInRegistration() {
    return element(by.css('body > app-root > div.content > app-register > div > input[type=text]:nth-child(8)'))
  }
  getRegisterButton() {
    return element(by.css('body > app-root > div.content > app-register > div > button'))
  }
  getErrorEmailRegistration() {
    return element(by.css('body > app-root > div.content > app-register > div > div.error'))
  }

  addToChart(){
    return element(by.css('body > app-root > div.content > app-item > div.item > div.buy > input[type=button]:nth-child(3)'));
  } 
  getOrderButton(){
    return element(by.css('#orderbutton > input'));
  } 
  getOrderButton2(){
    return element(by.css('body > app-root > div.content > app-summary > div > div:nth-child(3) > input'));
  } 
  getOrderErrorMessage(){
    return element(by.css('body > app-root > div.content > app-summary > div > div:nth-child(3) > div.error'));
  }
  getOrderPersonalData(){
    return element(by.css('body > app-root > div.content > app-summary > div > div.personalData'));
  }

  inputText(input, text){
    return element(by.css(input)).sendKeys(text);
  }
  getSecondShipment(){
    return element(by.css('body > app-root > div.content > app-summary > div > div.shippingMethod > label:nth-child(4) > input'));
  }
  getOrderSummaryUserLogin(){
    return element(by.css('body > app-root > div.content > app-summary > div > span'));
  }
}