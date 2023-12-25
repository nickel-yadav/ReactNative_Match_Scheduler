import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import HeaderTop from "../components/HeaderTop";
import SlotSelectionCard from "../components/SlotSelectionCard";
import { useSelector } from "react-redux";

export default function SlotSelectionScreen() {
  const selectedDates = useSelector((state) => state.schedule.selectedDates);
  return (
    <View style={{ flex: 1 }}>
      <HeaderTop
        heading="Select your slots"
        subheading="Schedule and manage time slots for various days"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.contentHeading}>Your Slots</Text>
        <FlatList
          data={selectedDates}
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <SlotSelectionCard date={item.date} />}
        />
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
