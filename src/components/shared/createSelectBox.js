import { createElement } from './createElement'

export const createSelectBox = (options = {}, onChange) => {
	const element = createElement('select', {
		...options
	})

	if (onChange && typeof onChange === 'function') {
		element.addEventListener('change', onChange)
	}

	return element
}