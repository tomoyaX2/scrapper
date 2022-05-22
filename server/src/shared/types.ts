export enum SelectorTypes {
  List = 'list',
  String = 'string',
  Pictures = 'pictures',
}

export interface SelectorArgs {
  selector: string;
  textFormatter?: (text: string) => string;
  type: SelectorTypes;
}
