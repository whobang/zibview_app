import React from 'react';
import { View } from 'react-native';
import {GripVertical} from "lucide-react-native";
import Text from "@/components/Text";
import { timeForToday } from '@/utils/dateUtils';

const Comment = () => {
  return (
    <View className="m-2 pb-2 border-b border-b-slate-300">
      <View className="flex-row justify-between items-center mb-1">
        <Text textStyle="text-gray-500">
          {timeForToday(new Date("2017-02-11"))}
        </Text>
        <GripVertical size={20} color="#ababab" className="pr-10" />
      </View>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium est, nesciunt recusandae nobis obcaecati nihil qui animi, a reprehenderit numquam ratione minima eveniet laudantium laborum? Quam nulla dolorum totam optio!</Text>
    </View>
  );
};

export default Comment;
