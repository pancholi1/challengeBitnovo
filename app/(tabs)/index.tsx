import { Alert, Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { Link } from "expo-router";

export default function TabOneScreen() {
  const [input, setInput] = useState("");

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
    <View style={styles.container}>
      <View style={styles.containerTotal}>
        <Text style={styles.title}>
          {input !== "" ? numberWithCommas(Number(input)) : "0"},00 €
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
            <Image
              // style={styles.img_logo}
              source={require("../../assets/images/iconBitnovo.png")}
            ></Image>
          </Pressable>
          <Pressable style={styles.pressableNumber}>
            <Text style={styles.textNumber}>0</Text>
          </Pressable>
          <Pressable style={styles.pressableNumber} onPress={addDelete}>
            <Image
              // style={styles.img_logo}
              source={require("../../assets/images/arrowBack.png")}
            ></Image>
          </Pressable>
        </View>
      </View>

      <View style={styles.containerButtons}>
        <Link href={"/paymentRequest/paymentRequest"} asChild>
          <Pressable style={styles.pressableButton}>
            {({ pressed }) => (
              <Text style={[styles.textButton, { opacity: pressed ? 0.1 : 1 }]}>
                Solcitar
              </Text>
            )}
          </Pressable>
        </Link>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    padding: 18,
  },
  containerTotal: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  containerNumber: {
    width: "100%",
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
});
