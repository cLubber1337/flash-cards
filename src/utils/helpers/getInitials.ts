export function getInitials(name?: string) {
  const names = name?.split(' ')

  const initials = names?.map(n => n[0].toUpperCase())

  return initials?.join('')
}
