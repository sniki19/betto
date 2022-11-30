import { Observer } from './observer'

export class Store extends Observer {
	constructor(defaultState = {}) {
		super()
		this.state = defaultState
	}

	broadcast(data) {
		this.state = data
		this.observers.forEach(subscriber => subscriber(data))
	}

	getState() {
		return {
			...this.state
		}
	}
}