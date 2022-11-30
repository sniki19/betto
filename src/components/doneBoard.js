import { store } from '../services/dataService'
import { boardIdList } from '../utils/constants'
import { createTaskBoard } from './board'

const { board, load } = createTaskBoard({
	id: boardIdList.done,
	name: 'Done',
	btnOptions: {
		name: 'Delete all',
		action: 'delete-all'
	}
})

store.subscribe(({tasks}) => {
	if (!tasks) {
		return
	}

	const doneTasks = tasks.filter(
		task => task.workflowStateId === 'done'
	)
	load(doneTasks)
})

export {
	board as doneBoard
}