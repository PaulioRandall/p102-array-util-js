import ArrayUtil from './ArrayUtil.js'

const {
	beforeLast, //
	beforeLastIndex,
	callAll,
	clear,
	findByField,
	insert,
	insertAfter,
	insertBefore,
	itemAfter,
	itemBefore,
	last,
	lastIndex,
	remove,
	replace,
	withinRange,
} = ArrayUtil

const A = 'A'
const B = 'B'
const C = 'C'
const D = 'D'

test('beforeLast() returns null for list with 1 item', () => {
	const exp = beforeLast([A])
	expect(exp).toEqual(null)
})

test('beforeLast() returns correct item', () => {
	const exp = beforeLast([A, B, C])
	expect(exp).toEqual(B)
})

test('beforeLastIndex() returns -1 for list with 1 item', () => {
	const exp = beforeLastIndex([A])
	expect(exp).toEqual(-1)
})

test('beforeLastIndex() returns 2 for list with 4 items', () => {
	const exp = beforeLastIndex([A, B, C, D])
	expect(exp).toEqual(2)
})

test('callAll() calls all functions', () => {
	const called = []
	const calledWith = []

	const fA = (...args) => {
		called.push(A)
		calledWith.push(args)
	}

	const fB = (...args) => {
		called.push(B)
		calledWith.push(args)
	}

	const list = [fA, C, fB, D]
	callAll(list, 'rum', 'whiskey')

	expect(called).toEqual([A, B])
	expect(calledWith).toEqual([
		['rum', 'whiskey'],
		['rum', 'whiskey'],
	])
})

test('clear() removes all items', () => {
	const list = [A, B, C]
	clear(list)
	expect(list).toEqual([])
})

test('findByField() finds the first valid item', () => {
	const A = { id: 1 }
	const B = { id: 2 }
	const C = { id: 3 }

	const list = [A, B, C]
	const result = findByField(list, 'id', 2)
	expect(result).toEqual(B)
})

test('itemBefore()', () => {
	const list = [A, B, C]
	expect(itemBefore(list, A)).toEqual(null)
	expect(itemBefore(list, B)).toEqual(A)
	expect(itemBefore(list, C)).toEqual(B)
	expect(itemBefore(list, D)).toEqual(null)
})

test('itemAfter()', () => {
	const list = [A, B, C]
	expect(itemAfter(list, A)).toEqual(B)
	expect(itemAfter(list, B)).toEqual(C)
	expect(itemAfter(list, C)).toEqual(null)
	expect(itemAfter(list, D)).toEqual(null)
})

test('insert() puts item in correct place', () => {
	const list = [A, C]
	insert(list, 1, B)
	expect(list).toEqual([A, B, C])
})

test('insert() puts item at end of list', () => {
	const list = [A, B]
	insert(list, 2, C)
	expect(list).toEqual([A, B, C])
})

test('insert() throws if index is out of bounds', () => {
	const f = () => insert([A, C], 5, B)
	expect(f).toThrow(Error)
})
test('insertAfter() puts item in correct place', () => {
	const list = [A, C]
	insertAfter(list, A, B)
	expect(list).toEqual([A, B, C])
})

test('insertAfter() throws if ref item not in list', () => {
	const f = () => insertAfter([A, C], D, B)
	expect(f).toThrow(Error)
})

test('insertBefore() puts item in correct place', () => {
	const list = [A, C]
	insertBefore(list, C, B)
	expect(list).toEqual([A, B, C])
})

test('insertBefore() throws if ref item not in list', () => {
	const f = () => insertBefore([A, C], D, B)
	expect(f).toThrow(Error)
})

test('last() returns null for empty list', () => {
	const exp = last([])
	expect(exp).toEqual(null)
})

test('last() returns correct item', () => {
	const exp = last([A, B, C])
	expect(exp).toEqual(C)
})

test('remove() remove correct item', () => {
	const list = [A, B, C]
	remove(list, B)
	expect(list).toEqual([A, C])
})

test('remove() remove nothing when item not in list', () => {
	const list = [A, B, C]
	remove(list, D)
	expect(list).toEqual([A, B, C])
})

test('replace() swaps correct items', () => {
	const list = [A, B, C]
	replace(list, C, D)
	expect(list).toEqual([A, B, D])
})

test('replace() throws if current item is not in list', () => {
	const f = () => replace([A, B], D, C)
	expect(f).toThrow(Error)
})

test('withinRange() with length excluded', () => {
	const f = (i) => withinRange([A, B, C], i)

	expect(f(-1)).toEqual(false)
	expect(f(0)).toEqual(true)
	expect(f(1)).toEqual(true)
	expect(f(2)).toEqual(true)
	expect(f(3)).toEqual(false)
})

test('withinRange() with length included', () => {
	const f = (i) => withinRange([A, B, C], i, true)

	expect(f(-1)).toEqual(false)
	expect(f(0)).toEqual(true)
	expect(f(1)).toEqual(true)
	expect(f(2)).toEqual(true)
	expect(f(3)).toEqual(true)
	expect(f(4)).toEqual(false)
})
