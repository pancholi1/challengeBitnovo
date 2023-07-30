import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { ContentPayment } from "@/components/paymentRequest";

interface PropsRequest {
  payment: number;
}
const paymentRequest = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const apiUrl = "https://payments.smsdata.com/api/v1/orders/";
    const postData = {
      // Datos que deseas enviar en el body del POST
      expected_output_amount: 123123,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": "5bbbc670-de9b-431a-9751-ec5bf9dd8c3e", // Tipo de contenido del body
      },
      body: JSON.stringify(postData), // Convertir los datos a JSON
    })
      .then((response) => {
        console.log(response);
      })
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <ContentPayment />
      <View style={styles.containerButtons}>
        <Link href={"/paymentRequest/paymentRequest"} asChild>
          <Pressable style={styles.pressableButton}>
            {({ pressed }) => (
              <View style={styles.contentButton}>
                <Text
                  style={[styles.textButton, { opacity: pressed ? 0.1 : 1 }]}
                >
                  Ir a la pasarela
                </Text>
                <Image
                  style={{ opacity: pressed ? 0.1 : 1 }}
                  source={require("../../assets/images/arrowRight.png")}
                ></Image>
              </View>
            )}
          </Pressable>
        </Link>
        <Pressable style={styles.pressableButtonShared} onPress={() => {}}>
          {({ pressed }) => (
            <View style={styles.contentButton}>
              <Text
                style={[
                  styles.textButtonShared,
                  { opacity: pressed ? 0.1 : 1 },
                ]}
              >
                Compartir
              </Text>
              <Image
                style={{ opacity: pressed ? 0.1 : 1 }}
                source={require("../../assets/images/downloadButton.png")}
              ></Image>
            </View>
          )}
        </Pressable>
        <Pressable style={styles.onlyTextButto}>
          {({ pressed }) => (
            <Text
              style={[styles.textButtonShared, { opacity: pressed ? 0.1 : 1 }]}
            >
              Solicitar nuevo pago
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default paymentRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 18,
    width: "100%",
  },

  containerButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 40,
  },
  contentButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  pressableButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
  pressableButtonShared: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 18,
    borderWidth: 1,
    borderColor: "#035AC5",
    borderRadius: 6,
  },
  textButtonShared: {
    fontSize: 16,
    fontFamily: "Mulish",
    fontWeight: "600",
    color: "#035AC5",
    lineHeight: 20,
  },
  onlyTextButto: {
    margin: 16,
  },
});
