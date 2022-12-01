import { Observer } from './Observer'
import { isFunction, isObject } from './tools'

export class Store extends Observer {
	constructor(defaultState = {}, reducer) {
		super()
		this.state = defaultState
		this.reducer = reducer
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

	dispatch(action) {
		if (isObject(action)) {
			const newState = this.reducer(this.state, action)
			this.broadcast(newState)
		} else if (isFunction(action)) {
			action(this.dispatch.bind(this))
		} else {
			throw new Error('Invalid action type')
		}
	}
}