import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import {
  isErrorWithMessage,
  isJsonApiErrorDocument,
  type JsonApiErrorDocument,
  parseJsonApiErrors,
} from './isErrorWithMessage'
import { toast } from 'react-toastify'

export const queryErrorHandlerForRHFFactory = <T extends FieldValues>({
  setError,
}: {
  setError?: UseFormSetError<T>
}) => {
  return (err: JsonApiErrorDocument) => {
    // 400 от сервера в JSON:API формате
    if (isJsonApiErrorDocument(err)) {
      const { fieldErrors, globalErrors } = parseJsonApiErrors(err)
      // полевые ошибки
      for (const [field, message] of Object.entries(fieldErrors)) {
        setError?.(`data.attributes.${field}` as Path<T>, { type: 'server', message })
      }

      // «глобальные» (без pointer)
      if (globalErrors.length > 0) {
        setError?.('root.server', {
          type: 'server',
          message: globalErrors.join('\n'),
        })
      }
    }
  }
}

export const mutationGlobalErrorHandler = (error: Error, _: unknown, __: unknown, mutation: unknown) => {
  // @ts-expect-error look at MutationMeta type
  if (mutation.meta.globalErrorHandler === 'off') {
    return
  }

  console.error(isJsonApiErrorDocument(error))
  if (isJsonApiErrorDocument(error)) {
    const { globalErrors } = parseJsonApiErrors(error)

    // «глобальные» (без pointer)
    if (globalErrors.length > 0) {
      toast(globalErrors.join('\n'))
    }
  }
}

export const queryErrorHandler = (error: unknown) => {
  if (isJsonApiErrorDocument(error)) {
    const { fieldErrors, globalErrors } = parseJsonApiErrors(error)
    const messages = [...globalErrors, ...Object.values(fieldErrors)].filter((message) => message.trim())

    if (messages.length > 0) {
      toast.error(messages.join('\n'))
      return
    }
  }

  if (typeof error === 'string' && error.trim()) {
    toast.error(error)
    return
  }

  if (isErrorWithMessage(error, 'message') && error.message.trim()) {
    toast.error(error.message)
    return
  }

  if (typeof error === 'object' && error !== null && 'statusCode' in error) {
    const { statusCode } = error
    if (typeof statusCode === 'number' || typeof statusCode === 'string') {
      toast.error(`Request failed (HTTP ${statusCode}).`)
      return
    }
  }

  toast.error('An unexpected error occurred.')
}
