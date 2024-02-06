export function isDefined<V>(value: V | undefined | null): value is V {
  return value !== undefined && value !== null;
}
