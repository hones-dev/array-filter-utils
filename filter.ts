/**
 * `array-filter-utils` is a library offering a bulk of functions to filter arrays with type
 * management.
 */

export type WithRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
export declare type WithNonNullable<T, K extends keyof T> = Omit<T, K> &
  Required<{ [P in K]: NonNullable<T[P]> }>;

/**
 * filter function to check if the object keys are defined
 *
 * ```ts
 * const array: Array<{keys?: string}> = [{}, {keys: "ok"}]
 * const result: Array<{keys: string}> = array.filter(requiredIsSet('keys')) // [{keys: "ok"}]
 * ```
 * @param keys keys of the filter element to check
 * @returns a function to use in filter returning true if the row's keys are setSet
 */
export function requiredIsSet<T, K extends keyof T>(...keys: K[]) {
  return (row: T | WithRequired<T, K>): row is WithRequired<T, K> =>
    keys.every((key) => isSet(row[key]));
}

/**
 * filter function to check if the object keys are defined and not null
 *
 * ```ts
 * const array: Array<{keys?: string}> = [{}, {keys: null}, {keys: "ok"}]
 * const result: Array<{keys: string}> = array.filter(requiredIsNotNullable('keys')) // [{keys: "ok"}]
 * ```
 * @param keys keys of the filter element to check
 * @returns a function to use in filter returning true if the row's keys is notNullable
 */
export function requiredIsNotNullable<T, K extends keyof T>(...keys: K[]) {
  return (row: T | WithNonNullable<T, K>): row is WithNonNullable<T, K> =>
    keys.every((key) => notNullable(row[key]));
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
