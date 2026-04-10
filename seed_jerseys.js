import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Manually parse .env 
const env = fs.readFileSync('.env', 'utf8')
  .split('\n')
  .reduce((acc, line) => {
    const [key, ...value] = line.split('=');
    if (key && value) acc[key.trim()] = value.join('=').trim();
    return acc;
  }, {});

const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const jerseys = [
  {
    name: 'Argentina 24/25 Home Jersey',
    brand: 'Adidas',
    price: 4999,
    original_price: 5999,
    description: 'The official Argentina home jersey with MESSI 10 on the back. Premium B&W edition.',
    category: 'Jerseys',
    stock: 50,
    rating: 5.0,
    reviews: 120,
    hot: true,
    image: '/messi_jersey_bw.png'
  },
  {
    name: 'Al-Nassr 24/25 Away Jersey',
    brand: 'Nike',
    price: 4499,
    original_price: 4999,
    description: 'Limited professional edition B&W jersey with RONALDO 7. Breathable performance fabric.',
    category: 'Jerseys',
    stock: 30,
    rating: 4.9,
    reviews: 85,
    hot: true,
    image: '/ronaldo_jersey_bw.png'
  },
  {
    name: 'Real Madrid 24/25 Home Jersey',
    brand: 'Adidas',
    price: 5299,
    original_price: 6499,
    description: 'The new era begins. MBAPPE 10 home jersey in cinematic high-contrast B&W.',
    category: 'Jerseys',
    stock: 45,
    rating: 4.8,
    reviews: 210,
    hot: true,
    image: '/mbappe_jersey_bw.png'
  },
  {
    name: 'Zico Elite Training Kit',
    brand: 'Puma',
    price: 2499,
    original_price: 2999,
    description: 'Professional grade training jersey for high-intensity performance. Minimalist B&W design.',
    category: 'Jerseys',
    stock: 100,
    rating: 4.7,
    reviews: 45,
    hot: false,
    image: '/training_jersey_bw.png'
  }
];

async function seed() {
  console.log('Seeding dummy jerseys...');
  const { data, error } = await supabase
    .from('products')
    .insert(jerseys);

  if (error) {
    console.error('Error seeding jerseys:', error.message);
  } else {
    console.log('Successfully seeded 4 jerseys!');
  }
}

seed();
