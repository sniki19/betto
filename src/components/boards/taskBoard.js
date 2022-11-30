import { deleteAllCompletedTasksAction, deleteTaskAction, moveTaskToNextBoardAction, openModalAction } from '../../utils/actions'
import { dispatch as dataDispatch, store } from '../../utils/dataService'
import { dispatch as modalDispatch } from '../../utils/modalManager'
import { createTaskModalContent as createTaskModal } from '../createTaskModal'
import { cb, ce } from '../shared'
import { createTask } from '../task'

const createBoardHeader = (name) => {
	const title = ce('div', {
		innerHTML: `${name.toUpperCase()}:`
	})
	const counter = ce('div', {
		innerHTML: '0'
	})

	const header = ce('header', {
		className: 'board-header',
		children: [
			title, counter
		]
	})

	function updateCounter(value) {
		counter.innerHTML = value
	}

	return {
		element: header,
		updateCounter
	}
}

const createBoardMain = () => {
	const main = ce('main', {
		className: 'board-main'
	})

	function clean() {
		main.innerHTML = null
	}

	function addItem(taskItem) {
		main.append(taskItem)
	}

	return {
		element: main,
		clean,
		addItem
	}
}

const createBoardFooter = (props) => {
	const { name, action } = props

	const button = cb({
		value: name,
		'data-action': action
	})

	const footer = ce('footer', {
		className: 'board-footer',
		children: [
			button
		]
	})

	return {
		element: footer
	}
}

export const createTaskBoard = (props) => {
	const { id, name, btnOptions = null, filter } = props

	const board = ce('section', {
		id,
		className: 'board'
	})

	const header = createBoardHeader(name)
	const main = createBoardMain()

	board.append(header.element, main.element)

	if (btnOptions) {
		const footer = createBoardFooter(btnOptions)
		board.append(footer.element)
	}

	board.addEventListener('click', e => {
		const target = e.target
		const taskItem = target.closest('.task')
		const id = taskItem?.id

		switch (target.dataset.action) {
			case 'add':
				const createModal = createTaskModal()
				modalDispatch(openModalAction(createModal))
				break
			case 'move':
				dataDispatch(moveTaskToNextBoardAction(id))
				break
			case 'edit':
				const editModal = createTaskModal(id)
				modalDispatch(openModalAction(editModal))
				break
			case 'delete':
				dataDispatch(deleteTaskAction(id))
				break
			case 'delete-all':
				dataDispatch(deleteAllCompletedTasksAction())
				break
		}
	})

	store.subscribe(data => {
		if (!data.tasks) {
			return
		}

		const tasks = data.tasks.filter(filter) || []

		main.clean()
		tasks.forEach(task => {
			const taskItem = createTask(task)
			main.addItem(taskItem)
		})

		header.updateCounter(tasks.length)
	})

	return board
}