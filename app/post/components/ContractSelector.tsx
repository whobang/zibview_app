import React, { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import UnderlineTextInput from "../../../components/common/UnderlineTextInput";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { RentType, contractInfoSchema, postSchema } from "@/types/post/type";

export type ContractPrice = {
  deposit: string | undefined;
  monthlyFee: string | undefined;
  maintenanceFee: string | undefined;
};

const defaultValue = {
  deposit: undefined,
  monthlyFee: undefined,
  maintenanceFee: undefined,
};

const rental = {
  DEPOSIT: "전세",
  MONTHLY: "월세",
  MIXED: "반전세",
};

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  names: Path<T>[];
};

const ContractSelector = <T extends FieldValues>({
  control,
  names,
}: Props<T>) => {
  // state
  const [rentType, setRentType] = React.useState<RentType>("DEPOSIT");
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
  };

  // Input Field Component
  const inputField = (
    control: Control<T, any>,
    name: Path<T>,
    label: string,
    value: string | undefined,
    key: keyof ContractPrice
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label} className="font-jregular text-base">
        {label}
      </Text>
      <View style={styles.inputInnerContainer}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange } }) => {
            return (
              <UnderlineTextInput
                placeholder={label}
                value={value}
                onChangeText={(text) => {
                  handlePriceChange({ [key]: text });
                  onChange(Number(text));
                }}
              />
            );
          }}
        />
      </View>
      <Text style={styles.won} className="font-jregular text-base">
        만원
      </Text>
    </View>
  );

  // button components
  const buttons = Object.keys(rental).map((key) => {
    return (
      <Controller
        control={control}
        name={names[3]}
        render={({ field: { onChange } }) => {
          return (
            <Pressable
              key={key}
              onPress={() => {
                handleRentType(key as RentType);
                onChange(key);
              }}
              className={`w-1/3 p-2 border-2 border-b-0 border-primary rounded-t-lg ${
                rentType === key ? "bg-primary" : ""
              }`}
            >
              <Text
                className={`text-center text-base font-jregular ${
                  rentType === key ? "text-white" : ""
                }`}
              >
                {rental[key as RentType]}
              </Text>
            </Pressable>
          );
        }}
      />
    );
  });

  // view
  return (
    <>
      <View style={styles.buttonContainer}>{buttons}</View>
      <View style={styles.innerContainer} className="border-2 border-primary">
        {inputField(
          control,
          names[0],
          `${rental[rentType]} 보증금`,
          contractPrice.deposit,
          "deposit"
        )}
        {rentType !== "DEPOSIT" &&
          inputField(
            control,
            names[1],
            "월세",
            contractPrice.monthlyFee,
            "monthlyFee"
          )}
        {inputField(
          control,
          names[2],
          "관리비",
          contractPrice.maintenanceFee,
          "maintenanceFee"
        )}
      </View>
    </>
  );
};

export default ContractSelector;

const styles = StyleSheet.create({
  innerContainer: {
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
