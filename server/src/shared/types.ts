export enum SelectorTypes {
  List = 'list',
  String = 'string',
  Images = 'images',
}

export interface SelectorArgs {
  selector: string;
  textFormatter?: (text: string) => string;
  type: SelectorTypes;
}
