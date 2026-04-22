import axios from "axios"

type ValidationItem = {
  msg?: string
}

type ErrorPayload = {
  detail?: string | ValidationItem[]
  message?: string
  error?: string
}

export function parseApiError(error: unknown, fallback = "Произошла ошибка. Попробуйте еще раз.") {
  if (axios.isAxiosError<ErrorPayload>(error)) {
    const payload = error.response?.data

    if (Array.isArray(payload?.detail)) {
      const combined = payload.detail
        .map((item) => item.msg?.trim())
        .filter((msg): msg is string => Boolean(msg))
        .join("; ")

      if (combined) {
        return combined
      }
    }

    if (typeof payload?.detail === "string" && payload.detail.trim()) {
      return payload.detail
    }

    if (typeof payload?.message === "string" && payload.message.trim()) {
      return payload.message
    }

    if (typeof payload?.error === "string" && payload.error.trim()) {
      return payload.error
    }

    if (error.message.trim()) {
      return error.message
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}


