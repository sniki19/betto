const url = endpoint => {
	return `https://6377c5ab0992902a2510d2b5.mockapi.io/sniki/${endpoint}`
}

const fetchData = request => fetch(request)
	.then(response => response.json())
	.catch(console.warn)

const getAll = () => {
	return fetchData(url('tasks'))
}

const getById = id => {
	return fetchData(url(`tasks/${id}`))
}

const create = task => {
	const request = new Request(url('tasks'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(task)
	})
	return fetchData(request)
}

const update = task => {
	const request = new Request(url(`tasks/${task.id}`), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(task)
	})
	return fetchData(request)
}

const remove = id => {
	const request = new Request(url(`tasks/${id}`), {
		method: 'DELETE'
	})
	return fetchData(request)
}

export default {
	getAll,
	getById,
	create,
	update,
	remove
}