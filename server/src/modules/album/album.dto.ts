import { Author } from '../authors/authors.entity';
import { Gallery } from '../gallery/gallery.entity';
import { Group } from '../group/group.entity';
import { Image } from '../image/image.entity';
import { Language } from '../languages/languages.entity';
import { Series } from '../series/series.entity';
import { Tag } from '../tags/tags.entity';

export class AlbumDto {
  name?: string;
  gallery?: Gallery;
  images?: Image[];
  authors?: Author[];
  series?: Series;
  language?: Language;
  group?: Group;
  tags?: Tag[];
  path?: string;
}
