import { fetchCreateTask, fetchUpdateTask } from '../../services/asyncActions/tasks'
import { store } from '../../store'
import { closeModalAction } from '../../store/actions'
import { uid } from '../../utils/tools'
import { cb, ce, cf, csb, cta, cti } from '../shared'

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

const getTaskById = id => {
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
	const task = getTaskById(id)
	const setUserId = userId => task.userId = userId

	const line1 = ce('div', {
		className: 'line line1',
		children: [
			cti({
				className: 'title',
				value: task.title,
				placeholder: 'Title'
			}, (e) => {
				task.title = e.target.value
			})
		]
	})

	const line2 = ce('div', {
		className: 'line line2',
		children: [
			cta({
				className: 'description',
				value: task.description,
				placeholder: 'Description'
			}, (e) => {
				task.description = e.target.value
			})
		]
	})

	const line3 = ce('div', {
		className: 'line line3',
		children: [
			ce('div', {
				className: 'column',
				children: [createUserSelectBox(setUserId, task.userId)]
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
							store.dispatch(fetchCreateTask(task))
						} else {
							store.dispatch(fetchUpdateTask(task))
						}

						store.dispatch(closeModalAction())
					})
				]
			})
		]
	})

	return cf([line1, line2, line3])
}
