import { LazyloadingPage } from './app.po';

describe('lazyloading App', () => {
  let page: LazyloadingPage;

  beforeEach(() => {
    page = new LazyloadingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
