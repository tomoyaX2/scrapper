import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { ExpectedTypes } from 'src/shared/enums/ExpectedTypes';
import { HitomiFields } from 'src/shared/enums/HitomiFields';
import { getSelectors, groupBySelector } from 'src/shared/selectors';
import { SelectorArgs, SelectorTypes } from 'src/shared/types';

const hostUrl = process.env.CURERNT_HOST;
const expectedClassNames = [
  ExpectedTypes.ArtistCG,
  ExpectedTypes.Doujinshi,
  ExpectedTypes.Manga,
  ExpectedTypes.GameCG,
];

const expectedFields = [
  HitomiFields.Title,
  HitomiFields.Artists,
  HitomiFields.Groups,
  HitomiFields.Languages,
  HitomiFields.Series,
  HitomiFields.Tags,
];

@Injectable()
export class ScrapperService {
  init = async (): Promise<void> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlData = await this.parsePage({
      page,
      url: hostUrl,
      selector: 'img.lazyload',
    });
    await this.processData(page, htmlData);
  };

  processData = async (page: puppeteer.Page, htmlData: string) => {
    const urls = await this.generateUrlsToParse(htmlData);
    console.log(urls, 'urls');
    for (const url of urls) {
      await this.readDetailsPage(page, url);
    }
  };

  generateUrlsToParse = async (htmlData: string) => {
    const urls = [];
    const $ = cheerio.load(htmlData);
    const groups = expectedClassNames.map((el) => $(el)); // array with grouped cheerio items
    for (const group of groups) {
      for (const item of group) {
        const url = $(item).children('a').attr('href');
        urls.push(hostUrl + url);
      }
    }
    return urls;
  };

  parsePage = async ({
    page,
    url,
    selector,
  }: {
    page: puppeteer.Page;
    url: string;
    selector: string;
  }) => {
    await page.goto(url);
    await page.waitForSelector(selector);
    const htmlData = await page.evaluate(
      () => document.querySelector('*').outerHTML,
    );
    return htmlData;
  };

  readDetailsPage = async (page: puppeteer.Page, url: string) => {
    const htmlData = await this.parsePage({
      page,
      url,
      selector: '.gallery-preview',
    });
    const $ = cheerio.load(htmlData);
    const fieldData = expectedFields.map((el) => ({
      data: groupBySelector(getSelectors[el], $),
      key: el,
    }));
    console.log(fieldData);
  };
}
