import { store } from '../services/dataService'
import { boardIdList } from '../utils/constants'
import { createTaskBoard } from './board'

const { board, load } = createTaskBoard({
	id: boardIdList.todo,
	name: 'Todo',
	btnOptions: {
		name: 'Add Task',
		action: 'add'
	}
})

store.subscribe(({tasks}) => {
	if (!tasks) {
		return
	}

	const todoTasks = tasks.filter(
		task => task.workflowStateId !== 'inProgress' && task.workflowStateId !== 'done'
	)
	load(todoTasks)
})

export {
	board as todoBoard
}