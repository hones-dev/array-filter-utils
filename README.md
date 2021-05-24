# array-filter-utils

`array-filter-utils` is a library offering a bulk of functions to filter arrays with type
management.

# Usage

```
npm install array-filter-utils
```

```ts
import { isSet } from "array-filter-utils";

const array = [1, undefined, 3];
// typeof array == Array<number | undefined>
const result = array.filter(isSet);
// typeof result == Array<number>
```

# Examples

## `array.filter(requiredIsSet)`

return true if element is set

```ts
const test_array: readonly T[] = [
  { key: "valid" },
  { key: null },
  { key: undefined },
  {},
  { key: 0 },
  { key: false },
] as const;

const result = test_array.filter(requiredIsSet("key"));

expect(result).toStrictEqual([
  { key: "valid" },
  { key: null },
  { key: 0 },
  { key: false },
]);
```

## `array.filter(requiredIsNotNullable)`

return true if element is set and not null

```ts
const test_array: readonly T[] = [
  { key: "valid" },
  { key: null },
  { key: undefined },
  {},
  { key: 0 },
  { key: false },
] as const;

const result = test_array.filter(requiredIsNotNullable("key"));

expect(result).toStrictEqual([{ key: "valid" }, { key: 0 }, { key: false }]);
```

## `array.filter(isSet)`

remove undefined elements

```ts
const testArray = ["valid", null, undefined, 0, false] as const;

const result = testArray.filter(isSet);

expect(result).toStrictEqual(["valid", null, 0, false]);
```

## `array.filter(notNullable)`

remove null and undefined elements

```ts
const testArray = ["valid", null, undefined, 0, false] as const;

const result = testArray.filter(notNullable);

expect(result).toStrictEqual(["valid", 0, false]);
```
