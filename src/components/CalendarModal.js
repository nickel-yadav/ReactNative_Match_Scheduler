import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { endOfMonth, eachDayOfInterval, addDays, format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

const currentDate = format(new Date(), "yyyy-MM-dd");

export default function CalendarModal({ isVisible, setIsVisible }) {
  const [selectedDates, setSelectedDates] = useState({});

  const handleSelectFollowing15Days = () => {
    const lastSelectedDate = Object.keys(selectedDates).pop();
    let startDate = new Date();
    if (lastSelectedDate) {
      startDate = new Date(lastSelectedDate);
    }
    const updatedDates = { ...selectedDates };
    for (let i = 1; i <= 15; i++) {
      const date = addDays(startDate, i);
      const dateString = format(date, "yyyy-MM-dd");

      updatedDates[dateString] = {
        selected: true,
        marked: true,
        selectedColor: "#7ED7C1",
      };
    }
    setSelectedDates(updatedDates);
  };

  const handleSelectEntireMonth = () => {
    let today = new Date();
    const existingDates = Object.keys(selectedDates);

    if (existingDates.length > 0) {
      const lastSelectedDate = new Date(
        existingDates[existingDates.length - 1]
      );
      today = lastSelectedDate;
    }

    const start = today;
    const end = endOfMonth(today);
    const monthDates = eachDayOfInterval({ start, end });

    const updatedDates = { ...selectedDates };

    monthDates.forEach((date) => {
      const dateString = format(date, "yyyy-MM-dd");
      updatedDates[dateString] = {
        selected: true,
        marked: true,
        selectedColor: "#7ED7C1",
      };
    });

    setSelectedDates(updatedDates);
  };

  const handleDatePress = (date) => {
    const updatedDates = { ...selectedDates };
    if (updatedDates[date]) {
      delete updatedDates[date];
    } else {
      updatedDates[date] = {
        selected: true,
        marked: true,
        selectedColor: "#7ED7C1",
      };
    }
    setSelectedDates(updatedDates);
  };

  const handleReset = () => {
    setSelectedDates({});
  };

  const handleProceedToSlotSelection = (selectedDates) => {
    if (Object.keys(selectedDates).length === 0) {
      // Object is empty
      console.log("Selected dates object is empty");
      // Handle the event when the object is empty
    } else {
      // Object is not empty
      console.log("Selected dates object is not empty");
      // Handle the event when the object is not empty
    }
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
          onDayPress={(day) => handleDatePress(day.dateString)}
          markedDates={selectedDates}
          minDate={currentDate}
        />
        <View style={styles.selectionContainer}>
          <TouchableOpacity
            style={styles.selectionBtn}
            onPress={handleSelectFollowing15Days}
          >
            <Text>Select Following 15 Days</Text>
            <AntDesign name="checkcircleo" size={16} color="#65B741" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectionBtn}
            onPress={handleSelectEntireMonth}
          >
            <Text>Select Entire Month</Text>
            <AntDesign name="checkcircleo" size={16} color="#65B741" />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.resetAndProceedBtnContainer}>
            <TouchableOpacity style={styles.clearBtn} onPress={handleReset}>
              <Text style={{ color: "white" }}>Reset</Text>
              <Ionicons name="ios-refresh" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmationBtn,
                {
                  backgroundColor:
                    Object.keys(selectedDates).length === 0
                      ? "#EEF5FF"
                      : "#67729D",
                },
              ]}
              onPress={handleProceedToSlotSelection}
              disabled={Object.keys(selectedDates).length === 0}
            >
              <Text
                style={{
                  color:
                    Object.keys(selectedDates).length === 0 ? "black" : "white",
                }}
              >
                Slot Selection
              </Text>
              <FontAwesome name="long-arrow-right" size={16} color="white" />
            </TouchableOpacity>
          </View>
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
  resetAndProceedBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },
  clearBtn: {
    padding: 14,
    backgroundColor: "#67729D",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    marginRight: 10,
  },
  confirmationBtn: {
    padding: 14,
    borderRadius: 12,
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
