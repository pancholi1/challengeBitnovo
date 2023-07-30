import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const qr = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={require("../../assets/images/info.png")}></Image>
        <Text style={styles.infoText}>
          Muestra este QR y será redirigido a la pasarela de pago.
        </Text>
      </View>
      <View style={styles.quadQr}></View>
      <Text style={styles.refreshText}>
        Esta pantalla se actualizará automáticamente.
      </Text>

      <Pressable style={styles.pressableButtonPrint} onPress={() => {}}>
        {({ pressed }) => (
          <View style={styles.printButton}>
            <Text
              style={[styles.textPrintButton, { opacity: pressed ? 0.1 : 1 }]}
            >
              Imprimir
            </Text>
            <Image
              style={{ opacity: pressed ? 0.1 : 1 }}
              source={require("../../assets/images/printer.png")}
            ></Image>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default qr;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002859",
    flex: 1,
    alignItems: "center",
    display: "flex",
    padding: 18,
    gap: 16,
  },
  infoContainer: {
    width: "100%",
    gap: 8,
    backgroundColor: "#EAF3FF",
    padding: 14,
    display: "flex",
    flexDirection: "row",
    borderRadius: 6,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Mulish",
    fontWeight: "400",
    color: "#002859",
    lineHeight: 20,
  },
  refreshText: {
    fontSize: 14,
    fontFamily: "Mulish",
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 20,
    marginVertical: 8,
    letterSpacing: 0.14,
  },
  quadQr: {
    width: "100%",
    height: 375,
    backgroundColor: "#fff",
  },
  pressableButtonPrint: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 24,
  },
  printButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  textPrintButton: {
    fontSize: 16,
    fontFamily: "Mulish",
    fontWeight: "700",
    color: "#035AC5",
    lineHeight: 22,
  },
});
