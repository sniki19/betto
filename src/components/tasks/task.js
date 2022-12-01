import { nextWorkflowStepExists } from '../../utils/workflow'
import { cb, ce } from '../shared'

export const createTask = props => {
	const { id, title, description, time, userId, workflowStep } = props

	const line1 = ce('div', {
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
						value: 'Edit',
						'data-action': 'edit'
					}),
					cb({
						value: 'Delete',
						'data-action': 'delete'
					})
				]
			})
		]
	})

	let nextStepBtn = null
	if (nextWorkflowStepExists(workflowStep)) {
		nextStepBtn = cb({
			value: '>',
			'data-action': 'move'
		})
	}

	const line2 = ce('div', {
		children: [
			ce('span', {
				innerHTML: description
			}),
			nextStepBtn
		]
	})

	const line3 = ce('div', {
		children: [
			ce('span', {
				innerHTML: userId,
				style: 'color: yellowgreen;'
			}),
			ce('span', {
				innerHTML: new Date(time).toLocaleDateString(),
				style: 'color: blue;'
			})
		]
	})

	const line4 = ce('div', {
		innerHTML: workflowStep
	})

	const task = ce('div', {
		id: id,
		className: 'task',
		style: 'border: 1px solid red',
		'data-dnditem': true,
		children: [line1, line2, line3, line4]
	})

	return task
}
