// describe('Google', () => {
//   beforeAll(async () => {
//     await page.goto('https://google.com');
//   });

//   it('should be titled "Google"', async () => {
//     await expect(page.title()).resolves.toMatch('Google');
//   });
// });
it('should load the app successfully', async () => {
  // Go to the app page
  await page.goto('http://127.0.0.1:5500/index.html');

  // Wait for the app to be loaded
  await page.waitForSelector('#app');

  // Expect the data to be loaded
  await expect(page).toMatchElement('div[class=title]', {
    text: "Alex's List",
  });
});

it('should be able to click the check button of the read doc item', async () => {
  // Get the read doc item reference
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.waitForSelector('#app');
  const readDocItem = await expect(page).toMatchElement(
    'li[class$=item]:has(div[class$=itemName])',
    { text: 'Read Logto get-started document' }
  );

  // Expect to click the related button
  await expect(readDocItem).toClick('button', { text: 'Check' });
});

it('should open the an external link in a new tab', async () => {
  // Narrow down to the specific item by geting the read doc item reference
  const readDocItem = await expect(page).toMatchElement(
    'li[class$=item]:has(div[class$=itemName])',
    { text: 'Read Logto get-started document' }
  );

  await expect(readDocItem).toClick('div[class=itemNotes] a', { text: 'Get started' });

  const target = await browser.waitForTarget(
    (target) => target.url() === 'https://docs.logto.io/docs/tutorials/get-started/'
  );

  const logtoDocPage = await target.page();
  expect(logtoDocPage).toBeTruthy();

  // Remember to close the page after testing
  await logtoDocPage?.close();
});

