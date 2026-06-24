import { ImageSourcePropType } from 'react-native';

export type Dish = {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  detailDescription: string;
  ingredients: string[];
};

export const dishes: Dish[] = [
  {
    id: '1',
    image: require('@/assets/images/MainPage/pizza.png'),
    title: 'Special Pizza',
    description: 'With tommato sauce',
    price: '$12.50',
    rating: 4.3,
    reviews: 960,
    detailDescription: 'Meat Lovers is filled with toppings of sliced beef sausage, minced beef, beef burger, and chicken sausage. In one bite, you can taste a variety of processed meats that are many and dense. Especially the minced meat which still has fiber in it.',
    ingredients: ['Pepperoni', 'Oregano', 'Mozzarella', 'Tomato Sauce', 'Olive Oil', 'Basil'],
  },
  {
    id: '2',
    image: require('@/assets/images/MainPage/dimsum.png'),
    title: 'Special Dimsum',
    description: 'With meat filling',
    price: '$8.95',
    rating: 4.3,
    reviews: 960,
    detailDescription: 'Handcrafted steamed dumplings filled with seasoned pork and shrimp. Served with a savory soy-ginger dipping sauce that enhances every bite.',
    ingredients: ['Pork', 'Shrimp', 'Ginger', 'Soy Sauce', 'Sesame Oil', 'Spring Onion'],
  },
];

export function getDishById(id: string): Dish | undefined {
  return dishes.find((d) => d.id === id);
}
