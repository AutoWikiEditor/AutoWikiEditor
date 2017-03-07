/**
 * Represents one operation on page text
 */
export default class Mutator {
	/**
	 * Performs processing, possibly mutating the state
	 * of the context with change() or skip()
	 *
	 * @abstract
	 * @param {EditingContext} editingContext
	 */
	mutate(editingContext) {
		throw new Error(typeof this + ' did not override Mutator.mutate');
	}

	/**
	 * Returns the stage at which this mutator should be applied
	 */
	get stage() {
		throw new Error(typeof this + ' did not override Mutator.stage');
	}
}
