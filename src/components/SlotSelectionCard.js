import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const AvailableStrings = [
  "9AM-11AM",
  "11AM-01PM",
  "01PM-03PM",
  "03PM-05PM",
  "05PM-07PM",
  "7PM-9PM",
];

const getRandomNumber = () => Math.floor(Math.random() * 6) + 1; // Generates a random number from 0 to 5

const getRandomStrings = () => {
  const numberOfStrings = getRandomNumber();
  const randomStrings = AvailableStrings.slice(0, numberOfStrings);
  return randomStrings;
};

export default function SlotSelectionCard() {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [finalizedSlots, setFinalizedSlots] = useState([]);
  const [availableSlots] = useState(getRandomStrings());
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const handleAddSlot = () => {
    if (selectedSlots.length > 0) {
      setFinalizedSlots((prevSlots) => {
        const uniqueSelectedSlots = selectedSlots.filter(
          (slot) => !prevSlots.includes(slot)
        );
        return [...prevSlots, ...uniqueSelectedSlots];
      });
      setSelectedSlots([]);
    }
  };

  const handleSelectSlot = (slot) => {
    const isSelected = selectedSlots.includes(slot);
    if (isSelected) {
      setSelectedSlots((prevSelected) =>
        prevSelected.filter((selected) => selected !== slot)
      );
    } else {
      setSelectedSlots((prevSelected) => [...prevSelected, slot]);
    }
  };

  const handleDeleteSlot = () => {
    if (selectedSlots.length > 0) {
      const updatedSlots = finalizedSlots.filter(
        (slot) => !selectedSlots.includes(slot)
      );
      if (updatedSlots.length !== finalizedSlots.length) {
        Alert.alert(
          "Are you sure ?",
          "This action will delete the selected slot !",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                setFinalizedSlots(updatedSlots);
                setSelectedSlots([]);
              },
              style: "default",
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "This slot has not been selected",
          "Please add this slot to enable deletion",
          [
            {
              text: "OK",
              onPress: () => {
                setFinalizedSlots(updatedSlots);
                setSelectedSlots([]);
              },
              style: "default",
            },
          ],
          { cancelable: false }
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.headingContainer}
          onPress={() => setIsCardExpanded((prev) => !prev)}
        >
          <Text style={styles.headingText}>Date</Text>
          <AntDesign name="circledowno" size={16} color="white" />
        </TouchableOpacity>
        {isCardExpanded ? (
          <>
            <View style={styles.slotContainer}>
              {availableSlots.map((slot, index) => {
                const isSelected = selectedSlots.includes(slot);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.slotCard, isSelected && styles.selectedSlot]}
                    onPress={() => handleSelectSlot(slot)}
                  >
                    <Text
                      style={{
                        color: "white",
                        marginRight: 4,
                      }}
                    >
                      {slot}
                    </Text>
                    {isSelected ? (
                      <AntDesign name="checkcircleo" size={14} color="white" />
                    ) : (
                      <Feather name="circle" size={14} color="white" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.actionBtn, { borderColor: "#2D9596" }]}
                onPress={handleAddSlot}
              >
                <Text style={{ color: "#2D9596" }}>Add</Text>
                <Ionicons name="add" size={16} color="#2D9596" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { borderColor: "#B31312" }]}
                onPress={handleDeleteSlot}
              >
                <Text style={{ color: "#B31312" }}>Delete</Text>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={16}
                  color="#B31312"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerBottom}>
              {finalizedSlots.length === 0 ? (
                <View>
                  <Text style={{ color: "white" }}>No slots selected</Text>
                </View>
              ) : (
                <View style={styles.flexContainer}>
                  {finalizedSlots.map((slot, index) => {
                    return (
                      <View key={index} style={styles.slotCard}>
                        <Text
                          style={{
                            color: "white",
                            marginRight: 4,
                          }}
                        >
                          {slot}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </>
        ) : (
          <View style={styles.containerBottom}>
            {finalizedSlots.length === 0 ? (
              <View>
                <Text style={{ color: "white" }}>No slots selected</Text>
              </View>
            ) : (
              <View style={styles.flexContainer}>
                {finalizedSlots.map((slot, index) => {
                  return (
                    <View key={index} style={styles.slotCard}>
                      <Text
                        style={{
                          marginRight: 4,
                          color: "white",
                        }}
                      >
                        {slot}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9EB8D9",
    borderRadius: 6,
    marginTop: 10,
  },
  innerContainer: {
    padding: 4,
  },
  headingContainer: {
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: {
    fontSize: 16,
    color: "white",
  },
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 4,
  },
  slotCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "white",
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 6,
  },
  selectedSlot: {
    borderColor: "#2D9596",
    backgroundColor: "#2D9596",
  },
  btnContainer: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 4,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 6,
  },
  containerBottom: {
    padding: 4,
    borderTopWidth: 1,
    borderColor: "white",
  },
  flexContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
});
