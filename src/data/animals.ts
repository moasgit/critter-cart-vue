import { Animal } from '@/types/animal';

export const animals: Animal[] = [
  {
    id: '1',
    slug: 'golden-retriever',
    name: 'Golden Retriever',
    category: 'Hund',
    shortDescription: 'Vänlig och lojal familjehund med gyllene päls',
    longDescription: 'Golden Retriever är en av världens mest älskade hundraser. De är kända för sin vänliga natur, intelligens och lojalitet. Perfekta som familjehundar och utmärkta med barn.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&h=600&fit=crop'
    ],
    prices: {
      small: 15000,
      medium: 18000,
      large: 22000
    },
    stock: {
      small: 3,
      medium: 5,
      large: 2
    },
    tags: ['Familjehund', 'Vänlig', 'Intelligent'],
    seoTitle: 'Golden Retriever - Köp vänlig familjehund | Djurshoppen',
    seoDescription: 'Golden Retriever valpar till salu. Vänliga och lojala familjehundar. Olika storlekar tillgängliga. Fri frakt över 500kr.'
  },
  {
    id: '2',
    slug: 'ragdoll-katt',
    name: 'Ragdoll Katt',
    category: 'Katt',
    shortDescription: 'Lugn och mjuk katt med blå ögon',
    longDescription: 'Ragdoll katten är känd för sin lugna temperament och mjuka päls. De kallas "ragdoll" för att de ofta blir helt avslappnade när de lyfts upp.',
    imageUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=800&h=600&fit=crop'
    ],
    prices: {
      small: 8000,
      medium: 10000,
      large: 12000
    },
    stock: {
      small: 2,
      medium: 4,
      large: 1
    },
    tags: ['Lugn', 'Mjuk', 'Familjevänlig'],
    seoTitle: 'Ragdoll Katt - Köp lugn och mjuk katt | Djurshoppen',
    seoDescription: 'Ragdoll kattungar till salu. Lugna och mjuka katter med vackra blå ögon. Perfekta som sällskapsdjur.'
  },
  {
    id: '3',
    slug: 'dwarf-hamster',
    name: 'Dvärg Hamster',
    category: 'Smådjur',
    shortDescription: 'Liten och lekfull hamster, perfekt för barn',
    longDescription: 'Dvärg hamstrar är små, aktiva och underhållande husdjur. De är perfekta för barn och kräver minimal skötsel.',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=600&fit=crop'
    ],
    prices: {
      small: 200,
      medium: 250,
      large: 300
    },
    stock: {
      small: 10,
      medium: 8,
      large: 5
    },
    tags: ['Liten', 'Lekfull', 'Barnvänlig'],
    seoTitle: 'Dvärg Hamster - Köp liten husdjur för barn | Djurshoppen',
    seoDescription: 'Dvärg hamstrar till salu. Små, lekfulla och perfekta som första husdjur för barn. Enkla att sköta.'
  },
  {
    id: '4',
    slug: 'labrador',
    name: 'Labrador',
    category: 'Hund',
    shortDescription: 'Energisk och trogen hundrass',
    longDescription: 'Labrador är en av de mest populära hundraserna. De är energiska, trogna och utmärkta som både familjehundar och arbetshundar.',
    imageUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop'
    ],
    prices: {
      small: 14000,
      medium: 17000,
      large: 21000
    },
    stock: {
      small: 4,
      medium: 3,
      large: 2
    },
    tags: ['Energisk', 'Trogen', 'Arbetshund'],
    seoTitle: 'Labrador - Köp energisk familjehund | Djurshoppen',
    seoDescription: 'Labrador valpar till salu. Energiska och trogna hundar, perfekta som familjehundar och arbetshundar.'
  },
  {
    id: '5',
    slug: 'maine-coon',
    name: 'Maine Coon',
    category: 'Katt',
    shortDescription: 'Stor och majestätisk katt med vänlig personlighet',
    longDescription: 'Maine Coon är en av de största huskattraserna. Trots sin storlek är de kända för sin vänliga och lekfulla personlighet.',
    imageUrl: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&h=600&fit=crop'
    ],
    prices: {
      small: 9000,
      medium: 12000,
      large: 15000
    },
    stock: {
      small: 1,
      medium: 3,
      large: 2
    },
    tags: ['Stor', 'Majestätisk', 'Vänlig'],
    seoTitle: 'Maine Coon - Köp stor och majestätisk katt | Djurshoppen',
    seoDescription: 'Maine Coon kattungar till salu. Stora, majestätiska katter med vänlig personlighet. Perfekta som familjemedlemmar.'
  },
  {
    id: '6',
    slug: 'kanin',
    name: 'Dvärg Kanin',
    category: 'Smådjur',
    shortDescription: 'Söt och mjuk kanin, perfekt sällskapsdjur',
    longDescription: 'Dvärg kaniner är söta, mjuka och gör utmärkta sällskapsdjur. De är sociala djur som trivs bäst i par.',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop'
    ],
    prices: {
      small: 800,
      medium: 1000,
      large: 1200
    },
    stock: {
      small: 6,
      medium: 4,
      large: 3
    },
    tags: ['Söt', 'Mjuk', 'Social'],
    seoTitle: 'Dvärg Kanin - Köp söt sällskapskanin | Djurshoppen',
    seoDescription: 'Dvärg kaniner till salu. Söta, mjuka sällskapsdjur som trivs i familjen. Sociala djur som älskar sällskap.'
  }
];