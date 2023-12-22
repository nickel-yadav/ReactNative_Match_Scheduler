import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalWrapper from "./ModalWrapper";

export default function CalendarModal({ isVisible, setIsVisible }) {
  return (
    <ModalWrapper
      visible={isVisible}
      fullScreen={true}
      setVisible={setIsVisible}
    >
      <Text>Hello</Text>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({});
