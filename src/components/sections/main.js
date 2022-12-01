import { boardIdList } from '../../utils/workflow'
import { ce } from '../shared'
import { createTaskBoard } from '../tasks/taskBoard'

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

	return ce('main', {
		className: 'main dashboard',
		children: [
			todoBoard,
			inProgressBoard,
			doneBoard
		]
	})
}