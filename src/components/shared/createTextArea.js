import { createElement } from './createElement'

export const createTextArea = (options = {}, onChange) => {
	const element = createElement('textarea', {
		...options
	})

	if (onChange && typeof onChange === 'function') {
		element.addEventListener('keyup', onChange)
	}

	return element
}