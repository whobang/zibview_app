import React, { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import UnderlineTextInput from "../common/UnderlineTextInput";

type RentType = "DepositRent" | "MonthlyRent" | "MixedRent"; // 전제, 월세, 반전세

export type ContractPrice = {
  deposit: string | undefined;
  monthly: string | undefined;
  management: string | undefined;
};

const defaultValue = {
  deposit: undefined,
  monthly: undefined,
  management: undefined,
};

const rental = {
  DepositRent: "전세",
  MonthlyRent: "월세",
  MixedRent: "반전세",
};

type Props = {
  onContractPriceChange: (contractPrice: ContractPrice) => void;
};

const ContractSelector = ({ onContractPriceChange }: Props) => {
  // state
  const [rentType, setRentType] = React.useState<RentType>("DepositRent");
  const [contractPrice, setContractPrice] =
    useState<ContractPrice>(defaultValue);

  // 임대차 계약 버튼 핸들러
  const handleRentType = (type: RentType) => {
    setRentType(type);
    setContractPrice(defaultValue);
  };

  // 계약 금액 변경 핸들러
  const handlePriceChange = (newPrice: Partial<ContractPrice>) => {
    const updatedContractPrice = { ...contractPrice, ...newPrice };
    setContractPrice(updatedContractPrice);
    onContractPriceChange(updatedContractPrice);
  };

  // button components
  const buttons = Object.keys(rental).map((key) => {
    return (
      <Pressable
        key={key}
        onPress={() => handleRentType(key as RentType)}
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
    <>
      <View style={styles.buttonContainer}>{buttons}</View>
      <View style={styles.innerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{rental[rentType]} 보증금</Text>
          <View style={styles.inputInnerContainer}>
            <UnderlineTextInput
              placeholder={`${rental[rentType]} 보증금`}
              value={contractPrice.deposit}
              onChangeText={(deposit) => handlePriceChange({ deposit })}
            />
          </View>
          <Text style={styles.won}>만원</Text>
        </View>
        {rentType !== "DepositRent" && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>월세</Text>
            <View style={styles.inputInnerContainer}>
              <UnderlineTextInput
                placeholder="월세"
                value={contractPrice.monthly}
                onChangeText={(monthly) => handlePriceChange({ monthly })}
              />
            </View>
            <Text style={styles.won}>만원</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>관리비</Text>
          <View style={styles.inputInnerContainer}>
            <UnderlineTextInput
              placeholder="관리비"
              value={contractPrice.management}
              onChangeText={(management) => handlePriceChange({ management })}
            />
          </View>
          <Text style={styles.won}>만원</Text>
        </View>
      </View>
    </>
  );
};

export default ContractSelector;

const styles = StyleSheet.create({
  innerContainer: {
    borderWidth: 2,
    borderColor: "#22c55e",
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonSelected: {
    borderColor: "#22c55e",
    opacity: 1,
    borderWidth: 2,
    borderBottomWidth: 2,
    bottom: -2,
  },
  button: {
    width: "30%",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontWeight: "bold",
    borderWidth: 2,
    borderBottomWidth: 0,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputInnerContainer: {
    flex: 3,
  },
  label: {
    flex: 2,
    paddingLeft: 10,
  },
  won: {
    flex: 1,
  },
});
