import { store } from '../../store'
import { hasNextWorkflowStep } from '../../utils/workflow'
import { cb, ce } from '../shared'

export const createTask = props => {
	const { id, title, description, time, userId, workflowStep } = props

	const state = store.getState()
	const user = state.users.find(user => user.id === userId)

	const line1 = ce('div', {
		className: 'line line-1',
		children: [
			ce('div', {
				children: [
					ce('span', {
						innerHTML: title
					})
				]
			}),
			ce('div', {
				children: [
					cb({
						className: 'btn edit-btn',
						value: 'Edit',
						'data-action': 'edit'
					}),
					cb({
						className: 'btn delete-btn',
						value: 'Delete',
						'data-action': 'delete'
					})
				]
			})
		]
	})

	let nextStepBtn = null
	if (hasNextWorkflowStep(workflowStep)) {
		nextStepBtn = cb({
			className: 'btn move-btn',
			value: '>',
			'data-action': 'move'
		})
	}

	const line2 = ce('div', {
		className: 'line line2',
		children: [
			ce('span', {
				innerHTML: description
			}),
			nextStepBtn
		]
	})

	const line3 = ce('div', {
		className: 'line line3',
		children: [
			ce('span', {
				innerHTML: user.name
			}),
			ce('span', {
				innerHTML: new Date(time).toLocaleDateString()
			})
		]
	})

	const task = ce('div', {
		id: id,
		className: 'task',
		children: [line1, line2, line3]
	})
	if (hasNextWorkflowStep(workflowStep)) {
		task.dataset['dnditem'] = true
	}

	return task
}
