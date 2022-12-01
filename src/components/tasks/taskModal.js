import { addTaskToBoardAction, closeModalAction, updateTaskAction } from '../../store/actions'
import { store } from '../../store'
import { cb, ce, cf, csb, cta, cti } from '../shared'
import { uid } from '../../utils/tools'

const createUserSelectBox = (callback, selectedId) => {
	const usersBox = csb({
		className: 'user'
	}, (e) => {
		callback(e.target.value)
	})

	const users = store.getState().users
	users.forEach(user => {
		const option = ce('option', {
			value: user.id,
			innerHTML: user.name
		})
		usersBox.appendChild(option)
	})

	usersBox.value = selectedId || users[0].id
	callback(users[0].id)

	return usersBox
}

const getPropsById = id => {
	if (!id) {
		return {
			id: uid(),
			title: '',
			description: '',
			time: Date.now(),
			userId: '',
			workflowStep: 'todo'
		}
	}

	const task = store.getState().tasks.find(task => task.id === id)
	return task
}

export const createTaskModalContent = id => {
	const isNewTask = !id
	const props = getPropsById(id)
	const setUserId = userId => props.userId = userId

	const line1 = ce('div', {
		className: 'line line1',
		children: [
			cti({
				className: 'title',
				value: props.title,
				placeholder: 'Title'
			}, (e) => {
				props.title = e.target.value
			})
		]
	})

	const line2 = ce('div', {
		className: 'line line2',
		children: [
			cta({
				className: 'description',
				value: props.description,
				placeholder: 'Description'
			}, (e) => {
				props.description = e.target.value
			})
		]
	})

	const line3 = ce('div', {
		className: 'line line3',
		children: [
			ce('div', {
				className: 'column',
				children: [createUserSelectBox(setUserId, props.userId)]
			}),
			ce('div', {
				className: 'column',
				children: [
					cb({
						className: 'btn cancel-btn',
						value: 'Cancel'
					}, () => {
						store.dispatch(closeModalAction())
					}),
					cb({
						className: 'btn confirm-btn',
						value: 'Confirm'
					}, () => {
						if (isNewTask) {
							store.dispatch(addTaskToBoardAction(props))
						} else {
							store.dispatch(updateTaskAction(props))
						}

						store.dispatch(closeModalAction())
					})
				]
			})
		]
	})

	const task = cf([line1, line2, line3])
	return task
}
