export enum SelectorTypes {
  List = 'list',
  String = 'string',
}

export interface SelectorArgs {
  selector: string;
  textFormatter?: (text: string) => string;
  type: SelectorTypes;
}
