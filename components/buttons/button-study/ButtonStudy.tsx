import React, { forwardRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import TriangleIcon from "../../icons/TriangleIcon";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import * as Haptics from 'expo-haptics';

type ButtonStudyProps = {
  title: string;
  size?: "small" | "large" | "medium";
  style?: object;
};

const ButtonStudy = forwardRef<typeof TouchableOpacity, ButtonStudyProps>(({ title, size = "large", style, ...props }, ref) => {
  let width: number, height: number, top: number, left: number, fontSize: number;

  if (size === "small") {
    width = 75;
    height = 75;
    top = 20;
    left = 8;
    fontSize = 14;
  } else if (size === "medium") {
    width = 100;
    height = 100;
    top = -5;
    left = -28;
    fontSize = 16;
  } else {
    width = 120;
    height = 120;
    top = 31;
    left = 16;
    fontSize = 18;
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push('/pages/terms');
      }}
      {...props}
    >
      <View style={[styles.triangleWrapper, { width, height }]}> 
        <TriangleIcon width={width} height={height} color={Colors.primary} />
      </View>
      <Text style={[styles.text, { top, left, fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  triangleWrapper: {
    position: "absolute",
    transform: [{ rotate: "45deg" }],
  },
  text: {
    position: "absolute",
    fontWeight: "bold",
    color: "white",
  },
});

export default ButtonStudy;
