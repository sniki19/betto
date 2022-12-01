import { createModalLayout } from '../components/layouts/modal'
import { store } from '../store'

let modal = null

const subscribeToUpdate = ({ modal }) => {
	if (!modal) {
		return
	}

	if (modal.isOpen) {
		open()
	} else {
		close()
	}
}

const open = () => {
	if (!modal) {
		throw new Error('Modal layout not found')
	}
	document.body.append(modal.layout)
}

const close = () => {
	modal.destroy()
	store.unsubscribe(subscribeToUpdate)
}

export const createModal = content => {
	const modalLayout = createModalLayout()
	modalLayout.loadContent(content)

	modal = modalLayout
	store.subscribe(subscribeToUpdate)
	return true
}