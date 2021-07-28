import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Image,
  StatusBar,
  useWindowDimensions,
} from "react-native";

const images = [
  "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1559254232-5ef04905902a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1618137532047-77dd98d322a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1617046876710-f38e8a1c4f93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1627403672820-6184fd0f54ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1627402416790-6d56a206e9f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
  "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=1200&q=80",
];

export const Gallery = () => {
  const { width, height } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar hidden />
      <View style={styles.topContainer}>
        <View style={StyleSheet.absoluteFillObject}>
          {images.map((image, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <Animated.Image
                key={`image-bg-${index}`}
                source={{ uri: image }}
                blurRadius={60}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    width,
                    height,
                    resizeMode: "cover",
                    opacity,
                  },
                ]}
              />
            );
          })}
        </View>
        <Animated.FlatList
          horizontal
          pagingEnabled
          data={images}
          keyExtractor={(_, index) => index.toString()}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          renderItem={({ item }) => {
            return (
              <View style={[styles.galleryImageContainer, { width }]}>
                <Image
                  source={{ uri: item }}
                  style={[
                    styles.galleryImage,
                    {
                      width: width * 0.7,
                      height: height * 0.6,
                    },
                  ]}
                />
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  galleryImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowRadius: 30,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.6,
    elevation: 2,
  },
  galleryImage: {
    borderRadius: 16,
    resizeMode: "cover",
  },
});
