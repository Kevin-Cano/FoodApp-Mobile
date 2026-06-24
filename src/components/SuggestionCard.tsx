import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface SuggestionCardProps {
  image: string;
  title: string;
}

export function SuggestionCard({ image, title }: SuggestionCardProps) {
  return (
    <View 
      style={{ 
        width: '100%',
        backgroundColor: '#EC994B',
        borderRadius: 24,
        flexDirection: 'row',
        overflow: 'hidden',
        height: 160, 
        elevation: 5, 
        shadowColor: '#EC994B', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 8 
      }}
    >
      {/* Partie gauche : Image collée au bord gauche */}
      <View style={{ flex: 0.45, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 0 }}>
        <Image 
          source={{ uri: image }}
          style={{ width: '120%', height: '120%', marginLeft: -10 }}
          resizeMode="contain" 
        />
      </View>
      
      {/* Partie droite : Texte et Bouton */}
      <View style={{ flex: 0.55, paddingVertical: 16, paddingRight: 16, paddingLeft: 4, justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 13, fontWeight: '500', marginBottom: 6 }}>
          Special for you
        </Text>
        <Text style={{ color: 'white', fontSize: 17, fontWeight: '800', lineHeight: 22, marginBottom: 12 }}>
          {title}
        </Text>
        <TouchableOpacity 
          style={{ backgroundColor: '#4D4D4D', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, alignSelf: 'flex-start' }}
          activeOpacity={0.8}
        >
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
