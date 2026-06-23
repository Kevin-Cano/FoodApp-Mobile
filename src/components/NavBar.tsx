import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Home, Search, Heart, User } from 'lucide-react-native';

export function NavBar({ state, descriptors, navigation }: any) {
  return (
    <View 
      className="bg-white flex-row justify-around items-center pt-4 pb-8 border-t border-gray-100"
      style={{ 
        flexDirection: 'row', 
        backgroundColor: 'white', 
        paddingBottom: 30, 
        paddingTop: 15, 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        borderTopWidth: 1, 
        borderTopColor: '#F0F0F0',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 5
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // Sélection de l'icône en fonction du nom de la route (le nom du fichier)
        let Icon;
        switch (route.name) {
          case 'index':
            Icon = Home;
            break;
          case 'search':
            Icon = Search;
            break;
          case 'favorites':
            Icon = Heart;
            break;
          case 'profile':
            Icon = User;
            break;
          default:
            Icon = Home;
        }

        const color = isFocused ? '#EC994B' : '#C4C4C4';
        
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.7}
          >
            <Icon 
              color={color} 
              size={28} 
              strokeWidth={isFocused ? 2.5 : 2} 
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
