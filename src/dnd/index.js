import { fetchMoveTaskToStep } from '../services/asyncActions/tasks'
import { store } from '../store'
import { getBoardByWorkflowStep, getNextWorkflowStep, getWorkflowStepByBoardId } from '../utils/workflow'

const movingItemId = 'MOVING_ITEM_ID'

const dragOverHandler = e => {
	e.preventDefault()
}

const dropHandler = e => {
	const taskId = e.dataTransfer.getData(movingItemId)
	const boardId = e.target.closest('.board').id
	const step = getWorkflowStepByBoardId(boardId)

	store.dispatch(fetchMoveTaskToStep(taskId, step))
}

const addZoneEvents = zones => {
	zones.forEach(zone => {
		zone.dataset.dndzone = true

		zone.addEventListener('dragover', dragOverHandler)

		zone.addEventListener('drop', dropHandler)
	})
}

const removeZoneEvent = zones => {
	zones.forEach(zone => {
		delete zone.dataset.dndzone

		zone.removeEventListener('dragover', dragOverHandler)

		zone.removeEventListener('drop', dropHandler)
	})
}

const getAllowedZoneIds = taskId => {
	const task = store.getState().tasks.find(task => task.id === taskId)
	const nextWfStep = getNextWorkflowStep(task.workflowStep)

	const zoneIds = [
		getBoardByWorkflowStep(task.workflowStep),
		getBoardByWorkflowStep(nextWfStep)
	]

	return zoneIds
}

export const initDnd = () => {
	store.subscribe(() => {
		const taskItems = document.querySelectorAll(`[data-dnditem]`)
		taskItems.forEach(taskItem => {
			taskItem.setAttribute('draggable', true)

			const zoneIds = getAllowedZoneIds(taskItem.id)
			const zones = zoneIds.map(zoneId => document.getElementById(zoneId))

			taskItem.addEventListener('dragstart', e => {
				addZoneEvents(zones)

				e.dataTransfer.setData(movingItemId, e.target.id)
			})

			taskItem.addEventListener('dragend', e => {
				removeZoneEvent(zones)
			})
		})
	})
}