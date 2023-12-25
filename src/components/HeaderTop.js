import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HeaderTop({ heading, subheading }) {
  return (
    <View style={styles.headerTop}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subheading}>{subheading}</Text>
      </View>
    </View>
  );
}

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
});
