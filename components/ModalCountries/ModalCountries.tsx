import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

interface PropsAreas {
  code: string;
  item: string;
  callingCode: string;
  flag: string;
}
interface PropsModalFiat {
  isModalVisible: boolean;
  setIsModalVisible: (e: boolean) => void;
  setSelectedArea: (e: PropsAreas) => void;
  areas: PropsAreas[];
}
const ModalCountries = ({
  isModalVisible,
  setIsModalVisible,
  setSelectedArea,
  areas,
}: PropsModalFiat) => {
  const renderItem = ({ item }: { item: PropsAreas }) => {
    return (
      <View style={styles.containerFiat} key={item.item}>
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row",
          }}
          onPress={() => {
            setSelectedArea(item);
            setIsModalVisible(false);
          }}
        >
          <Image
            source={{ uri: item.flag }}
            style={{ height: 30, width: 30, marginRight: 10 }}
          ></Image>
          <Text style={styles.modalText}>{item.item}</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>
    );
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.containerCross}
              onPress={() => setIsModalVisible(false)}
            >
              <Image source={require("../../assets/images/closeCircle.png")} />
            </Pressable>
            <FlatList
              data={areas}
              renderItem={renderItem}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              style={{ padding: 20, marginBottom: 20 }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalCountries;

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
    height: 350,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    gap: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerFiat: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 16,
    gap: 8,
  },

  separator: {
    marginBottom: 10,
    height: 1,
    width: "90%",
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
