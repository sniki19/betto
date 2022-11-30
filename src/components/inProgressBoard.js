import { store } from '../services/dataService'
import { boardIdList } from '../utils/constants'
import { createTaskBoard } from './board'

const { board, load } = createTaskBoard({
	id: boardIdList.inProgress,
	name: 'In Progress'
})

store.subscribe(({tasks}) => {
	if (!tasks) {
		return
	}

	const todoTasks = tasks.filter(
		task => task.workflowStateId === 'inProgress'
	)
	load(todoTasks)
})

export {
	board as inProgressBoard
}
