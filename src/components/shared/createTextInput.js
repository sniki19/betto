import { createElement } from './createElement'

export const createTextInput = (options = {}, onChange) => {
	const element = createElement('input', {
		type: 'text',
		...options
	})

	if (onChange && typeof onChange === 'function') {
		element.addEventListener('keyup', onChange)
	}

	return element
}