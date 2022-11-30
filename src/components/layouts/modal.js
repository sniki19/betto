import { ce } from '../shared'

export const createModalLayout = () => {
	const content = ce('div', {
		className: 'modal-content'
	})

	const wrapper = ce('div', {
		className: 'modal-wrapper',
		children: [ content ]
	})

	function loadContent(modalContent) {
		content.append(modalContent)
	}

	function destroy() {
		wrapper.remove()
	}

	return {
		layout: wrapper,
		loadContent,
		destroy
	}
}