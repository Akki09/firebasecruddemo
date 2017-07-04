import { FirebaseproductcrudPage } from './app.po';

describe('firebaseproductcrud App', () => {
  let page: FirebaseproductcrudPage;

  beforeEach(() => {
    page = new FirebaseproductcrudPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
