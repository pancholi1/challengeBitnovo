import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

const paymentMadeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/cotillon.png")}
        style={{ marginTop: -80 }}
      />
      <Text style={styles.title}>Pago procesado</Text>
      <Text style={styles.subTitle}>Tu pago se ha confirmado con éxito</Text>
      <Link href={"/"} asChild>
        <Pressable onPress={() => {}}>
          {({ pressed }) => (
            <Text style={[styles.textButton, { opacity: pressed ? 0.1 : 1 }]}>
              Finalizar
            </Text>
          )}
        </Pressable>
      </Link>
    </View>
  );
};

export default paymentMadeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "Mulish",
    fontWeight: "700",
    color: "#002859",
    lineHeight: 25,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: "Mulish",
    fontWeight: "400",
    color: "#758192",
    lineHeight: 18,
  },

  textButton: {
    fontSize: 16,
    fontFamily: "Mulish",
    fontWeight: "600",
    color: "#035AC5",
    lineHeight: 20,
    marginTop: 16,
  },
});
