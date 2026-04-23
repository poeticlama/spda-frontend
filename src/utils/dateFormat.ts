const ruDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

const ruDateTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
})

function toDate(value: string | null | undefined) {
  if (!value) return null

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function formatDateRu(value: string | null | undefined) {
  const date = toDate(value)
  return date ? ruDateFormatter.format(date) : "-"
}

export function formatDateTimeRu(value: string | null | undefined) {
  const date = toDate(value)
  return date ? ruDateTimeFormatter.format(date) : "-"
}

