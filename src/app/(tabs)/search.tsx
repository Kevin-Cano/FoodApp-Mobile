import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useSearchRecipeWithDebounce } from "../../hooks/useSearchRecipe";
import { router } from "expo-router";
import { Search as SearchIcon } from "lucide-react-native";
import { SearchDishCard } from "../../components/SearchDishCard";

function setPrice(id: string): string {
  const n = parseInt(id.slice(-2) || "0", 10) || 0;
  return `$${(6 + (n % 14) + 0.99).toFixed(2)}`;
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isRefetching, isLoading } =
    useSearchRecipeWithDebounce(searchQuery);

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 16 }}>
        <Text
          className="text-[#333333] text-[28px] font-extrabold mb-6"
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: "#333333",
            marginBottom: 24,
          }}
        >
          Recherche
        </Text>

        <View
          className="flex-row items-center bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl px-4 py-3 mb-6"
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F9FAFB",
            borderWidth: 1,
            borderColor: "#F3F4F6",
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginBottom: 24,
          }}
        >
          <SearchIcon color="#888888" size={20} strokeWidth={2} style={{ marginRight: 12 }} />
          <TextInput
            className="flex-1 text-[16px] text-[#333333]"
            style={{ flex: 1, fontSize: 16, color: "#333333" }}
            placeholder="Rechercher une recette..."
            placeholderTextColor="#888888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => refetch()}
            returnKeyType="search"
          />
        </View>

        {isLoading && searchQuery !== "" ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#EC994B" />
          </View>
        ) : (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={() => refetch()}
                colors={["#EC994B"]}
                tintColor="#EC994B"
              />
            }
            ListEmptyComponent={() => (
              <View style={{ alignItems: "center", marginTop: 40 }}>
                <Text style={{ color: "#888888", fontSize: 16 }}>
                  {searchQuery ? "Aucune recette trouvée." : "Commencez à chercher une recette !"}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <SearchDishCard
                image={item.strMealThumb}
                title={item.strMeal}
                description={item.strCategory || "Meal"}
                price={setPrice(item.idMeal)}
                onPress={() => router.push(`/food/${item.idMeal}` as any)}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
