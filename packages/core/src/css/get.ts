// from theme-ui/css
export function get(
  obj: object,
  key: string | number,
  def?: unknown,
  p?: number,
  undef?: unknown
): any {
  const path = key && typeof key === 'string' ? key.split('.') : [key]
  for (p = 0; p < path.length; p++) {
    obj = obj ? (obj as any)[path[p]] : undef
  }
  return obj === undef ? def : obj
}
