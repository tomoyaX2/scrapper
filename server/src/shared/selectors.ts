import { HitomiFields } from './enums/HitomiFields';
import { SelectorArgs, SelectorTypes } from './types';
import * as cheerio from 'cheerio';
import { hostUrl } from './constants';
import * as puppeteer from 'puppeteer';

export const getSelectors: Record<HitomiFields, SelectorArgs> = {
  [HitomiFields.Author]: {
    selector: 'h2 ul.comma-list li',
    type: SelectorTypes.List,
  },
  [HitomiFields.Group]: {
    selector: '#groups ul.comma-list li',
    type: SelectorTypes.List,
  },
  [HitomiFields.Languages]: {
    selector: '#language',
    type: SelectorTypes.List,
  },
  [HitomiFields.Series]: {
    selector: '#series ul.comma-list li',
    type: SelectorTypes.List,
  },
  [HitomiFields.Tags]: {
    selector: '#tags li',
    textFormatter: (text) => text.replace(' ♂', '').replace(' ♀', ''),
    type: SelectorTypes.List,
  },
  [HitomiFields.Title]: {
    selector: '#gallery-brand',
    type: SelectorTypes.String,
  },
  [HitomiFields.Images]: {
    selector: 'ul.thumbnail-list li',
    type: SelectorTypes.Images,
  },
  [HitomiFields.Type]: {
    selector: '#type',
    type: SelectorTypes.String,
  },
};

export const groupBySelector = async (
  { selector, textFormatter, type }: SelectorArgs,
  $: cheerio.CheerioAPI,
  page: puppeteer.Page,
) => {
  const items = [];
  switch (type) {
    case SelectorTypes.String: {
      items.push($(selector).text());
      break;
    }
    case SelectorTypes.List: {
      const list = $(selector);
      for (const item of list) {
        const result = textFormatter
          ? textFormatter($(item).children('a').text())
          : $(item).children('a').text();
        items.push(result);
      }
      break;
    }
    case SelectorTypes.Images: {
      const list = $(selector);
      for (const item of list) {
        const result = $(item).children('div').children('a').attr('href');
        const referer = hostUrl + result;
        await page.goto(referer);
        await page.waitForSelector('img.lillie');
        const htmlData = await page.evaluate(
          () => document.querySelector('*').outerHTML,
        );
        const image$ = cheerio.load(htmlData);
        const imageUrl = image$('img.lillie').attr('src');
        items.push({
          imageUrl,
          referer: referer.split('#')[0].replace('avif', 'webp'),
        });
      }
      break;
    }
    default: {
    }
  }

  return items;
};
