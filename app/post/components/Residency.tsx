import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Incubator } from "react-native-ui-lib";

const { Toast } = Incubator;

type Toast = {
  visible: boolean;
  message?: string;
};

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>[];
  contractStartDate: Date;
  contractEndDate: Date;
};

const Residency = <T extends FieldValues>({
  control,
  name,
  contractStartDate,
  contractEndDate,
}: Props<T>) => {
  // state
  const [toast, setToast] = useState<Toast>({ visible: false });
  const [startDate, setStartDate] = useState(contractStartDate);
  const [openStart, setOpenStart] = useState(false);
  const [endDate, setEndDate] = useState(contractEndDate);
  const [openEnd, setOpenEnd] = useState(false);

  const startDateConfirmHandler = (startDate: Date) => {
    setOpenStart(false);
    if (startDate > endDate) {
      setToast({
        visible: true,
        message: "종료일보다 이전이어야 합니다.",
      });
      return;
    }
    setStartDate(startDate);
  };

  const endDateConfirmHandler = (endDate: Date) => {
    setOpenEnd(false);
    if (endDate < startDate) {
      setToast({
        visible: true,
        message: "시작일보다 이후여야 합니다.",
      });
      return;
    }
    setEndDate(endDate);
  };

  // view
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          className="flex-1 flex-row justify-center items-center rounded-md p-3 bg-primary"
          onPress={() => setOpenStart(true)}
        >
          <Text className="text-white font-jregular">
            {startDate.getFullYear()}년{" "}
          </Text>
          <Text className="text-white font-jregular">
            {startDate.getMonth() + 1}월{" "}
          </Text>
          <Text className="text-white font-jregular">
            {startDate.getDate()}일
          </Text>
        </TouchableOpacity>
        <View style={styles.tildeContainer}>
          <Text style={styles.tilde}>~</Text>
        </View>
        <TouchableOpacity
          className="flex-1 flex-row justify-center items-center rounded-md p-3 bg-primary"
          onPress={() => setOpenEnd(true)}
        >
          <Text className="text-white font-jregular">
            {endDate.getFullYear()}년{" "}
          </Text>
          <Text className="text-white font-jregular">
            {endDate.getMonth() + 1}월{" "}
          </Text>
          <Text className="text-white font-jregular">
            {endDate.getDate()}일
          </Text>
        </TouchableOpacity>

        <Controller
          control={control}
          name={name[0]}
          render={({ field: { onChange } }) => (
            <DatePicker
              modal
              title="거주 시작일"
              open={openStart}
              date={contractStartDate}
              mode="date"
              locale="ko"
              onConfirm={(date) => {
                startDateConfirmHandler(date);
                onChange(date);
              }}
              onCancel={() => setOpenStart(false)}
            />
          )}
        />

        <Controller
          control={control}
          name={name[1]}
          render={({ field: { onChange } }) => (
            <DatePicker
              modal
              title="거주 종료일"
              open={openEnd}
              date={contractEndDate}
              mode="date"
              locale="ko"
              onConfirm={(date) => {
                endDateConfirmHandler(date);
                onChange(date);
              }}
              onCancel={() => setOpenEnd(false)}
            />
          )}
        />
      </View>
      <Toast
        visible={toast.visible}
        position="top"
        message={toast.message}
        preset="failure"
        swipeable
        autoDismiss={5000}
        enableHapticFeedback
        onDismiss={() => setToast({ visible: false, message: "" })}
      />
    </>
  );
};

export default Residency;

const styles = StyleSheet.create({
  container: { flexDirection: "row", columnGap: 10 },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.5,
  },
  tildeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tilde: {
    fontSize: 20,
  },
});
