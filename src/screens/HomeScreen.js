import * as React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerTop}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Fantasy Match Scheduler</Text>
          <Text style={styles.subheading}>
            Create and manage schedules for all your fantasy matches in one
            place.
          </Text>
        </View>
      </View>
      <View style={styles.schedulesPane}>
        <TouchableOpacity style={styles.scheduleBtn}>
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
  headerTop: {
    height: 110,
    width: "100%",
    backgroundColor: "#11235A",
    padding: 10,
  },
  contentContainer: {
    paddingLeft: 40,
  },
  heading: {
    fontSize: 20,
    color: "#EEF5FF",
    marginBottom: 12,
  },
  subheading: {
    color: "#9EB8D9",
  },
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
