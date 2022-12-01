import { store } from '../store'
import { moveTaskToBoardAction } from '../store/actions'

const movingItemId = 'MOVING_ITEM_ID'

export const initDnd = (zoneData = 'dndzone', itemData = 'dnditem') => {
	const zones = document.querySelectorAll(`[data-${zoneData}]`)
	zones.forEach(zone => {
		zone.addEventListener('dragover', e => {
			e.preventDefault()
		})
		zone.addEventListener('drop', e => {
			const itemId = e.dataTransfer.getData(movingItemId)
			const boardId = e.target.closest('.board').id
			store.dispatch(moveTaskToBoardAction(itemId, boardId))
		})
	})

	store.subscribe(() => {
		const items = document.querySelectorAll(`[data-${itemData}]`)
		items.forEach(item => {
			item.setAttribute('draggable', true)
			item.addEventListener('dragstart', e => {
				e.dataTransfer.setData(movingItemId, e.target.id)
			})
		})
	})
}