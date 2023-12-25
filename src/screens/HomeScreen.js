import React, { useState } from "react";
import { FlatList, TouchableOpacity, StatusBar } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CalendarModal from "../components/CalendarModal";
import HeaderTop from "../components/HeaderTop";
import { useSelector } from "react-redux";
import ScheduleQuickView from "../components/ScheduleQuickView";

function HomeScreen() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const schedule = useSelector((state) => state.schedule.selectedDates);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="auto" />
      <CalendarModal
        isVisible={isCalendarVisible}
        setIsVisible={setIsCalendarVisible}
      />
      <HeaderTop
        heading={"Fantasy Match Scheduler"}
        subheading={
          "Create and manage schedules for all your fantasy matches in one place."
        }
      />

      {schedule.length === 0 ? (
        <View style={styles.schedulesPane}>
          <TouchableOpacity
            style={styles.scheduleBtn}
            onPress={() => setIsCalendarVisible(true)}
          >
            <Text style={styles.scheduleBtnTitle}>Create Schedule</Text>
            <AntDesign
              name="pluscircleo"
              size={16}
              color="white"
              style={{ paddingLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.scheduleListContainer}>
          <Text style={styles.listHeading}>Your Schedule</Text>
          <View style={{ marginBottom: 10, flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.scheduleBtn}
              onPress={() => setIsCalendarVisible(true)}
            >
              <Text style={styles.scheduleBtnTitle}>Create/Edit Schedule</Text>
              <AntDesign
                name="pluscircleo"
                size={16}
                color="white"
                style={{ paddingLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={schedule}
            contentContainerStyle={{ paddingBottom: 200 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ScheduleQuickView data={item} />}
          />
        </View>
      )}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  schedulesPane: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scheduleBtn: {
    padding: 10,
    backgroundColor: "#596FB7",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleBtnTitle: {
    color: "white",
  },
  scheduleListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listHeading: {
    fontSize: 18,
    marginBottom: 10,
  },
});
