import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Star, MessageCircle } from 'lucide-react-native';
import { fetchMealById, type Meal } from '../../services/mealApi';
import { NavBar } from '../../components/NavBar';

const fakeNavBarProps = {
  state: {
    routes: [
      { key: 'index-key', name: 'index', params: undefined },
      { key: 'search-key', name: 'search', params: undefined },
      { key: 'favorites-key', name: 'favorites', params: undefined },
      { key: 'profile-key', name: 'profile', params: undefined },
    ],
    index: 0,
  },
  descriptors: {
    'index-key': { options: {} },
    'search-key': { options: {} },
    'favorites-key': { options: {} },
    'profile-key': { options: {} },
  },
  navigation: {
    emit: () => ({ defaultPrevented: false }),
    navigate: (name: string) => {
      if (name === 'index') router.push('/(tabs)' as any);
      else router.push(`/(tabs)/${name}` as any);
    },
  },
};

export default function FoodDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchMealById(id)
      .then((data) => {
        setMeal(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <ActivityIndicator size="large" color="#EC994B" />
      </SafeAreaView>
    );
  }

  if (!meal) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <Text style={{ color: '#888888', fontSize: 16 }}>Plat introuvable.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingTop: 16,
              marginBottom: 24,
            }}
          >
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ padding: 4 }}>
              <ChevronLeft color="#333333" size={26} strokeWidth={2} />
            </TouchableOpacity>
            <Text
              style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#333333' }}
            >
              Food Detail
            </Text>
            <TouchableOpacity style={{ padding: 4 }} activeOpacity={0.7}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333333', letterSpacing: 2 }}>···</Text>
            </TouchableOpacity>
          </View>

          {/* Hero image */}
          <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <Image
              source={{ uri: meal.image }}
              style={{ width: '100%', height: 240, borderRadius: 24 }}
              resizeMode="cover"
            />
          </View>

          {/* Titre + quantité */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              marginBottom: 8,
            }}
          >
            <Text
              style={{ flex: 1, fontSize: 22, fontWeight: '800', color: '#333333', marginRight: 16 }}
              numberOfLines={1}
            >
              {meal.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#EC994B',
                borderRadius: 50,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <TouchableOpacity onPress={decrement} activeOpacity={0.7} style={{ paddingHorizontal: 4 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginHorizontal: 12,
                  minWidth: 16,
                  textAlign: 'center',
                }}
              >
                {quantity}
              </Text>
              <TouchableOpacity onPress={increment} activeOpacity={0.7} style={{ paddingHorizontal: 4 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sous-titre */}
          <Text style={{ paddingHorizontal: 24, color: '#888888', fontSize: 14, marginBottom: 20 }}>
            {meal.description}
          </Text>

          {/* Ratings */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 24,
              marginBottom: 24,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Star color="#EC994B" size={16} fill="#EC994B" />
              <Text style={{ color: '#333333', fontSize: 14, fontWeight: '600', marginLeft: 6 }}>
                {meal.rating} Ratings
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MessageCircle color="#888888" size={16} />
              <Text style={{ color: '#888888', fontSize: 14, marginLeft: 6 }}>
                {meal.reviews} Reviews
              </Text>
            </View>
          </View>

          {/* Detail & Ingredient */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333333', marginBottom: 12 }}>
              Detail & Ingredient
            </Text>
            <Text style={{ fontSize: 14, color: '#888888', lineHeight: 22, marginBottom: 20 }}>
              {meal.detailDescription}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {meal.ingredients.map((item, i) => (
                <Text key={i} style={{ width: '50%', fontSize: 14, color: '#333333', marginBottom: 8 }}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>

        </ScrollView>

        <NavBar {...fakeNavBarProps} />
      </View>
    </SafeAreaView>
  );
}
