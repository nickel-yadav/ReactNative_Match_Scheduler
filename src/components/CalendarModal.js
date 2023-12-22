import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function CalendarModal({ isVisible, setIsVisible }) {
  const [selected, setSelected] = useState("");

  const handleSelectFollowing15Days = () => {
    // TODO: Store selection data
  };

  const handleSelectEntireMonth = () => {
    // TODO: Store selection data
  };

  return (
    <ModalWrapper
      visible={isVisible}
      fullScreen={true}
      setVisible={setIsVisible}
    >
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Day Selection</Text>
          <Text style={styles.subheading}>
            Select days for scheduling your matches. You may select ranges by
            dragging your selection
          </Text>
        </View>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
        <View style={styles.selectionContainer}>
          <TouchableOpacity
            style={styles.selectionBtn}
            onPress={handleSelectFollowing15Days}
          >
            <Text>Select Following 15 Days</Text>
            <AntDesign name="checkcircleo" size={16} color="#65B741" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectionBtn}>
            <Text>Select Entire Month</Text>
            <AntDesign name="checkcircleo" size={16} color="#65B741" />
          </TouchableOpacity>
        </View>
        <View style={styles.confirmationBtnContainer}>
          <TouchableOpacity style={styles.confirmationBtn}>
            <Text style={{ color: "white" }}>Continue to Slot Selection</Text>
            <FontAwesome name="long-arrow-right" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  headingContainer: {
    backgroundColor: "#756AB6",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  heading: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  subheading: {
    color: "white",
  },
  selectionContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  selectionBtn: {
    marginTop: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#A1EEBD",
    borderRadius: 12,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmationBtn: {
    marginTop: 10,
    padding: 14,
    backgroundColor: "#67729D",
    borderRadius: 12,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmationBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
