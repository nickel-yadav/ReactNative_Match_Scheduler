import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderTop from "../components/HeaderTop";
import SlotSelectionCard from "../components/SlotSelectionCard";

export default function SlotSelectionScreen() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderTop
        heading="Select your slots"
        subheading="Schedule and manage time slots for various days"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.contentHeading}>Your Slots</Text>
        <SlotSelectionCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  contentHeading: {
    fontSize: 18,
  },
});
