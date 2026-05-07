import type { MenuItem } from '../types';

export const mockMenu: MenuItem[] = [
  {
    id: 'chicken-main',
    name: 'Pollo Asado Crujiente',
    description: 'Marinado lentamente con nuestra mezcla secreta de hierbas y asado al calor de la leña de encina para una piel dorada y carne irresistible.',
    price: 18.50, // Base price for 1 Whole
    category: 'chicken',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAun_oQOa7OR4sOAqiKrdNJZlhQrJiY0sH2zoHZ0yeEPkA-GqE7ffu3_bWyhjGhT3OHn1MH2mFlxpDZBEGtPQdsl7lxFOvfOnxlNdUqheBxNXiwrIjxVx8X70pR8n4lbTiZi6B5mFArOmpK_jMQb8L7XQfHlUzTS5Av7_dIsPRU8lIBhSEleqZxh2s73f203llUrufV2b-uQWXcOmNajgCqZv4pPimjIFssrxedfRWOPO3HT1dbQq2N_3jg3-GpOU-z8gwyUUZKmFY',
    tags: ['Estrella de la Casa'],
    options: [
      { id: 'opt-whole', name: '1 Entero', priceModifier: 0, description: 'Para compartir' },
      { id: 'opt-half', name: '1/2 Pollo', priceModifier: -8.00, description: 'Duo ideal' }, // 10.50
      { id: 'opt-quarter', name: '1/4 Pollo', priceModifier: -11.70, description: 'Individual' }, // 6.80
    ]
  },
  {
    id: 'side-papas-asadas',
    name: 'Papas Asadas',
    description: 'Asadas al rescoldo con sal marina volcánica y un toque de romero de nuestra huerta.',
    price: 4.50,
    category: 'sides',
    imageUrl: '/assets/images/papas_asadas_rustic.png',
    tags: ['Corte Redondo', 'Romero Fresco']
  },
  {
    id: 'side-papas-fritas',
    name: 'Papas Fritas',
    description: 'Crujientes, doradas y servidas en su punto de sal. El acompañamiento más clásico.',
    price: 3.80,
    category: 'sides',
    imageUrl: '/assets/images/papas_fritas_premium.png',
    tags: ['Corte Palillo', 'AOVE']
  },
  {
    id: 'side-papas-rusticas',
    name: 'Papas Rústicas',
    description: 'Corte grueso con piel, sazonadas con pimentón de la Vera y crujientes por fuera.',
    price: 4.20,
    category: 'sides',
    imageUrl: '/assets/images/papas_rusticas.png',
    tags: ['Corte Grueso', 'Especiadas']
  },
  {
    id: 'sauce-allioli',
    name: 'Allioli Artesanal',
    description: 'Receta tradicional',
    price: 1.50,
    category: 'sauces'
  },
  {
    id: 'sauce-picante',
    name: 'Salsa Picante Alameda',
    description: 'Nivel medio',
    price: 1.20,
    category: 'sauces'
  },
  {
    id: 'drink-soda',
    name: 'Gaseosas y Refrescos',
    description: '330ml • Frío glacial',
    price: 2.50,
    category: 'drinks'
  },
  {
    id: 'drink-water',
    name: 'Agua Mineral',
    description: '500ml • Con/Sin gas',
    price: 1.80,
    category: 'drinks'
  }
];
