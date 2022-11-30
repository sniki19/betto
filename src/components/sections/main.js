import { boardIdList } from '../../utils/constants'
import { createTaskBoard } from '../boards/taskBoard'
import { ce } from '../shared'

export const main = () => {
	const todoBoard = createTaskBoard({
		id: boardIdList.todo,
		name: 'Todo',
		btnOptions: {
			name: 'Add Task',
			action: 'add'
		},
		filter: task => task.workflowStep !== 'inProgress' && task.workflowStep !== 'done'
	})

	const inProgressBoard = createTaskBoard({
		id: boardIdList.inProgress,
		name: 'In Progress',
		filter: task => task.workflowStep === 'inProgress'
	})

	const doneBoard = createTaskBoard({
		id: boardIdList.done,
		name: 'Done',
		btnOptions: {
			name: 'Delete all',
			action: 'delete-all'
		},
		filter: task => task.workflowStep === 'done'
	})

	return ce('div', {
		className: 'dashboard',
		children: [
			todoBoard,
			inProgressBoard,
			doneBoard
		]
	})
}