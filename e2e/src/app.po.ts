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
}
