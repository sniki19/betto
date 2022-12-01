const workflowSteps = [
	'todo',
	'inProgress',
	'done'
]

export const getNextWorkflowStep = currentStep => {
	const currentIndex = workflowSteps.indexOf(currentStep)
	return workflowSteps[currentIndex + 1]
}

export const nextWorkflowStepExists = currentStep => {
	const nextStep = getNextWorkflowStep(currentStep)
	return !!nextStep
}