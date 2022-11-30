import { createElement as ce } from './shared/create'
import { todoBoard } from './todoBoard'
import { inProgressBoard } from './inProgressBoard'
import { doneBoard } from './doneBoard'

export const main = () => {
	const todoBoardElement = todoBoard
	const inProgressBoardElement = inProgressBoard
	const doneBoardElement = doneBoard

	return ce('div', {
		className: 'dashboard',
		children: [
			todoBoardElement,
			inProgressBoardElement,
			doneBoardElement
		]
	})
}