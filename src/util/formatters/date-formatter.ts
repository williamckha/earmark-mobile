const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
})

export const formatDate = (date: Date) => {
  return dateFormat.format(date);
}