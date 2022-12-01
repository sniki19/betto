const url = endpoint => {
	return `https://6377c5ab0992902a2510d2b5.mockapi.io/sniki/${endpoint}`
}

const fetchData = request => fetch(request)
	.then(response => response.json())

const getAll = () => {
	return fetchData(url('tasks'))
}

const getById = id => {
	return fetchData(url(`tasks/${id}`))
}

const create = task => {
	const request = (url('tasks'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(task)
	})
	return fetchData(request)
}

const update = task => {
	const request = (url('tasks'), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(task)
	})
	return fetchData(request)
}

export default {
	getAll,
	getById,
	create,
	update
}