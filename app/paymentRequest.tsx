import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Share,
  Alert,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { ContentPayment } from "../components/paymentRequest";

interface PropsPayment {
  identifier: string;
  short_identifier: string;
  fiat_amount: number;
  fiat: string;
  language: string;
  web_url: string;
}
const paymentRequestScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { payment, fiat } = params;
  const [data, setData] = useState<PropsPayment>();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const goTogateWay = () => {
    data?.web_url && Linking.openURL(data?.web_url);
  };

  useEffect(() => {
    const apiUrl = "https://payments.smsdata.com/api/v1/orders/";
    const postData = {
      expected_output_amount: payment,
      merchant_urlko: "https://www.google.com/?hl=es",
      merchant_url_standby: "https://www.google.com/?hl=es",
      merchant_urlok: "https://www.google.com/?hl=es",
      fiat: fiat,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": "5bbbc670-de9b-431a-9751-ec5bf9dd8c3e", // Tipo de contenido del body
      },
      body: JSON.stringify(postData), // Convertir los datos a JSON
    })
      .then((response) => response.json())
      .then((data: PropsPayment) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <ContentPayment data={data} />
      <View style={styles.containerButtons}>
        <Link href={"/"} asChild>
          <Pressable style={styles.pressableButton} onPress={goTogateWay}>
            {({ pressed }) => (
              <View style={styles.contentButton}>
                <Text
                  style={[styles.textButton, { opacity: pressed ? 0.1 : 1 }]}
                >
                  Ir a la pasarela
                </Text>
                <Image
                  style={{ opacity: pressed ? 0.1 : 1 }}
                  source={require("../assets/images/arrowRight.png")}
                ></Image>
              </View>
            )}
          </Pressable>
        </Link>
        <Pressable style={styles.pressableButtonShared} onPress={onShare}>
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
                source={require("../assets/images/downloadButton.png")}
              ></Image>
            </View>
          )}
        </Pressable>
        <Pressable style={styles.onlyTextButto} onPress={router.back}>
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

export default paymentRequestScreen;

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
