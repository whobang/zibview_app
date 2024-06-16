import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Text from './Text';

const NoImage = () => {
  return (
    <View className='w-full'>
      <LinearGradient
      className='h-full rounded-lg justify-center items-center'
        colors={['#ff7e5f', '#feb47b', '#86A8E7', '#7F7FD5', '#91EAE4']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        
      >
        <View className='w-3/4 rounded-md py-2 inset-0 bg-white/20'>
          <Text textStyle='text-xl text-white text-center'>등록된 이미지가 없습니다.</Text>
          <Text textStyle='text-base text-white text-center'>첫 후기를 등록해주세요.</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

export default NoImage;

