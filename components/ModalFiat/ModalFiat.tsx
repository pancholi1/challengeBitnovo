import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";

interface PropsModalFiat {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
  setSelectedFiat: (e: string) => void;
}

const ModalFiat = ({
  modalVisible,
  setModalVisible,
  setSelectedFiat,
}: PropsModalFiat) => {
  const fiat = ["EUR", "USD", "GBP", "ARS"];
  const renderItem = ({ item }: { item: string }) => {
    return (
      <Pressable
        onPress={() => {
          setSelectedFiat(item);
          setModalVisible(false);
        }}
      >
        {({ pressed }) => (
          <View style={[styles.containerFiat, { opacity: pressed ? 0.1 : 1 }]}>
            <Text style={styles.modalText}>{item}</Text>
            <View style={styles.separator} />
          </View>
        )}
      </Pressable>
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.containerCross}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Image source={require("../../assets/images/closeCircle.png")} />
          </Pressable>
          <Text style={styles.modalText}>Elige una moneda</Text>
          <FlatList
            data={fiat}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            style={{ padding: 20, marginBottom: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalFiat;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  containerCross: {
    width: "100%",
    alignItems: "flex-end",
    padding: 16,
    paddingBottom: 0,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    gap: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  containerFiat: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
  fitaTextGrey: {
    fontSize: 16,
    fontFamily: "Mulish",
    fontWeight: "400",
    color: "#758192",
    lineHeight: 24,
  },
  separator: {
    marginBottom: 10,
    height: 1,
    width: 100,
    backgroundColor: "#eee",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Mulish",
    fontWeight: "700",
    color: "#002859",
    lineHeight: 22,
  },
});
