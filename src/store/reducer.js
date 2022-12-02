import { actionType } from '../utils/constants'
import { hasNextWorkflowStep } from '../utils/workflow'

export const reducer = (state, action) => {
	switch (action.type) {
		case actionType.loadTasks:
			return {
				...state,
				tasks: action.payload
			}
		case actionType.createTask:
			return state = {
				...state,
				tasks: [...state.tasks, action.payload]
			}
		case actionType.updateTask: {
			const updateTask = action.payload
			const otherTasks = state.tasks.filter(task => task.id !== updateTask.id)

			return {
				...state,
				tasks: [...otherTasks, updateTask]
			}
		}
		case actionType.deleteTask: {
			const taskId = action.payload
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== taskId)
			}
		}
		case actionType.deleteAllCompletedTasks:
			return {
				...state,
				tasks: state.tasks.filter(task => hasNextWorkflowStep(task.workflowStep))
			}

		case actionType.loadUsers:
			return {
				...state,
				users: action.payload
			}

		case actionType.openModal:
			return {
				...state,
				modal: {
					isOpen: true
				}
			}
		case actionType.closeModal:
			return {
				...state,
				modal: {
					isOpen: false
				}
			}
		default:
			return state
	}
}