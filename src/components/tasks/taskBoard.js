import { createModal } from '../../modal/modalManager'
import { store } from '../../store'
import { deleteAllCompletedTasksAction, deleteTaskAction, moveTaskToNextBoardAction, openModalAction } from '../../store/actions'
import { cb, ce } from '../shared'
import { createTask } from './task'
import { createTaskModalContent } from './taskModal'

const createBoardHeader = (name) => {
	const title = ce('h3', {
		className: 'title',
		textContent: `${name.toUpperCase()}:`
	})
	const counter = ce('div', {
		className: 'counter',
		textContent: '0'
	})

	const header = ce('header', {
		className: 'board-header',
		children: [
			title, counter
		]
	})

	function updateCounter(value) {
		counter.textContent = value
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
		className: 'btn board-bottom-btn',
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
		className: 'board',
		'data-dndzone': true
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
				createModal(createTaskModalContent())
				store.dispatch(openModalAction())
				break
			case 'move':
				store.dispatch(moveTaskToNextBoardAction(id))
				break
			case 'edit':
				createModal(createTaskModalContent(id))
				store.dispatch(openModalAction())
				break
			case 'delete':
				store.dispatch(deleteTaskAction(id))
				break
			case 'delete-all':
				store.dispatch(deleteAllCompletedTasksAction())
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