function isObject(v: any): boolean {
	return (
		typeof v === 'object' && //
		!Array.isArray(v) &&
		v !== null
	)
}

function err(msg: string) {
	return new Error(`[ArrayUtil] ${msg}`)
}

// beforeLast returns the item second from last, or null
// if no such item exists.
function beforeLast<T>(array: T[]): null | T {
	const i = beforeLastIndex(array)
	return i < 0 ? null : array[i]
}

// beforeLastIndex returns the index of the second from
// last item. This will be negative if $array contains
// less than 2 items.
function beforeLastIndex<T>(array: T[]): number {
	return array.length - 2
}

// callAll invokes all items that satisfy
// `typeof item === 'function'` passing $args on each call.
function callAll<T>(array: T[], ...args: any[]) {
	array.forEach((item) => {
		if (typeof item === 'function') {
			item(...args)
		}
	})
}

// clear removes all items.
function clear<T>(array: T[]) {
	array.splice(0)
}

// findByField returns the first matching item where the
// value of $field matches $value. Non-objects items are
// skipped during search. Null is returned if no matching
// item is found.
function findByField<T>(array: T[], field: string, value: any): null | T {
	interface ArrayObjectItem {
		[field]?: any
	}

	for (const item of array) {
		if (!isObject(item)) {
			continue
		}

		const obj = item as ArrayObjectItem
		if (obj[field] === value) {
			return item
		}
	}

	return null
}

// insert inserts $item at the $index. Throws an error if
// $index is out of bounds. Returns $item.
function insert<T>(array: T[], index: number, item: T) {
	if (!withinRange(array, index, true)) {
		throw err('Index is out of range')
	}

	array.splice(index, 0, item)
	return item
}

// insertAfter inserts $item in the slot after $refItem.
// Throws an error if $refItem is not found. Returns $item.
function insertAfter<T>(array: T[], refItem: T, item: T): T {
	const i = array.indexOf(refItem)

	if (i < 0) {
		throw err("Reference item doesn't exist")
	}

	array.splice(i + 1, 0, item)
	return item
}

// insertBefore inserts $item in the slot before $refItem.
// Throws an error if $refItem is not found. Returns $item.
function insertBefore<T>(array: T[], refItem: T, item: T) {
	const i = array.indexOf(refItem)

	if (i < 0) {
		throw err("Reference item doesn't exist")
	}

	array.splice(i, 0, item)
}

// itemAfter returns the item after $refItem. Returns null
// if $refItem is not found or is the last item.
function itemAfter<T>(array: T[], refItem: T) {
	const i = array.indexOf(refItem)
	const lastIdx = lastIndex(array)
	return i < 0 || i >= lastIdx ? null : array[i + 1]
}

// itemBefore returns the item before $refItem. Returns
// null if $refItem is not found or is the first item.
function itemBefore<T>(array: T[], refItem: T): null | T {
	const i = array.indexOf(refItem)
	return i <= 0 ? null : array[i - 1]
}

// last returns the last item in $array.
function last<T>(array: T[]): null | T {
	const i = lastIndex(array)
	return i < 0 ? null : array[i]
}

// lastIndex returns the index of the last item in $array.
function lastIndex<T>(array: T[]): number {
	return array.length - 1
}

// mapToField is a mapper returning the value of $field for
// all objects with a $field as an own property.
// Non-objects and objects without a $field property are
// skipped. This means the resultant array will be equal to
// or smaller than the $array, it may even have a length of
// zero.
function mapToField<T>(array: T[], field: string): T[] {
	interface ArrayObjectItem {
		[field]?: any
	}

	const result = []

	for (const item of array) {
		if (!isObject(item)) {
			continue
		}

		const obj = item as ArrayObjectItem
		if (field in obj) {
			result.push(obj[field])
		}
	}

	return result
}

// remove deletes $item from $array, if it exists. $item is
// returned.
function remove<T>(array: T[], item: T): T {
	const i = array.indexOf(item)

	if (i > -1) {
		array.splice(i, 1)
	}

	return item
}

// replace swaps the $currentItem with $newItem. An error
// is thrown if $currentItem is not found. Returns $newItem.
function replace<T>(array: T[], currentItem: T, newItem: T): T {
	const i = array.indexOf(currentItem)

	if (i < 0) {
		throw err("Current item doesn't exist")
	}

	array.splice(i, 1, newItem)
	return newItem
}

// withinRange returns true if $index is within the bounds
// $array, i.e. references a valid array slot. If
// $includeLength is true, $array's length is considered a
// valid index.
function withinRange<T>(
	array: T[],
	index: number,
	includeLength = false
): boolean {
	return (
		(index >= 0 && index < array.length) || //
		(includeLength && index === array.length) //
	)
}

export default {
	beforeLast, //
	beforeLastIndex,
	callAll,
	clear,
	delete: remove,
	findByField,
	insert,
	insertAfter,
	insertBefore,
	itemAfter,
	itemBefore,
	last,
	lastIndex,
	mapToField,
	remove,
	replace,
	withinRange,
}
