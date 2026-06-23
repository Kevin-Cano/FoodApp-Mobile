import { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const WINDOW_WIDTH = Dimensions.get("window").width;

interface SliderItem {
  id: string;
  imageUrl: any;
  title: string;
  description: string;
}

const ONBOARDING_DATA: SliderItem[] = [
  {
    id: "1",
    imageUrl: require("@/assets/images/OnBoarding/OnBoardImage.png"),
    title: "Dont Wanna Make\nYou Have A Bad Day",
    description:
      "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Sed do eiusmod.",
  },
  {
    id: "2",
    imageUrl: require("@/assets/images/OnBoarding/OnBoardImage.png"),
    title: "Dont Wanna Make\nYou Have A Bad Day",
    description:
      "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Sed do eiusmod.",
  },
  {
    id: "3",
    imageUrl: require("@/assets/images/OnBoarding/OnBoardImage.png"),
    title: "Dont Wanna Make\nYou Have A Bad Day",
    description:
      "Lorem ipsum dolor sit amet, consectetur\nadipiscing elit. Sed do eiusmod",
  },
];

export default function OnBoarding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentIndex(
      Math.round(event.nativeEvent.contentOffset.x / WINDOW_WIDTH)
    );
  };

  const handleComplete = () => {
    console.log("go");
  };

  return (
    <View className="flex-1 bg-white" style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        style={{ flex: 1 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        data={ONBOARDING_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={{ width: WINDOW_WIDTH, height: "100%", alignItems: "center" }}>
            <Animated.View
              entering={FadeIn.delay(index * 200)}
              className="w-full items-center justify-end pt-12"
              style={{ flex: 0.55, width: "100%", alignItems: "center", justifyContent: "flex-end", paddingTop: 50 }}
            >
              <Image
                source={item.imageUrl}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </Animated.View>

            <View className="w-full items-center px-10 pt-12" style={{ flex: 0.45, width: "100%", alignItems: "center", paddingTop: 48, paddingHorizontal: 40 }}>
              <Text className="text-[26px] font-extrabold text-[#333333] text-center mb-4 leading-[34px]" style={{ fontSize: 26, fontWeight: "800", color: "#333333", textAlign: "center", marginBottom: 16, lineHeight: 34 }}>
                {item.title}
              </Text>
              <Text className="text-[15px] text-[#888888] text-center leading-[22px] font-normal" style={{ fontSize: 15, color: "#888888", textAlign: "center", lineHeight: 22 }}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />

      <View 
        className="flex-row absolute top-[54%] left-0 right-0 justify-center items-center"
        style={{ flexDirection: "row", position: "absolute", top: "54%", left: 0, right: 0, justifyContent: "center", alignItems: "center" }}
      >
        {ONBOARDING_DATA.map((_, index) => (
          <View
            key={`dot-${index}`}
            className={`rounded-full mx-1 ${
              currentIndex === index
                ? "w-6 h-1 bg-[#EBA352]"
                : "w-3 h-1 bg-[#F4D7B8]"
            }`}
            style={{ height: 4, borderRadius: 2, marginHorizontal: 4, width: currentIndex === index ? 24 : 12, backgroundColor: currentIndex === index ? "#EBA352" : "#F4D7B8" }}
          />
        ))}
      </View>

      {currentIndex === ONBOARDING_DATA.length - 1 && (
        <Animated.View
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(400)}
          className="absolute bottom-[50px] left-[30px] right-[30px]"
          style={{ position: "absolute", bottom: 50, left: 30, right: 30 }}
        >
          <TouchableOpacity
            className="bg-[#EBA352] py-[18px] rounded-[30px] items-center justify-center shadow-lg shadow-black/30"
            style={{ backgroundColor: "#EBA352", paddingVertical: 18, borderRadius: 30, alignItems: "center", justifyContent: "center", elevation: 8 }}
            activeOpacity={0.8}
            onPress={handleComplete}
          >
            <Text className="text-white text-[18px] font-bold" style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
