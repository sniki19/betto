const workflowSteps = [
	'todo',
	'inProgress',
	'done'
]

export const getNextWorkflowStep = (currentStep) => {
	const currentIndex = workflowSteps.indexOf(currentStep)
	return workflowSteps[currentIndex + 1]
}