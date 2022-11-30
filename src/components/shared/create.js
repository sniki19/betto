export const createElement = (tagName, props = {}) => {
	const element = document.createElement(tagName)

	// const customProperties = [
	// 	'innerHTML',
	// 	'className',
	// 	'class',
	// 	'classList',
	// 	'checked',
	// 	'readOnly'
	// ]
	const customProperties = [
		'children'
	]
	for (const prop in props) {
		if (!props[prop]) {
			continue
		}

		if (customProperties.includes(prop)) {
			switch (prop) {
				case 'children':
					element.append(...props[prop])
					break;
				default:
					break;
			}
		} else if (prop.startsWith('data-')) {
			const dataProp = prop.split('-')[1]
			element.dataset[dataProp] = props[prop]
		} else {
			element[prop] = props[prop]
		}

		// if (!customProperties.includes(prop)) {
		// 	element.setAttribute(prop, options[prop])
		// } else {
		// 	switch(prop) {
		// 		case 'innerHTML':
		// 		case 'checked':
		// 		case 'classList':
		// 		case 'className':
		// 		case 'readOnly':
		// 			element[prop] = options[prop]
		// 			break
		// 		default:
		// 			break
		// 	}
		// }
	}
	return element
}

export const createFragment = (children = null) => {
	const element = document.createDocumentFragment()

	if (children) {
		element.append(...children)
	}

	return element
}

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

export const createTextArea = (options = {}, onChange) => {
	const element = createElement('textarea', {
		...options
	})

	if (onChange && typeof onChange === 'function') {
		element.addEventListener('keyup', onChange)
	}

	return element
}

export const createSelectBox = (options = {}, onChange) => {
	const element = createElement('select', {
		...options
	})

	if (onChange && typeof onChange === 'function') {
		element.addEventListener('change', onChange)
	}

	return element
}