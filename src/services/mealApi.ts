const BASE = 'https://www.themealdb.com/api/json/v1/1';

export type Meal = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  detailDescription: string;
  ingredients: string[];
};

type ApiSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

function pseudoPrice(id: string): string {
  const n = parseInt(id.slice(-2), 10);
  return `$${(6 + (n % 14) + 0.99).toFixed(2)}`;
}

function extractIngredients(meal: Record<string, string | null>): string[] {
  const result: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    if (ing && ing.trim()) result.push(ing.trim());
  }
  return result;
}

function transformSummary(m: ApiSummary, category: string): Meal {
  return {
    id: m.idMeal,
    image: m.strMealThumb,
    title: m.strMeal,
    description: category,
    price: pseudoPrice(m.idMeal),
    rating: 4.3,
    reviews: 960,
    detailDescription: '',
    ingredients: [],
  };
}

function transformFull(m: Record<string, string | null>): Meal {
  const instructions = m.strInstructions ?? '';
  const description = [m.strCategory, m.strArea].filter(Boolean).join(' · ') || 'Meal';
  return {
    id: m.idMeal ?? '',
    image: m.strMealThumb ?? '',
    title: m.strMeal ?? '',
    description,
    price: pseudoPrice(m.idMeal ?? '0'),
    rating: 4.3,
    reviews: 960,
    detailDescription:
      instructions.length > 300 ? instructions.slice(0, 300).trimEnd() + '...' : instructions,
    ingredients: extractIngredients(m),
  };
}

export async function fetchMealsByCategory(category: string): Promise<Meal[]> {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await res.json();
  const meals: ApiSummary[] = data.meals ?? [];
  return meals.map((m) => transformSummary(m, category));
}

export async function fetchMealById(id: string): Promise<Meal | null> {
  const res = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
  const data = await res.json();
  const meal = data.meals?.[0] ?? null;
  return meal ? transformFull(meal) : null;
}

export async function fetchRandomMeal(): Promise<Meal | null> {
  const res = await fetch(`${BASE}/random.php`);
  const data = await res.json();
  const meal = data.meals?.[0] ?? null;
  return meal ? transformFull(meal) : null;
}
