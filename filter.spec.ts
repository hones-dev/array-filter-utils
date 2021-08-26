import {
  isSet,
  notNullable,
  requiredIsNotNullable,
  requiredIsSet,
} from "./filter";

type T = {
  readonly key?: string | null | number | boolean;
  readonly key2?: string | null | number | boolean;
};

describe("array.filter(requiredIsSet)", () => {
  it("return true if element is set", () => {
    const test_array: readonly T[] = [
      { key: "valid", key2: true },
      { key: null, key2: true },
      { key: undefined, key2: true },
      { key2: true },
      { key: 0, key2: true },
      { key: false, key2: true },
      { key: false, key2: true },
    ] as const;

    const result = test_array.filter(requiredIsSet("key", "key2"));

    expect(result).toStrictEqual([
      { key: "valid", key2: true },
      { key: null, key2: true },
      { key: 0, key2: true },
      { key: false, key2: true },
      { key: false, key2: true },
    ]);
  });
});

describe("array.filter(requiredIsNotNullable)", () => {
  it("return true if element is set and not null", () => {
    const test_array: readonly T[] = [
      { key: "valid", key2: true },
      { key: null, key2: true },
      { key: undefined, key2: true },
      { key2: true },
      { key: 0, key2: true },
      { key: false, key2: true },
      { key: false, key2: true },
    ] as const;

    const result = test_array.filter(requiredIsNotNullable("key"));

    expect(result).toStrictEqual([
      { key: "valid", key2: true },
      { key: 0, key2: true },
      { key: false, key2: true },
      { key: false, key2: true },
    ]);
  });
});

describe("array.filter(isSet)", () => {
  it("remove undefined elements", () => {
    const testArray = ["valid", null, undefined, 0, false] as const;

    const result = testArray.filter(isSet);

    expect(result).toStrictEqual(["valid", null, 0, false]);
  });
});

describe("array.filter(notNullable)", () => {
  it("remove null and undefined elements", () => {
    const testArray = ["valid", null, undefined, 0, false] as const;

    const result = testArray.filter(notNullable);

    expect(result).toStrictEqual(["valid", 0, false]);
  });
});
