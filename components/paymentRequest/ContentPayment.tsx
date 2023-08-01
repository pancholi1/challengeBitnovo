import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ModalCountries } from "../ModalCountries";
import SendPayament from "./SendPayment/SendPayament";
interface PropsPayment {
  identifier: string;
  short_identifier: string;
  fiat_amount: number;
  fiat: string;
  language: string;
  web_url: string;
}
interface PropsContentPayment {
  data: PropsPayment | undefined;
}
interface PropsAreas {
  code: string;
  item: string;
  callingCode: string;
  flag: string;
}
const ContentPayment = ({ data }: PropsContentPayment) => {
  const params = useLocalSearchParams();
  const { payment, fiat } = params;
  const [email, setEmail] = useState("");
  const [emailIncorrect, setEmailInCorrect] = useState(false);
  const [requestCorrect, setRequestCorrect] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [areas, setAreas] = useState<PropsAreas[]>([]);
  const [selectedArea, setSelectedArea] = useState<PropsAreas>();
  const [isWsp, setIsWsp] = useState(false);
  const [numberWsp, setNumberWsp] = useState("");

  const functionSendEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      const subject = "Solicutd de pago";
      const body = `Bitnovo Test  te esta solicitando un pago de  ${payment} ${fiat}. Puedes pagar con criptomonedas en el siguiente enlace:  ${data?.web_url}`;
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      Linking.openURL(mailtoUrl)
        .then((response) => {
          response && setRequestCorrect(true);
        })
        .catch((err) =>
          console.error("Error al abrir el cliente de correo electrónico:", err)
        );
    } else {
      setEmailInCorrect(true);
    }
  };
  const functionSendWsp = async () => {
    const msg = `Bitnovo Test  te esta solicitando un pago de  ${payment} ${fiat}. Puedes pagar con criptomonedas en el siguiente enlace:  ${data?.web_url}`;
    const fullNumber = selectedArea?.callingCode + numberWsp;
    const url = "whatsapp://send?text=" + msg + "&phone=" + fullNumber;
    Linking.openURL(url)
      .then((response) => {
        setRequestCorrect(true);
      })
      .catch((err) => console.error("Error al abrir el wsp:", err));
  };

  useEffect(() => {
    const createWebSocket = () => {
      const socketURL = `wss://payments.smsdata.com/ws/merchant/${data?.identifier}`;
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
  }, [data?.identifier]);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        let areaData: PropsAreas[] = data.map((e: any) => {
          return {
            code: e.alpha2Code,
            item: e.name,
            callingCode: `+${e.callingCodes[0]}`,
            flag: e.flags.png,
          };
        });
        setAreas(areaData);
        if (areaData.length > 0) {
          let defaultData = areaData.filter((a) => a.code == "US");
          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  return (
    <View
      style={[
        styles.containerContent,
        isModal
          ? {
              backgroundColor: "#ebeff0",
              opacity: 0.1,
              borderWidth: 1,
              borderColor: "#dae0f2",
            }
          : {},
      ]}
    >
      <SendPayament requestCorrect={requestCorrect}></SendPayament>
      <View style={styles.twoRequestContainer}>
        <Pressable
          onPress={() => {
            Linking.openURL(`${data?.web_url}`);
          }}
          style={styles.requestSubContainer}
        >
          <Image source={require("../../assets/images/quads.png")}></Image>
          <Text style={styles.requestText}>{data?.web_url}</Text>
        </Pressable>
        <Link
          href={{
            pathname: "/qrRequest",
            params: {
              fiat_amount: payment ?? "",
              url: data?.web_url ?? "",
              fiat: data?.fiat ?? "",
              identifier: data?.identifier ?? "",
            },
          }}
        >
          <View>
            <Image source={require("../../assets/images/qrButton.png")} />
          </View>
        </Link>
      </View>
      <View style={styles.requestContainer}>
        <Image source={require("../../assets/images/sms.png")}></Image>
        <TextInput
          style={[
            {
              height: 50,
              flex: 1,
            },
            styles.requestText,
          ]}
          onChangeText={setEmail}
          value={email}
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
      </View>
      {email !== "" && emailIncorrect && !requestCorrect && (
        <Text style={styles.textButtonIncorrect}>
          El correo electrónico no es válido.
        </Text>
      )}

      {!isWsp ? (
        <Pressable
          onPress={() => {
            setIsWsp(true);
          }}
          style={styles.requestContainer}
        >
          <Image source={require("../../assets/images/whatsapp.png")}></Image>
          <Text style={styles.requestText}>Enviar a número de WhatsApp</Text>
        </Pressable>
      ) : (
        <View style={styles.requestContainer}>
          <TouchableOpacity
            style={{
              height: 50,
              flexDirection: "row",
            }}
            onPress={() => setIsModal(true)}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={require("../../assets/images/whatsapp.png")}
              ></Image>
            </View>
            <View style={{ justifyContent: "center", marginLeft: 3 }}>
              <Text
                style={{
                  color: "#111",
                  fontSize: 16,
                }}
              >
                {selectedArea?.callingCode}
              </Text>
            </View>
            <View style={{ justifyContent: "center", marginLeft: 3 }}>
              <Image
                source={require("../../assets/images/arrowDown.png")}
              ></Image>
            </View>
          </TouchableOpacity>
          <TextInput
            style={[
              {
                flex: 1,
                borderBottomColor: "#111",
                borderBottomWidth: 1,
                height: 50,
              },
              styles.requestText,
            ]}
            onChangeText={setNumberWsp}
            placeholder="Enter your phone number"
            placeholderTextColor={"#111"}
            selectionColor={"#111"}
            keyboardType="numeric"
          />
          <Pressable style={styles.pressableSend} onPress={functionSendWsp}>
            {({ pressed }) => (
              <Text style={[styles.textButton, { opacity: pressed ? 0.1 : 1 }]}>
                Enviar
              </Text>
            )}
          </Pressable>
        </View>
      )}
      {isModal && areas && (
        <ModalCountries
          isModalVisible={isModal}
          setIsModalVisible={setIsModal}
          setSelectedArea={setSelectedArea}
          areas={areas}
        ></ModalCountries>
      )}
    </View>
  );
};

export default ContentPayment;

const styles = StyleSheet.create({
  focusedBorder: {
    borderColor: "blue", // Color del borde cuando el TextInput está enfocado
  },

  containerContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  twoRequestContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 8,
    height: 56,
    marginVertical: 16,
  },

  requestSubContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#D3DCE6",
    height: 56,
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
    fontSize: 14,
    fontFamily: "Mulish",
    fontWeight: "500",
    color: "red",
    lineHeight: 20,
    marginBottom: 15,
  },
});
