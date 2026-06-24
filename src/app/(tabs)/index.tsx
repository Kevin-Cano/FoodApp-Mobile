import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Bell, AlignRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { SuggestionCard } from '../../components/SuggestionCard';
import { DishCard } from '../../components/DishCard';
import { dishes } from '../../data/dishes';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, backgroundColor: 'white', flex: 1 }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-8" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, marginBottom: 32 }}>
          <View className="flex-row items-center flex-1" style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Image 
              source={{ uri: 'https://thispersondoesnotexist.com' }} 
              className="w-12 h-12 rounded-full mr-4 bg-gray-200" 
              style={{ width: 48, height: 48, borderRadius: 24, marginRight: 16, backgroundColor: '#E5E7EB' }}
            />
            <View>
              <Text className="text-[#888888] text-[13px] mb-0.5" style={{ color: '#888888', fontSize: 13, marginBottom: 2 }}>Deliver to</Text>
              <Text className="text-[#333333] text-[16px] font-bold" style={{ color: '#333333', fontSize: 16, fontWeight: 'bold' }}>Your Destination</Text>
            </View>
          </View>
          
          <View className="flex-row items-center space-x-4" style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <TouchableOpacity className="relative" style={{ position: 'relative' }}>
              <Bell color="#333333" size={26} strokeWidth={1.5} />
              <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#EC994B] rounded-full border-2 border-white" style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, backgroundColor: '#EC994B', borderRadius: 5, borderWidth: 2, borderColor: 'white' }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AlignRight color="#333333" size={28} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <Text className="text-[28px] font-extrabold text-[#333333] leading-[36px] px-6 mb-8 w-[80%]" style={{ fontSize: 28, fontWeight: '800', color: '#333333', lineHeight: 36, paddingHorizontal: 24, marginBottom: 32, width: '80%' }}>
          Lets find your best favorite food!
        </Text>

        {/* Suggestion Card */}
        <View className="px-6 mb-8" style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <SuggestionCard 
            image={require('@/assets/images/MainPage/noodle.png')} 
            title="Fried Noodles With Special Chicken Katsu" 
          />
        </View>

        {/* Popular Section */}
        <View className="mb-8" style={{ marginBottom: 32 }}>
          <View className="flex-row justify-between items-end px-6 mb-4" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 24, marginBottom: 16 }}>
            <View>
              <Text className="text-[#333333] text-[20px] font-bold mb-1" style={{ color: '#333333', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>Popular</Text>
              <Text className="text-[#888888] text-[13px]" style={{ color: '#888888', fontSize: 13 }}>See the most popular food on order</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-[#EC994B] text-[14px] font-bold" style={{ color: '#EC994B', fontSize: 14, fontWeight: 'bold' }}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 10, paddingTop: 5 }}
          >
            {dishes.map((dish) => (
              <DishCard
                key={dish.id}
                image={dish.image}
                title={dish.title}
                description={dish.description}
                price={dish.price}
                onPress={() => router.push(`/food/${dish.id}` as any)}
              />
            ))}
          </ScrollView>
        </View>

        {/* New Menu Section */}
        <View className="mb-4" style={{ marginBottom: 16 }}>
          <View className="flex-row justify-between items-end px-6 mb-4" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 24, marginBottom: 16 }}>
            <View>
              <Text className="text-[#333333] text-[20px] font-bold mb-1" style={{ color: '#333333', fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>New Menu</Text>
              <Text className="text-[#888888] text-[13px]" style={{ color: '#888888', fontSize: 13 }}>See the most popular food on order</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-[#EC994B] text-[14px] font-bold" style={{ color: '#EC994B', fontSize: 14, fontWeight: 'bold' }}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
