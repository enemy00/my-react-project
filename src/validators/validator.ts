export type FieldValidatorType = (text: string) => string | undefined

export const requireField: FieldValidatorType = (text) => {
    if (!text) return "Required field"
    return undefined
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (text) => {
    if (text.length > maxLength) return `Max length is ${maxLength}`
    return undefined
}
export const requiredCredentials: FieldValidatorType = (text) => {
    if (!text) return "Required credentials are 'enemy00\' and remember me toggle is enabled"
    return undefined
}

