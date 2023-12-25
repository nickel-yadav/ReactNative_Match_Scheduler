import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CalendarModal from "../components/CalendarModal";
import HeaderTop from "../components/HeaderTop";

function HomeScreen() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
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
});
