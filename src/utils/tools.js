export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

export const isObject = obj => obj != null && obj.constructor.name === 'Object'

export const isFunction = fn => fn && typeof fn === 'function'