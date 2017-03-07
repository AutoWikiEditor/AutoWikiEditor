export default class EditingPipeline {
	_mutators = {};

	/**
	 * @param {Mutator[]} mutators
	 */
	constructor(mutators) {
		mutators.forEach(m => {
			if (!this._mutators[m.stage]) {
				this._mutators[m.stage] = [];
			}
			this._mutators[m.stage].push(m);
		});
	}

	/**
	 *
	 * @param {EditingContext} editingContext
	 */
	process(editingContext) {
		const stages = [
			{
				name: 'initial',
				after: () => ""
			}
		];
	}

	/**
	 *
	 * @param {EditingContext} editingContext
	 * @param {string} stage
	 * @return {boolean} Whether processing should continue
	 * @private
	 */
	_performStage(editingContext, stage) {
		/** @var {Mutator[]} list */
		const list = this._mutators[stage];

		if (!list) {
			return true;
		}

		for (let i = 0; i < list.length; i++) {
			const op = list[i];
			op.mutate(editingContext);
			if (editingContext.skipInfo) {
				return false;
			}
		}

		return true;
	}
}
