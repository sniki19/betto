const url = endpoint => {
	return `https://6377c5ab0992902a2510d2b5.mockapi.io/sniki/${endpoint}`
}

function fetchData(request) {
	return fetch(request)
		.then(response => {
			const result = response.json()
			console.log(request, result)
			return result
		})
		.then(data => {
			console.log('tasks >> ', data)
			return data
		})
}

function getAll() {
	return fetchData(url('tasks'))
}

function getById(id) {
	return fetchData(url(`tasks/${id}`))
}

function create(task) {
	const request = (url('tasks'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(task)
	})
	return fetchData(request)
}

function update(task) {
	const request = (url('tasks'), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(task)
	})
	return fetchData(request)
}

export const taskService = () => {
	return {
		getAll,
		getById,
		create,
		update
	}
}