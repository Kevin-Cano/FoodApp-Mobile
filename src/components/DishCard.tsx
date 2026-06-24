import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Heart, Plus } from 'lucide-react-native';

interface DishCardProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  price: string;
  onPress?: () => void;
}

export function DishCard({ image, title, description, price, onPress }: DishCardProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-[24px] w-[170px] mr-5 p-3 border border-gray-100"
      style={{
        backgroundColor: 'white',
        borderRadius: 24,
        width: 170,
        marginRight: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 3
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Image Container with Heart Icon */}
      <View 
        className="w-full h-[140px] rounded-[18px] mb-3 overflow-hidden bg-gray-50 relative"
        style={{ width: '100%', height: 140, borderRadius: 18, marginBottom: 12, overflow: 'hidden', backgroundColor: '#F9FAFB', position: 'relative' }}
      >
        <Image 
          source={image} 
          className="w-full h-full" 
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover" 
        />
        <TouchableOpacity 
          className="absolute top-2 right-2 p-1.5 bg-white/40 rounded-full" 
          style={{ position: 'absolute', top: 8, right: 8, padding: 6, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 20 }}
          activeOpacity={0.7}
        >
          <Heart color="white" size={18} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Details */}
      <View className="px-1" style={{ paddingHorizontal: 4 }}>
        <Text 
          className="text-[#333333] text-[16px] font-extrabold mb-0.5" 
          style={{ color: '#333333', fontSize: 16, fontWeight: '800', marginBottom: 2 }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text 
          className="text-[#888888] text-[12px] mb-3" 
          style={{ color: '#888888', fontSize: 12, marginBottom: 12 }}
          numberOfLines={1}
        >
          {description}
        </Text>
        
        {/* Price and Add Button */}
        <View 
          className="flex-row items-center justify-between"
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Text 
            className="text-[#333333] text-[18px] font-extrabold"
            style={{ color: '#333333', fontSize: 18, fontWeight: '800' }}
          >
            {price}
          </Text>
          <TouchableOpacity 
            className="bg-[#EC994B] w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: '#EC994B', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.8}
          >
            <Plus color="white" size={20} strokeWidth={3} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
