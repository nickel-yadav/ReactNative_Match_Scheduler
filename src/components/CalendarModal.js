import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ModalWrapper from "./ModalWrapper";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { endOfMonth, eachDayOfInterval, addDays, format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectDates, clearDates } from "../features/scheduleSlice";
import { useNavigation } from "@react-navigation/native";

const currentDate = format(new Date(), "yyyy-MM-dd");

export default function CalendarModal({ isVisible, setIsVisible }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedDates = useSelector((state) => state.schedule.selectedDates);

  const handleSelectFollowing15Days = () => {
    const lastSelectedDate =
      selectedDates.length > 0
        ? selectedDates[selectedDates.length - 1].date
        : new Date();
    let startDate = new Date(lastSelectedDate);

    const updatedDates = [];
    for (let i = 1; i <= 15; i++) {
      const date = addDays(startDate, i);
      const dateString = format(date, "yyyy-MM-dd");

      updatedDates.push({
        date: dateString,
        selected: true,
        marked: true,
        selectedColor: "#7ED7C1",
      });
    }
    dispatch(selectDates([...selectedDates, ...updatedDates]));
  };

  const handleSelectEntireMonth = () => {
    let today = new Date();
    const existingDates = selectedDates.map((dateObj) => dateObj.date);

    const lastSelectedDate =
      existingDates.length > 0
        ? existingDates[existingDates.length - 1]
        : today;
    today = new Date(lastSelectedDate);

    const start = today;
    const end = endOfMonth(today);
    const monthDates = eachDayOfInterval({ start, end });

    const updatedDates = monthDates.map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      selected: true,
      marked: true,
      selectedColor: "#7ED7C1",
    }));

    dispatch(selectDates([...selectedDates, ...updatedDates]));
  };

  const handleDatePress = (date) => {
    if (selectedDates.find((d) => d.date === date)) {
      // Date is already selected, deselect it
      const updatedDates = selectedDates.filter((d) => d.date !== date);
      dispatch(selectDates(updatedDates));
    } else {
      // Date is not selected, select it
      const updatedDates = [
        ...selectedDates,
        {
          date: format(date, "yyyy-MM-dd"),
          selected: true,
          marked: true,
          selectedColor: "#7ED7C1",
        },
      ];
      dispatch(selectDates(updatedDates));
    }
  };

  const handleReset = () => {
    dispatch(clearDates());
  };

  const handleProceedToSlotSelection = (selectedDates) => {
    if (Object.keys(selectedDates).length === 0) {
      return;
    } else {
      setIsVisible(false);
      navigation.navigate("SlotSelection");
    }
  };

  const markedDates = selectedDates.reduce((accumulator, currentValue) => {
    accumulator[currentValue.date] = {
      selected: true,
      marked: true,
      selectedColor: "#7ED7C1",
    };
    return accumulator;
  }, {});

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
          markedDates={markedDates}
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
