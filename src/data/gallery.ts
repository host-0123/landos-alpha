export interface GalleryItem {
  caption: string
  category: string
  image: string
}

// Drop real photos into /public/images/inspiration/ with these file names —
// they will appear on the site automatically. Missing files fall back to
// styled placeholders.
export const galleryItems: GalleryItem[] = [
  { caption: 'Льон і свобода', category: 'Жіночі образи', image: '/images/inspiration/look-01.jpg' },
  { caption: 'Етнофутуризм', category: 'Жіночі образи', image: '/images/inspiration/look-02.jpg' },
  { caption: 'Діти Сонця', category: 'Чоловічі образи', image: '/images/inspiration/look-03.jpg' },
  { caption: 'Амулети і ґердани', category: 'Аксесуари', image: '/images/inspiration/look-04.jpg' },
  { caption: 'Вогонь і ніч', category: 'Вайб', image: '/images/inspiration/look-05.jpg' },
  { caption: 'Кімоно', category: 'Чоловічі образи', image: '/images/inspiration/look-06.jpg' },
  { caption: 'Дикий образ', category: 'Жіночі образи', image: '/images/inspiration/look-07.jpg' },
  { caption: 'Природні тканини', category: 'Матеріали', image: '/images/inspiration/look-08.jpg' },
  { caption: 'Головний убір', category: 'Головні убори', image: '/images/inspiration/look-09.jpg' },
  { caption: 'Карпатський вайб', category: 'Вайб', image: '/images/inspiration/look-10.jpg' },
  { caption: 'Пара / група', category: 'Пара · група', image: '/images/inspiration/look-11.jpg' },
  { caption: 'Cosmic Ethno', category: 'Етнофутуризм', image: '/images/inspiration/look-12.jpg' },
]
