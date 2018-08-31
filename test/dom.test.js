const { expect } = require('chai');
const puppeteer = require('puppeteer');
const app = require('../app');

let browser;
const url = 'http://localhost:4000';
let page;

const opts = {
  headless: false
};

before(async () => {
  browser = await puppeteer.launch(opts);
  page = await browser.newPage();
});

describe('test initial page elements with empty local storage', async () => {
  it('should have a title', async () => {
    await page.goto(url);
    expect(await page.title()).to.equal('Waste an Hour Having Fun');
  });

  it('should have a header', async () => {
    expect(await page.$eval('.title', header => header.innerText)).to.equal('Waste an Hour Having Fun');
  });

  it('should have a 6 ul', async () => {
    const ul = await page.$$('ul');
    expect(ul.length).to.equal(6);
  });

  it('should have player titles for player vs com', async () => {
    expect(await page.$eval('#palyer1-title', title => title.innerText)).to.equal('Player Wins');
    expect(await page.$eval('#palyer2-title', title => title.innerText)).to.equal('Computer Wins');
  });

  it('should have a initial values in local storage', async () => {
    expect(await page.evaluate(() => localStorage.getItem('player1'))).to.equal('user');
    expect(await page.evaluate(() => localStorage.getItem('player2'))).to.equal('com');
    expect(await page.evaluate(() => localStorage.getItem('player1Score'))).to.equal('0');
    expect(await page.evaluate(() => localStorage.getItem('player2Score'))).to.equal('0');
    expect(await page.evaluate(() => localStorage.getItem('tiesScore'))).to.equal('0');
  });
});

describe('test page elements after playing', async () => {
  it('should change the score when a choice is clicked', async () => {
    await page.goto(url);
    await page.click('#rock1');
    const p1Score = await page.$eval('#palyer1-score', p => p.innerText);
    const p2Score = await page.$eval('#palyer2-score', p => p.innerText);
    const tScore = await page.$eval('#ties-score', p => p.innerText);
    expect(parseInt(p1Score) + parseInt(p2Score) + parseInt(tScore)).to.equal(1);
  });

  it('should have one or none winning choice', async () => {
    const winningchoice = await page.$$('.winning-choice');
    expect(winningchoice.length).to.within(0, 1);
  });

  it('should have one or none losing choice', async () => {
    const losingchoice = await page.$$('.losing-choice');
    expect(losingchoice.length).to.within(0, 1);
  });

  it('should have two or none tie choice', async () => {
    const tiechoice = await page.$$('.tie-choice');
    const validLengths = [0, 2];
    expect(tiechoice.length).to.oneOf(validLengths);
  });

  it('should have stored score in local storage', async () => {
    const p1Score = await page.evaluate(() => localStorage.getItem('player1Score'));
    const p2Score = await page.evaluate(() => localStorage.getItem('player2Score'));
    const tScore = await page.evaluate(() => localStorage.getItem('tiesScore'));
    expect(parseInt(p1Score) + parseInt(p2Score) + parseInt(tScore)).to.equal(1);
  });

  it('should save the score after closing the page', async () => {
    await page.close();
    page = await browser.newPage();
    await page.goto(url);
    const p1Score = await page.evaluate(() => localStorage.getItem('player1Score'));
    const p2Score = await page.evaluate(() => localStorage.getItem('player2Score'));
    const tScore = await page.evaluate(() => localStorage.getItem('tiesScore'));
    expect(parseInt(p1Score) + parseInt(p2Score) + parseInt(tScore)).to.equal(1);
  });
});

describe('test page elements after switching to com vs com', async () => {
  it('should have player titles for com vs com', async () => {
    await page.goto(url);
    await page.click('#watch');
    expect(await page.$eval('#palyer1-title', title => title.innerText)).to.equal('Computer 1 Wins');
    expect(await page.$eval('#palyer2-title', title => title.innerText)).to.equal('Computer 2 Wins');
  });

  it('should have a changed values in local storage', async () => {
    expect(await page.evaluate(() => localStorage.getItem('player1'))).to.equal('com');
    expect(await page.evaluate(() => localStorage.getItem('player2'))).to.equal('com');
    expect(await page.evaluate(() => localStorage.getItem('player1Score'))).to.equal('0');
    expect(await page.evaluate(() => localStorage.getItem('player2Score'))).to.equal('0');
    expect(await page.evaluate(() => localStorage.getItem('tiesScore'))).to.equal('0');
  });

  it('should reset the score after changing mode', async () => {
    const p1Score = await page.$eval('#palyer1-score', p => p.innerText);
    const p2Score = await page.$eval('#palyer2-score', p => p.innerText);
    const tScore = await page.$eval('#ties-score', p => p.innerText);
    expect(parseInt(p1Score) + parseInt(p2Score) + parseInt(tScore)).to.equal(0);
  });

  it('should change the score after clicking play', async () => {
    await page.click('#play');
    const p1Score = await page.$eval('#palyer1-score', p => p.innerText);
    const p2Score = await page.$eval('#palyer2-score', p => p.innerText);
    const tScore = await page.$eval('#ties-score', p => p.innerText);
    expect(parseInt(p1Score) + parseInt(p2Score) + parseInt(tScore)).to.equal(1);
  });

  it('should have one or none winning choice', async () => {
    const winningchoice = await page.$$('.winning-choice');
    expect(winningchoice.length).to.within(0, 1);
  });

  it('should have one or none losing choice', async () => {
    const losingchoice = await page.$$('.losing-choice');
    expect(losingchoice.length).to.within(0, 1);
  });

  it('should have two or none tie choice', async () => {
    const tiechoice = await page.$$('.tie-choice');
    const validLengths = [0, 2];
    expect(tiechoice.length).to.oneOf(validLengths);
  });

  it('should have stored score in local storage', async () => {
    const p1Score = await page.evaluate(() => localStorage.getItem('player1Score'));
    const p2Score = await page.evaluate(() => localStorage.getItem('player2Score'));
    const tScore = await page.evaluate(() => localStorage.getItem('tiesScore'));
    expect(parseInt(p1Score) + parseInt(p2Score) + parseInt(tScore)).to.equal(1);
  });

  it('should save the score after closing the page', async () => {
    await page.close();
    page = await browser.newPage();
    await page.goto(url);
    const p1Score = await page.evaluate(() => localStorage.getItem('player1Score'));
    const p2Score = await page.evaluate(() => localStorage.getItem('player2Score'));
    const tScore = await page.evaluate(() => localStorage.getItem('tiesScore'));
    expect(parseInt(p1Score) + parseInt(p2Score) + parseInt(tScore)).to.equal(1);
  });

  it('should save the playing mode after closing the page', async () => {
    expect(await page.evaluate(() => localStorage.getItem('player1'))).to.equal('com');
    expect(await page.evaluate(() => localStorage.getItem('player2'))).to.equal('com');
  });
});

after(async () => {
  await browser.close();
  app.close();
});
