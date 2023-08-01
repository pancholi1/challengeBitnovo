import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { ModalFiat } from "../components/ModalFiat/index";

export default function MakePayScreen() {
  const [input, setInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState("EUR");
  const addNumber = (e: string) => {
    setInput(input + e);
  };
  const addDelete = () => {
    setInput(input.slice(0, -1));
  };
  const numberWithCommas = (number: number) => {
    return number.toLocaleString("es-ES"); // Aplica el formato con comas según la configuración de españa
  };

  return (
    <View
      style={[
        styles.container,
        modalVisible
          ? {
              backgroundColor: "#ebeffa",
              opacity: 0.1,
              borderWidth: 1,
              borderColor: "#dae0f2",
            }
          : {},
      ]}
    >
      <View style={styles.header}>
        <View style={styles.badge}>
          <Image source={require("../assets/images/arrowLeft.png")} />
        </View>
        <Text style={styles.textHeader}> Solictar pago</Text>

        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
        >
          {({ pressed }) => (
            <View style={[styles.badge, { opacity: pressed ? 0.1 : 1 }]}>
              <Text style={styles.textBagde}>{selectedFiat}</Text>
              <Image source={require("../assets/images/arrowDown.png")} />
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.containerTotal}>
        <Text style={styles.title}>
          {input !== "" ? numberWithCommas(Number(input)) : "0,00"}{" "}
          {selectedFiat}
        </Text>
      </View>

      <View style={styles.containerNumber}>
        <View style={styles.rowNumbers}>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("1");
            }}
          >
            <Text style={styles.textNumber}>1</Text>
          </Pressable>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("2");
            }}
          >
            <Text style={styles.textNumber}>2</Text>
          </Pressable>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("3");
            }}
          >
            <Text style={styles.textNumber}>3</Text>
          </Pressable>
        </View>

        <View style={styles.rowNumbers}>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("4");
            }}
          >
            <Text style={styles.textNumber}>4</Text>
          </Pressable>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("5");
            }}
          >
            <Text style={styles.textNumber}>5</Text>
          </Pressable>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("6");
            }}
          >
            <Text style={styles.textNumber}>6</Text>
          </Pressable>
        </View>

        <View style={styles.rowNumbers}>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("7");
            }}
          >
            <Text style={styles.textNumber}>7</Text>
          </Pressable>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("8");
            }}
          >
            <Text style={styles.textNumber}>8</Text>
          </Pressable>
          <Pressable
            style={styles.pressableNumber}
            onPress={() => {
              addNumber("9");
            }}
          >
            <Text style={styles.textNumber}>9</Text>
          </Pressable>
        </View>
        <View style={styles.rowNumbers}>
          <Pressable style={styles.pressableNumber}>
            <Image source={require("../assets/images/iconBitnovo.png")}></Image>
          </Pressable>
          <Pressable style={styles.pressableNumber}>
            <Text style={styles.textNumber}>0</Text>
          </Pressable>
          <Pressable style={styles.pressableNumber} onPress={addDelete}>
            <Image source={require("../assets/images/arrowBack.png")}></Image>
          </Pressable>
        </View>
      </View>

      <View style={styles.containerButtons}>
        {input && (
          <Pressable style={styles.pressableButton}>
            {({ pressed }) => (
              <Link
                style={styles.containerLink}
                href={{
                  pathname: "/paymentRequest",
                  params: { payment: input, fiat: selectedFiat },
                }}
              >
                <Text
                  style={[styles.textButton, { opacity: pressed ? 0.1 : 1 }]}
                >
                  Solcitar
                </Text>
              </Link>
            )}
          </Pressable>
        )}
        {!input && (
          <View style={styles.pressableButtonDisable}>
            <Text style={styles.textButton}>Solcitar</Text>
          </View>
        )}

        <Pressable
          style={styles.pressableButtonRestart}
          onPress={() => {
            setInput("");
          }}
        >
          {({ pressed }) => (
            <Text
              style={[styles.textButtonRestart, { opacity: pressed ? 0.1 : 1 }]}
            >
              Restablecer
            </Text>
          )}
        </Pressable>
      </View>
      {modalVisible && (
        <ModalFiat
          setSelectedFiat={setSelectedFiat}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    paddingTop: 0,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    height: 60,
    padding: 18,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  badge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF2F7",
    borderRadius: 24,
    padding: 6,
    gap: 8,
  },
  textHeader: {
    fontSize: 18,
    fontFamily: "Mulish",
    fontWeight: "700",
    color: "#002859",
    lineHeight: 22,
  },
  textBagde: {
    fontSize: 12,
    fontFamily: "Mulish",
    fontWeight: "700",
    color: "#002859",
    lineHeight: 15,
  },
  containerTotal: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  containerNumber: {
    width: "100%",
    padding: 18,
  },
  title: {
    fontSize: 40,
    fontFamily: "Mulish",
    fontWeight: "700",
    color: "#002859",
    lineHeight: 50,
  },
  rowNumbers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 16,
    paddingTop: 16,

    gap: 12,
  },
  textNumber: {
    fontSize: 25,
    fontFamily: "Mulish",
    fontWeight: "700",
    color: "#002859",
    lineHeight: 39,
  },

  pressableNumber: {
    width: 64,
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  containerButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 40,
    padding: 18,
  },
  pressableButtonDisable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 18,
    backgroundColor: "#035AC5",
    borderRadius: 6,
    opacity: 0.2,
  },
  pressableButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 18,
    backgroundColor: "#035AC5",
    borderRadius: 6,
  },
  textButton: {
    fontSize: 16,
    fontFamily: "Mulish",
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 20,
  },
  pressableButtonRestart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 18,
    borderWidth: 1,
    borderColor: "#B91C1C",
    borderRadius: 6,
  },
  textButtonRestart: {
    fontSize: 16,
    fontFamily: "Mulish",
    fontWeight: "600",
    color: "#B91C1C",
    lineHeight: 20,
  },

  containerLink: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
