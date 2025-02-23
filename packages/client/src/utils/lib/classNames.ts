export type Mods = Record<string, boolean | string | string[]>

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: string[] = []
): string {
  return [
    cls,
    ...Object.entries(mods)
      .filter(record => Boolean(record[1]))
      .map(([className]) => className),
    ...additional.filter(Boolean),
  ].join(' ')
}
