/**
 * `array-filter-utils` is a library offering a bulk of functions to filter arrays with type
 * management.
 */

type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type WithNonNullable<T, K extends keyof T> = Omit<T, K> &
  Record<K, NonNullable<T[K]>>;

/**
 * filter function to check if the object key is defined
 *
 * ```ts
 * const array: Array<{key?: string}> = [{}, {key: "ok"}]
 * const result: Array<{key: string}> = array.filter(requiredIsSet('key')) // [{key: "ok"}]
 * ```
 * @param key key of the filter element to check
 * @returns a function to use in filter returning true if the row's key isSet
 */
export function requiredIsSet<T, K extends keyof T>(key: K) {
  return (row: T | WithRequired<T, K>): row is WithRequired<T, K> =>
    isSet(row[key]);
}

/**
 * filter function to check if the object key is defined and not null
 *
 * ```ts
 * const array: Array<{key?: string}> = [{}, {key: null}, {key: "ok"}]
 * const result: Array<{key: string}> = array.filter(requiredIsNotNullable('key')) // [{key: "ok"}]
 * ```
 * @param key key of the filter element to check
 * @returns a function to use in filter returning true if the row's key is notNullable
 */
export function requiredIsNotNullable<T, K extends keyof T>(key: K) {
  return (row: T | WithNonNullable<T, K>): row is WithNonNullable<T, K> =>
    notNullable(row[key]);
}

/**
 * filter function to exclude undefined
 *
 * ```ts
 * const array: Array<string | undefined> = [undefined, "ok"]
 * const result: Array<string> = array.filter(isSet) // ["ok"]
 * ```
 */
export function isSet<T>(row: T | undefined): row is T {
  return row !== undefined;
}

/**
 * filter function to exclude null and undefined
 *
 * ```ts
 * const array: Array<string | null | undefined> = [undefined, null, "ok"]
 * const result: Array<string> = array.filter(notNullable) // ["ok"]
 * ```
 */
export function notNullable<T>(row: T): row is NonNullable<T> {
  return row !== undefined && row !== null;
}
