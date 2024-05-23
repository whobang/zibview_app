import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StyleSheet, Pressable, Text, View, Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { Incubator } from "react-native-ui-lib";

const { Toast } = Incubator;

type Toast = {
  visible: boolean;
  message?: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>[];
  control: Control<T, any>;
  contractStartDate: Date;
  contractEndDate: Date;
};

const Residency = <T extends FieldValues>({
  name,
  control,
  contractStartDate,
  contractEndDate,
}: Props<T>) => {
  // state
  const [toast, setToast] = useState<Toast>({ visible: false });
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const startDateConfirmHandler = (
    startDate: Date,
    onChange: (...event: any[]) => void
  ) => {
    setOpenStart(false);
    if (startDate > contractEndDate) {
      setToast({
        visible: true,
        message: "종료일보다 이전이어야 합니다.",
      });
      return;
    }
    onChange(startDate);
  };

  const endDateConfirmHandler = (
    endDate: Date,
    onChange: (...event: any[]) => void
  ) => {
    setOpenEnd(false);
    if (endDate < contractStartDate) {
      setToast({
        visible: true,
        message: "시작일보다 이후여야 합니다.",
      });
      return;
    }
    onChange(endDate);
  };

  // view
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => setOpenStart(true)}
        >
          <Text>{contractStartDate.getFullYear()}년 </Text>
          <Text>{contractStartDate.getMonth() + 1}월 </Text>
          <Text>{contractStartDate.getDate()}일</Text>
        </Pressable>
        <View style={styles.tildeContainer}>
          <Text style={styles.tilde}>~</Text>
        </View>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => setOpenEnd(true)}
        >
          <Text>{contractEndDate.getFullYear()}년 </Text>
          <Text>{contractEndDate.getMonth() + 1}월 </Text>
          <Text>{contractEndDate.getDate()}일</Text>
        </Pressable>

        <Controller
          control={control}
          name={name[0]}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              modal
              title="거주 시작일"
              open={openStart}
              date={value}
              mode="date"
              locale="ko"
              onConfirm={(date) => startDateConfirmHandler(date, onChange)}
              onCancel={() => setOpenStart(false)}
            />
          )}
        />

        <Controller
          control={control}
          name={name[1]}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              modal
              title="거주 종료일"
              open={openEnd}
              date={value}
              mode="date"
              locale="ko"
              onConfirm={(date) => endDateConfirmHandler(date, onChange)}
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
