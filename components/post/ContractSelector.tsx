import React from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";

type RentType = "DepositRent" | "MonthlyRent" | "MixedRent"; // 전제, 월세, 반전세

const rental = {
  DepositRent: "전세",
  MonthlyRent: "월세",
  MixedRent: "반전세",
};

const ContractSelector = () => {
  // state
  const [rentType, setRentType] = React.useState<RentType>("DepositRent");

  // button components
  const buttons = Object.keys(rental).map((key) => {
    return (
      <Pressable
        onPress={() => setRentType(key as RentType)}
        style={[styles.button, rentType === key && styles.buttonSelected]}
      >
        <Text
          style={[
            styles.buttonText,
            rentType === key && styles.buttonTextSelected,
          ]}
        >
          {rental[key as RentType]}
        </Text>
      </Pressable>
    );
  });

  // view
  return (
    <View>
      <View style={styles.buttonContainer}>{buttons}</View>
      <View>
        <Text>전세 보증금</Text>
        <Text>월세 가격</Text>
        <Text>관리비</Text>
      </View>
    </View>
  );
};

export default ContractSelector;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonSelected: {
    borderColor: "#22c55e",
    opacity: 1,
    borderWidth: 2,
  },
  button: {
    width: "30%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#000",
    opacity: 0.4,
  },
  buttonTextSelected: {
    color: "#22c55e",
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
  },
});
