import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { hostUrl } from 'src/shared/constants';
import { ExpectedTypes } from 'src/shared/enums/ExpectedTypes';
import { HitomiFields } from 'src/shared/enums/HitomiFields';
import { getSelectors, groupBySelector } from 'src/shared/selectors';
import { AlbumService } from '../album/album.service';
import { LogService } from '../log/log.service';

const expectedClassNames = [
  ExpectedTypes.ArtistCG,
  ExpectedTypes.Doujinshi,
  ExpectedTypes.Manga,
  ExpectedTypes.GameCG,
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
  constructor(
    private albumService: AlbumService,
    private logService: LogService,
  ) {}

  init = async (): Promise<void> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlData = await this.parsePage({
      page,
      url: hostUrl,
      selector: 'img.lazyload',
    });
    const lastPageIndex = this.getPagesAmount(htmlData);
    const pages = Array.from(Array(lastPageIndex).keys());
    for (const pageIndex of pages) {
      await this.logService.createLogFile(`hitomi`);
      this.logService.saveLog(`${pageIndex + 1}/${lastPageIndex} page`);
      const htmlData = await this.parsePage({
        page,
        url: hostUrl + `/?page=${pageIndex + 1}`,
        selector: 'img.lazyload',
      });
      await this.processData(page, htmlData);
      if (pageIndex + 1 === lastPageIndex) {
        await browser.close();
      }
    }
  };

  processData = async (page: puppeteer.Page, htmlData: string) => {
    const urls = await this.generateUrlsToParse(htmlData);

    const result = [];
    let index = 0;
    for (const url of urls) {
      index++;
      this.logService.saveLog(`${index}/${urls.length} urls`);
      const detailsData = await this.collectDetailsData(page, url);
      result.push(detailsData);
    }
    await this.saveDetailsData(result);
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

  getPagesAmount = (htmlData: string) => {
    const $ = cheerio.load(htmlData);
    const pagesList = $('.page-container ul li');
    const lastPageData = pagesList[pagesList.length - 1];
    return parseInt($(lastPageData).children('a').text());
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
