import { HitomiFields } from './enums/HitomiFields';
import { SelectorArgs, SelectorTypes } from './types';
import * as cheerio from 'cheerio';
import { hostUrl } from './constants';

export const getSelectors: Record<HitomiFields, SelectorArgs> = {
  [HitomiFields.Artists]: {
    selector: 'h2 ul.comma-list li',
    type: SelectorTypes.List,
  },
  [HitomiFields.Groups]: {
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
  [HitomiFields.Pictures]: {
    selector: 'ul.thumbnail-list li',
    type: SelectorTypes.Pictures,
  },
};

export const groupBySelector = (
  { selector, textFormatter, type }: SelectorArgs,
  $: cheerio.CheerioAPI,
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
    case SelectorTypes.Pictures: {
      const list = $(selector);
      for (const item of list) {
        const result = $(item).children('div').children('a').attr('href');
        items.push(hostUrl + result);
      }
      break;
    }
    default: {
    }
  }

  return items;
};
