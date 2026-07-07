export interface Person {
  name: string
  role: string
  description: string
  image: string
  instagram: string
}

// Drop portrait photos into /public/images/hosts/ with these file names.
// Missing files fall back to styled placeholders.
export const people: Person[] = [
  {
    name: 'Андрій ВОС',
    role: 'Ведучий',
    description: 'Голос вечора. Тримає ритм події — від велкам-зустрічі до вогняних ритуалів.',
    image: '/images/hosts/andriy-vos.webp',
    instagram: 'andervos',
  },
  {
    name: 'Коля Капішон',
    role: 'Ведучий',
    description: 'Енергія і легкість. Зʼєднує людей, історії та моменти в одну атмосферу.',
    image: '/images/hosts/kolya-kapishon.webp',
    instagram: 'kolya.kapiwon',
  },
]
