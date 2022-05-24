import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { hostUrl } from 'src/shared/constants';
import { ExpectedTypes } from 'src/shared/enums/ExpectedTypes';
import { HitomiFields } from 'src/shared/enums/HitomiFields';
import { getSelectors, groupBySelector } from 'src/shared/selectors';
import { AlbumService } from '../album/album.service';

const expectedClassNames = [
  // ExpectedTypes.ArtistCG,
  ExpectedTypes.Doujinshi,
  // ExpectedTypes.Manga,
  // ExpectedTypes.GameCG,
];

const expectedFields = [
  HitomiFields.Title,
  HitomiFields.Author,
  HitomiFields.Group,
  HitomiFields.Languages,
  HitomiFields.Series,
  HitomiFields.Tags,
  HitomiFields.Images,
  HitomiFields.Type,
];

@Injectable()
export class ScrapperService {
  constructor(private albumService: AlbumService) {}

  init = async (): Promise<void> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlData = await this.parsePage({
      page,
      url: hostUrl,
      selector: 'img.lazyload',
    });
    await this.processData(page, htmlData, browser);
  };

  processData = async (
    page: puppeteer.Page,
    htmlData: string,
    browser: puppeteer.Browser,
  ) => {
    const urls = await this.generateUrlsToParse(htmlData);
    const result = [];
    let index = 0;
    for (const url of urls) {
      index++;
      console.log(`${index}/${urls.length} urls`);
      const detailsData = await this.collectDetailsData(page, url);
      result.push(detailsData);
    }
    await this.saveDetailsData(result);
    await browser.close();
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

  collectDetailsData = async (page: puppeteer.Page, url: string) => {
    const htmlData = await this.parsePage({
      page,
      url,
      selector: '.gallery-preview',
    });
    const $ = cheerio.load(htmlData);
    const fieldData = {};
    for (const key of expectedFields) {
      const data = await groupBySelector(getSelectors[key], $, page);
      fieldData[key] = data;
    }
    return fieldData;
  };

  saveDetailsData = async (albumModel: Record<HitomiFields, any[]>[]) => {
    return this.albumService.generateAlbum(albumModel);
  };
}
