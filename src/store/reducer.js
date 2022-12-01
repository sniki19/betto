import { actionType } from '../utils/constants'
import { getNextWorkflowStep, getWorkflowStep } from '../utils/workflow'

export const reducer = (state, action) => {
	switch (action.type) {
		case actionType.loadTasks:
			return {
				...state,
				tasks: action.payload
			}
		case actionType.addTaskOnBoard:
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
		case actionType.moveTaskToNextBoard: {
			const taskId = action.payload
			const otherTasks = state.tasks.filter(task => task.id !== taskId)
			const targetTask = state.tasks.find(task => task.id === taskId)
			const nextStep = getNextWorkflowStep(targetTask.workflowStep)
			if (nextStep) {
				targetTask.workflowStep = nextStep
			}

			return state = {
				...state,
				tasks: [...otherTasks, targetTask]
			}
		}
		case actionType.moveTaskToBoard: {
			const { id: taskId, boardId } = action.payload

			const otherTasks = state.tasks.filter(task => task.id !== taskId)
			const targetTask = state.tasks.find(task => task.id === taskId)
			targetTask.workflowStep = getWorkflowStep(boardId)

			return state = {
				...state,
				tasks: [...otherTasks, targetTask]
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
				tasks: state.tasks.filter(task => task.workflowStep !== 'done')
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