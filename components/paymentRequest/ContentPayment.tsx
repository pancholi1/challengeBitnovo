import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";

const ContentPayment = () => {
  const [email, setEmail] = useState("");
  const [emailIncorrect, setEmailInCorrect] = useState(false);
  const [requestCorrect, setRequestCorrect] = useState(false);

  const functionSendEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setRequestCorrect(true);
    } else {
      setEmailInCorrect(true);
    }
  };

  return (
    <View style={styles.containerContent}>
      <Image source={require("../../assets/images/money-time.png")}></Image>
      <Text style={styles.titleContent}>Solicitud de pago</Text>
      <Text style={styles.paymentTextContent}>152.256,00 €</Text>
      <Text style={styles.subTitleContent}>
        Muéstrale el QR al cliente o comparte el enlace de pago.
      </Text>

      <View style={styles.twoRequestContainer}>
        <View style={styles.requestSubContainer}>
          <Image source={require("../../assets/images/quads.png")}></Image>
          <Text style={styles.requestText}>
            https://bitnovo-public.front...{" "}
          </Text>
        </View>
        <Link href={"/qrRequest/QrRequest"} asChild>
          <Image source={require("../../assets/images/qrButton.png")} />
        </Link>
      </View>
      <View style={styles.requestContainer}>
        <Image source={require("../../assets/images/sms.png")}></Image>
        <TextInput
          style={styles.requestText}
          onChangeText={setEmail}
          value={email}
          underlineColorAndroid="red"
          placeholder="Enviar solicitud por correo electrónico"
        />
        {email !== "" && (
          <Pressable style={styles.pressableSend} onPress={functionSendEmail}>
            {({ pressed }) => (
              <Text style={[styles.textButton, { opacity: pressed ? 0.1 : 1 }]}>
                Enviar
              </Text>
            )}
          </Pressable>
        )}
        {email !== "" && emailIncorrect && (
          <Text style={styles.textButtonIncorrect}>
            El correo electrónico no es válido.
          </Text>
        )}
      </View>
      <View style={styles.requestContainer}>
        <Image source={require("../../assets/images/whatsapp.png")}></Image>
        <Text style={styles.requestText}>Enviar a número de WhatsApp</Text>
      </View>
    </View>
  );
};

export default ContentPayment;

const styles = StyleSheet.create({
  focusedBorder: {
    borderColor: "blue", // Color del borde cuando el TextInput está enfocado
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
  containerContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  twoRequestContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
  },

  requestSubContainer: {
    width: "auto",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#D3DCE6",
    height: 56,
    marginBottom: 16,
    marginRight: 0,
    borderRadius: 6,
  },
  requestContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    gap: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: "#D3DCE6",
    height: 56,
    marginBottom: 16,
    borderRadius: 6,
  },
  requestText: {
    fontSize: 14,
    fontFamily: "Mulish",
    fontWeight: "400",
    color: "#002859",
    lineHeight: 18,
    width: "100%",
  },
  pressableSend: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 57,
    height: 28,
    backgroundColor: "#035AC5",
    borderRadius: 6,
  },
  textButton: {
    fontSize: 14,
    fontFamily: "Mulish",
    fontWeight: "500",
    color: "#FFFFFF",
    lineHeight: 20,
  },
  textButtonIncorrect: {
    position: "absolute",
    bottom: 0,
    fontSize: 14,
    fontFamily: "Mulish",
    fontWeight: "500",
    color: "red",
    lineHeight: 20,
  },
});
