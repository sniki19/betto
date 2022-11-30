import { actionType } from '../constants'

export const openModalAction = (modal) => ({
	type: actionType.openModal,
	payload: modal
})

export const closeModalAction = () => ({
	type: actionType.closeModal
})