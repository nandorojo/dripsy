export const aliases = {
  zi: 'zIndex',
  dsp: 'display',
  pos: 'position',
  t: 'top',
  r: 'right',
  e: 'end',
  b: 'bottom',
  l: 'left',
  s: 'start',

  ov: 'overflow',
  ox: 'overflowX',
  oy: 'overflowY',

  f: 'flex',
  fb: 'flexBasis',
  fd: 'flexDirection',
  fg: 'flexGrow',
  fs: 'flexShrink',
  fw: 'flexWrap',
  jc: 'justifyContent',
  ac: 'alignContent',
  ai: 'alignItems',
  als: 'alignSelf',

  col: 'color',
  bg: 'backgroundColor',
  o: 'opacity',

  ff: 'fontFamily',
  fos: 'fontSize',
  fost: 'fontStyle',
  fow: 'fontWeight',
  ls: 'letterSpacing',
  lh: 'lineHeight',
  ta: 'textAlign',
  tt: 'textTransform',
  ww: 'wordWrap',

  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  me: 'marginEnd',
  mb: 'marginBottom',
  ml: 'marginLeft',
  ms: 'marginStart',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pe: 'paddingEnd',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  ps: 'paddingStart',
  px: 'paddingHorizontal',
  py: 'paddingVertical',

  w: 'width',
  miw: 'minWidth',
  maw: 'maxWidth',
  h: 'height',
  mih: 'minHeight',
  mah: 'maxHeight',

  bbc: 'borderBottomColor',
  bblr: 'borderBottomLeftRadius',
  bber: 'borderBottomEndRadius',
  bbrr: 'borderBottomRightRadius',
  bbw: 'borderBottomWidth',
  blc: 'borderLeftColor',
  blw: 'borderLeftWidth',
  boc: 'borderColor',
  br: 'borderRadius',
  bs: 'borderStyle',
  brw: 'borderRightWidth',
  brc: 'borderRightColor',
  btc: 'borderTopColor',
  btlr: 'borderTopLeftRadius',
  btrr: 'borderTopRightRadius',
  btw: 'borderTopWidth',
  bw: 'borderWidth',
  bls: 'borderLeftStyle',
  brs: 'borderRightStyle',
  bts: 'borderTopStyle',
  bbs: 'borderBottomStyle',

  shac: 'shadowColor',
  shar: 'shadowRadius',
  shof: 'shadowOffset',
  shop: 'shadowOpacity',
  bxs: 'boxSizing',
  bxsh: 'boxShadow',

  marginX: 'marginHorizontal',
  marginY: 'marginVertical',
  paddingX: 'paddingHorizontal',
  paddingY: 'paddingVertical',

  // web-only
  ussel: 'userSelect',
  cur: 'cursor',
} as const
export type Aliases = typeof aliases

export const scales = {
  // RN SPECIFIC SCALES FIRST
  textShadowColor: 'colors',
  shadowColor: 'colors',
  marginEnd: 'space',
  marginStart: 'space',
  paddingEnd: 'space',
  paddingStart: 'space',
  end: 'space',
  start: 'space',
  // REST
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  caretColor: 'colors',
  opacity: 'opacities',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  marginVertical: 'space',
  marginHorizontal: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  paddingHorizontal: 'space',
  paddingVertical: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  inset: 'space',
  insetBlock: 'space',
  insetBlockEnd: 'space',
  insetBlockStart: 'space',
  insetInline: 'space',
  insetInlineEnd: 'space',
  insetInlineStart: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderBottomEndRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  borderBlock: 'borders',
  borderBlockEnd: 'borders',
  borderBlockEndStyle: 'borderStyles',
  borderBlockEndWidth: 'borderWidths',
  borderBlockStart: 'borders',
  borderBlockStartStyle: 'borderStyles',
  borderBlockStartWidth: 'borderWidths',
  borderBlockStyle: 'borderStyles',
  borderBlockWidth: 'borderWidths',
  borderEndEndRadius: 'radii',
  borderEndStartRadius: 'radii',
  borderInline: 'borders',
  borderInlineEnd: 'borders',
  borderInlineEndStyle: 'borderStyles',
  borderInlineEndWidth: 'borderWidths',
  borderInlineStart: 'borders',
  borderInlineStartStyle: 'borderStyles',
  borderInlineStartWidth: 'borderWidths',
  borderInlineStyle: 'borderStyles',
  borderInlineWidth: 'borderWidths',
  borderStartEndRadius: 'radii',
  borderStartStartRadius: 'radii',
  outlineColor: 'colors',
  outlineWidth: 'borderWidths',
  outlineStyle: 'borderStyles',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  blockSize: 'sizes',
  inlineSize: 'sizes',
  maxBlockSize: 'sizes',
  maxInlineSize: 'sizes',
  minBlockSize: 'sizes',
  minInlineSize: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors',
} as const
export type Scales = typeof scales
