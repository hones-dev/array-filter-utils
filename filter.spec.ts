import { isSet, notNullable, requiredIsNotNullable, requiredIsSet } from './filter';

type T = { readonly key?: string | null | number | boolean };

describe('array.filter(requiredIsSet)', () => {
    it('return true if element is set', () => {
        const test_array: readonly T[] = [
            { key: 'valid' },
            { key: null },
            { key: undefined },
            {},
            { key: 0 },
            { key: false },
        ] as const;

        const result = test_array.filter(requiredIsSet('key'));

        expect(result).toStrictEqual([{ key: 'valid' }, { key: null }, { key: 0 }, { key: false }]);
    });
});

describe('array.filter(requiredIsNotNullable)', () => {
    it('return true if element is set and not null', () => {
        const test_array: readonly T[] = [
            { key: 'valid' },
            { key: null },
            { key: undefined },
            {},
            { key: 0 },
            { key: false },
        ] as const;

        const result = test_array.filter(requiredIsNotNullable('key'));

        expect(result).toStrictEqual([{ key: 'valid' }, { key: 0 }, { key: false }]);
    });
});

describe('array.filter(isSet)', () => {
    it('remove undefined elements', () => {
        const testArray = ['valid', null, undefined, 0, false] as const;

        const result = testArray.filter(isSet);

        expect(result).toStrictEqual(['valid', null, 0, false]);
    });
});

describe('array.filter(notNullable)', () => {
    it('remove null and undefined elements', () => {
        const testArray = ['valid', null, undefined, 0, false] as const;

        const result = testArray.filter(notNullable);

        expect(result).toStrictEqual(['valid', 0, false]);
    });
});
