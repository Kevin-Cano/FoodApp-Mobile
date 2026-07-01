import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';

interface SearchDishCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  onPress?: () => void;
}

export function SearchDishCard({ image, title, description, price, onPress }: SearchDishCardProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-[24px] p-3 mb-4 flex-row items-center border border-gray-100"
      style={{
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 12,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      }}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Image Container */}
      <View
        className="w-[100px] h-[100px] rounded-[18px] overflow-hidden bg-gray-50 mr-4"
        style={{ width: 100, height: 100, borderRadius: 18, overflow: 'hidden', backgroundColor: '#F9FAFB', marginRight: 16 }}
      >
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>

      {/* Details */}
      <View className="flex-1 justify-center" style={{ flex: 1, justifyContent: 'center' }}>
        <Text
          className="text-[#333333] text-[16px] font-extrabold mb-1"
          style={{ color: '#333333', fontSize: 16, fontWeight: '800', marginBottom: 4 }}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text
          className="text-[#888888] text-[13px] mb-3"
          style={{ color: '#888888', fontSize: 13, marginBottom: 12 }}
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
          <View
            className="bg-[#EC994B] w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: '#EC994B', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus color="white" size={20} strokeWidth={3} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
