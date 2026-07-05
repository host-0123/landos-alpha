export interface Person {
  name: string
  role: string
  description: string
  image: string
  instagram: string
}

// Drop photos into /public/images/hosts/ with these file names.
// Missing files fall back to styled placeholders.
export const people: Person[] = [
  {
    name: 'Ведучий 1',
    role: 'Ведучий',
    description: 'Голос вечора. Тримає ритм події — від велкам-зустрічі до вогняних ритуалів.',
    image: '/images/hosts/host-1.jpg',
    instagram: 'instagram',
  },
  {
    name: 'Ведуча 2',
    role: 'Ведуча',
    description: 'Енергія і легкість. Зʼєднує людей, історії та моменти в одну атмосферу.',
    image: '/images/hosts/host-2.jpg',
    instagram: 'instagram',
  },
  {
    name: 'DJ',
    role: 'Музика ночі',
    description: 'Саундтрек Сонцестояння: від етнічних мотивів до космічних сетів під відкритим небом.',
    image: '/images/hosts/dj.jpg',
    instagram: 'instagram',
  },
]
