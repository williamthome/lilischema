export interface StringMatchOptions {
  readonly caseSensitive?: boolean
}

export interface StringArrayMatchOptions extends StringMatchOptions {
  readonly splitInWords?: boolean
}
