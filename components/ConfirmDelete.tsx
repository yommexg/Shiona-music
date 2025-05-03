import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

interface ConfirmDeleteProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  visible,
  onCancel,
  onConfirm,
  title,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View
          style={{
            backgroundColor: "#2E2E2E",
            padding: 20,
            borderRadius: 10,
            width: "80%",
            gap: 20,
          }}>
          <Text style={{ color: "white", fontSize: 16, marginBottom: 10 }}>
            Are you sure you want to delete {title}?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 20,
            }}>
            <Pressable onPress={onCancel}>
              <Text style={{ color: "#aaa", fontSize: 18 }}>Cancel</Text>
            </Pressable>
            <Pressable onPress={onConfirm}>
              <Text style={{ color: "red", fontSize: 18 }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDelete;
