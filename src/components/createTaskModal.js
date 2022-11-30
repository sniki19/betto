import {
	addTaskToBoardAction,
	closeModalAction,
	getAllUsersAction,
	getTaskByIdAction,
	updateTaskAction
} from '../utils/actions'
import { dispatch as dataDispatch } from '../utils/dataService'
import { dispatch as modalDispatch } from '../utils/modalManager'
import { cb, ce, cf, csb, cta, cti } from './shared'

const createUserSelectBox = (callback, selectedId) => {
	const usersBox = csb({}, (e) => {
		callback(e.target.value)
	})

	const users = dataDispatch(getAllUsersAction())
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
			id: Date.now().toString(),
			title: '',
			description: '',
			time: Date.now(),
			userId: '',
			workflowStep: 'todo'
		}
	}

	const task = dataDispatch(getTaskByIdAction(id))
	return task
}

export const createTaskModalContent = id => {
	const isNewTask = !id
	const props = getPropsById(id)
	const setUserId = userId => props.userId = userId

	const line1 = ce('div', {
		children: [
			cti({
				value: props.title
			}, (e) => {
				props.title = e.target.value
			})
		]
	})

	const line2 = ce('div', {
		children: [
			cta({
				value: props.description
			}, (e) => {
				props.description = e.target.value
			})
		]
	})

	const line3 = ce('div', {
		children: [
			ce('div', {
				children: [createUserSelectBox(setUserId, props.userId)]
			}),
			ce('div', {
				children: [
					cb({
						value: 'Cancel'
					}, () => {
						modalDispatch(closeModalAction())
					}),
					cb({
						value: 'Confirm'
					}, () => {
						if (isNewTask) {
							dataDispatch(addTaskToBoardAction(props))
						} else {
							dataDispatch(updateTaskAction(props))
						}

						modalDispatch(closeModalAction())
					})
				]
			})
		]
	})

	const task = cf([line1, line2, line3])
	return task
}
