import { Injectable } from '@nestjs/common';
import * as xmlBuilder from 'xmlbuilder';
import * as moment from 'moment';
import * as fs from 'fs';
import { LogService } from '../log/log.service';

@Injectable()
export class XmlService {
  constructor(private readonly logService: LogService) {}
  builder;
  init() {
    this.builder = xmlBuilder
      .create('urlset', {
        encoding: 'UTF-8',
        version: '1.0',
      })
      .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
  }

  appendUrl(albumUrl: string) {
    this.builder = this.builder
      .ele('url')
      .ele('loc', albumUrl)
      .up()
      .ele('lastmod', moment(new Date()).format('YYYY-MM-DD'))
      .up()
      .up();
  }

  finishXml() {
    const xml = this.builder.end({ pretty: true });
    console.log(xml, 'xml');
    fs.writeFile('public/test.xml', xml, (err) => {
      if (err) {
        this.logService.saveLog(`${err}, err write xml file`);
      }
    });
    this.builder = null;
  }
}
