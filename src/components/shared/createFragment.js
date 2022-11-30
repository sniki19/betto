export const createFragment = (children = null) => {
	const element = document.createDocumentFragment()

	if (children) {
		element.append(...children)
	}

	return element
}