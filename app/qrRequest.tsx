import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { router, useLocalSearchParams } from "expo-router";
const qrRequestScreen = () => {
  const params = useLocalSearchParams();
  const { fiat_amount, url, fiat, identifier } = params;
  useEffect(() => {
    const createWebSocket = () => {
      const socketURL = `wss://payments.smsdata.com/ws/merchant/${identifier}`;
      const socket = new WebSocket(socketURL);
      socket.onopen = () => {
        console.log("Conexión establecida");
      };

      socket.onmessage = (event) => {
        console.log("Mensaje recibido del servidor:", event.data);
        router.replace("/paymentMade");
      };
      socket.onclose = (event) => {
        console.log(
          "Conexión cerrada. Código:",
          event.code,
          "Razón:",
          event.reason
        );
      };
    };
    // Llamamos a la función para crear el WebSocket cuando el componente se monta
    createWebSocket();
  }, [identifier]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={require("../assets/images/info.png")}></Image>
        <Text style={styles.infoText}>
          Muestra este QR y será redirigido a la pasarela de pago.
        </Text>
      </View>
      <View style={styles.quadQr}>
        <QRCode
          value={typeof url == "string" ? url : ""}
          size={300}
          color="#002859"
        />
        <Text style={styles.textFiat}>
          {fiat_amount} {fiat}
        </Text>
      </View>

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
              source={require("../assets/images/printer.png")}
            ></Image>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default qrRequestScreen;

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
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 375,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  textFiat: {
    fontSize: 25,
    fontFamily: "Mulish",
    fontWeight: "700",
    color: "#002859",
    lineHeight: 39,
    marginVertical: 8,
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
