export const createElement = (tagName, props = {}) => {
	const element = document.createElement(tagName)

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
	}
	return element
}







