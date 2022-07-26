export function isFieldEmpty(field: string | number | null) {
  return `${field}`.trim() == "";
}
