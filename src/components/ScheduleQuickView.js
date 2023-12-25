import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { format, parseISO } from "date-fns";

export default function ScheduleQuickView({ data }) {
  const formattedDate = format(parseISO(data.date), "EEEE dd MMM");
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text>{formattedDate}</Text>
      </View>
      <View style={styles.slotContainer}>
        {data.slots && data.slots.length > 0 ? (
          <View style={styles.flexContainer}>
            {data.slots.map((slot, index) => (
              <View style={styles.slotCard} key={index}>
                <Text
                  style={{
                    marginRight: 4,
                  }}
                >
                  {slot}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>No Slots Selected</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  headingContainer: {
    padding: 6,
    backgroundColor: "#29ADB2",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  slotContainer: {
    padding: 6,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: "#9EB8D9",
  },
  slotCard: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#9EB8D9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 6,
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 6,
  },
});
