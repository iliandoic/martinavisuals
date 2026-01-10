export interface Photo {
  src: string
  width: number
  height: number
  alt: string
  title?: string
  category?: string
}

// Sample photos using placeholder images
// Replace these with your actual photos in /public/photos/
export const photos: Photo[] = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    width: 1200,
    height: 800,
    alt: 'Mountain landscape at sunset',
    title: 'Alpine Sunset',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    width: 1200,
    height: 800,
    alt: 'Forest path in autumn',
    title: 'Autumn Trail',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200',
    width: 1200,
    height: 1600,
    alt: 'Waterfall in tropical forest',
    title: 'Hidden Falls',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1518173946687-a4c036bc0dd0?w=1200',
    width: 1200,
    height: 800,
    alt: 'City skyline at night',
    title: 'Urban Nights',
    category: 'urban',
  },
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
    width: 1200,
    height: 800,
    alt: 'Starry mountain night',
    title: 'Stargazer',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
    width: 1200,
    height: 750,
    alt: 'Foggy mountain valley',
    title: 'Morning Mist',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200',
    width: 1200,
    height: 800,
    alt: 'Sunlight through forest',
    title: 'Forest Light',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200',
    width: 1200,
    height: 800,
    alt: 'Lake reflection at dawn',
    title: 'Mirror Lake',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200',
    width: 1200,
    height: 800,
    alt: 'Rolling green hills',
    title: 'Emerald Fields',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
    width: 1200,
    height: 1600,
    alt: 'Dramatic mountain peak',
    title: 'The Summit',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200',
    width: 1200,
    height: 800,
    alt: 'Coastal sunset',
    title: 'Golden Hour',
    category: 'landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
    width: 1200,
    height: 1500,
    alt: 'Portrait in natural light',
    title: 'Natural Light',
    category: 'portrait',
  },
]

export const featuredPhotos = photos.slice(0, 6)
