import React, { useState } from "react";
import { StyleSheet, Pressable, Text, View, Alert } from "react-native";

import DatePicker from "react-native-date-picker";

type Props = {
  onDateChange: (startDate: Date, endDate: Date) => void;
  residencyStartDate: Date;
  residencyEndDate: Date;
};

const Residency = ({
  onDateChange,
  residencyStartDate,
  residencyEndDate,
}: Props) => {
  // state
  const [startDate, setStartDate] = useState(residencyStartDate);
  const [openStart, setOpenStart] = useState(false);
  const [endDate, setEndDate] = useState(residencyEndDate);
  const [openEnd, setOpenEnd] = useState(false);

  const startDateConfirmHandler = (date: Date) => {
    setOpenStart(false);
    if (date > endDate) {
      Alert.alert("시작일은 종료일보다 이전이어야 합니다.");
      return;
    }

    setStartDate(date);
    onDateChange(date, endDate);
  };

  const endDateConfirmHandler = (date: Date) => {
    setOpenEnd(false);
    if (date < startDate) {
      Alert.alert("종료일은 시작일보다 이후여야 합니다.");
      return;
    }

    setEndDate(date);
    onDateChange(startDate, date);
  };

  // view
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => setOpenStart(true)}
      >
        <Text>{startDate.getFullYear()}년 </Text>
        <Text>{startDate.getMonth() + 1}월 </Text>
        <Text>{startDate.getDate()}일</Text>
      </Pressable>
      <View style={styles.tildeContainer}>
        <Text style={styles.tilde}>~</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => setOpenEnd(true)}
      >
        <Text>{endDate.getFullYear()}년 </Text>
        <Text>{endDate.getMonth() + 1}월 </Text>
        <Text>{endDate.getDate()}일</Text>
      </Pressable>

      <DatePicker
        modal
        title="거주 시작일"
        open={openStart}
        date={startDate}
        mode="date"
        locale="ko"
        onConfirm={startDateConfirmHandler}
        onCancel={() => setOpenStart(false)}
      />
      <DatePicker
        modal
        title="거주 종료일"
        open={openEnd}
        date={endDate}
        mode="date"
        locale="ko"
        onConfirm={endDateConfirmHandler}
        onCancel={() => setOpenEnd(false)}
      />
    </View>
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
