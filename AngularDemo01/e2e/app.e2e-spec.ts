import { AngularDemo01Page } from './app.po';

describe('angular-demo01 App', () => {
  let page: AngularDemo01Page;

  beforeEach(() => {
    page = new AngularDemo01Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
