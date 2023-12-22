import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ModalWrapper = ({
  children,
  setVisible,
  visible,
  backgroundColor,
  fullScreen,
  disableOnTouchClose,
  loading,
}) => {
  return (
    <Modal
      transparent={backgroundColor === "transparent"}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        !loading && setVisible(false);
      }}
    >
      {fullScreen ? (
        children
      ) : (
        <TouchableWithoutFeedback
          disabled={disableOnTouchClose}
          onPress={() => {
            !loading && setVisible(false);
          }}
          testID="close"
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor: "rgba(0,0,0,0.3)",
              },
            ]}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      )}
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
