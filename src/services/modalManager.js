import { createModalLayout } from '../components/layouts/modal'
import { actionType } from '../utils/constants'

const defaultState = {
	modal: null,
	isOpen: false
}

let state = defaultState

function open(modalContent) {
	const modal = createModalLayout()
	modal.loadContent(modalContent)
	state = {
		modal: modal,
		isOpen: true
	}
	document.body.append(modal.layout)
}

function close() {
	state.modal.destroy()
	state = defaultState
}

function dispatch(action) {
	switch (action.type) {
		case actionType.openModal:
			open(action.payload)
			break
		case actionType.closeModal:
			close()
			break
	}
}

export {
	dispatch
}
