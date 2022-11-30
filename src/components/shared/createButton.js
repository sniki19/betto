import { createElement } from './createElement'

export const createButton = (options = {}, onClick) => {
	const element = createElement('input', {
		type: 'button',
		...options
	})

	if (onClick && typeof onClick === 'function') {
		element.addEventListener('click', onClick)
	}

	return element
}