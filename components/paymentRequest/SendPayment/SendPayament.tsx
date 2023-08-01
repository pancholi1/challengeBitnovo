import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

interface PropsSendPayment {
  requestCorrect: boolean;
}
const SendPayament = ({ requestCorrect }: PropsSendPayment) => {
  const params = useLocalSearchParams();
  const { payment, fiat } = params;
  return requestCorrect ? (
    <View style={styles.containerRequest}>
      <Image source={require("../../../assets/images/plane.png")}></Image>
      <Text style={styles.paymentTextContent}>Solicitud de pago enviada</Text>
      <Text style={styles.subTitleContent}>
        Muéstrale el QR al cliente o comparte el enlace de pago.
      </Text>
    </View>
  ) : (
    <View style={styles.containerRequest}>
      <Image source={require("../../../assets/images/money-time.png")}></Image>
      <Text style={styles.titleContent}>Solicitud de pago</Text>
      <Text style={styles.paymentTextContent}>
        {Number(payment).toLocaleString("es-ES")} {fiat}
      </Text>
      <Text style={styles.subTitleContent}>
        Se ha enviado la solicitud de pago por correo a tus clientes
      </Text>
    </View>
  );
};

export default SendPayament;

const styles = StyleSheet.create({
  containerRequest: {
    width: "100%",
    alignItems: "center",
  },
  titleContent: {
    fontSize: 18,
    fontFamily: "Mulish",
    fontWeight: "400",
    color: "#758192",
    lineHeight: 22,
  },
  paymentTextContent: {
    fontSize: 25,
    fontFamily: "Mulish",
    color: "#002859",
    lineHeight: 39,
    fontWeight: "700",
  },
  subTitleContent: {
    fontSize: 14,
    fontFamily: "Mulish",
    fontWeight: "400",
    color: "#758192",
    lineHeight: 18,
    textAlign: "center",
    width: "80%",
    marginTop: 16,
  },
});
