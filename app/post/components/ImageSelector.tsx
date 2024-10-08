import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { AxiosError } from "axios";

interface ImageType extends ImagePicker.ImagePickerAsset {
  representation: boolean;
  uuid: string;
}

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  name: Path<T>;
};

const ImageSelector = <T extends FieldValues>({ control, name }: Props<T>) => {
  // state
  const [images, setImages] = useState<ImageType[]>([]);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // hooks
  const axiosPrivate = useAxiosPrivate();

  // 이미지 추가
  const addImage = async (onChange: (value: string[]) => void) => {
    setIsImageUploading(true);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      orderedSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
      exif: true,
    });

    if (result.assets && 10 - images.length < result.assets.length) {
      alert("이미지는 최대 10개까지 선택할 수 있습니다.");
      return;
    }

    if (result.canceled) {
      setIsImageUploading(false);
      return;
    }

    const newImages = result.assets.map((asset) => {
      return {
        ...asset,
        uuid: uuid.v4().toString(),
        representation: false,
      };
    });

    // 이미지 업로드
    axiosPrivate
      .post("/api/images", createFormData(newImages), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setImages((prevState) => [...prevState, ...newImages]);
        onChange([
          ...images.map((image) => image.uuid),
          ...newImages.map((image) => image.uuid),
        ]);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status !== 500) {
          Alert.alert(
            "이미지 업로드에 실패했습니다. 파일 용량이 너무 큽니다. 파일 당 10MB, 최대 5MB까지 업로드 가능합니다."
          );
        }
      });

    setIsImageUploading(false);
  };

  // 이미지 삭제
  const removeImage = (uuid: string, onChange: (uuids: string[]) => void) => {
    axiosPrivate.delete(`/api/images/${uuid}`).then(({ status }) => {
      if (status === 403) {
        Alert.alert("권한이 없습니다.");
      } else {
        const leftImages = images.filter((image) => image.uuid !== uuid);
        setImages(leftImages);
        onChange(leftImages.map((image) => image.uuid));
      }
    });
  };

  // FormData 생성
  const createFormData = (images: ImageType[]) => {
    const formData = new FormData();
    images.forEach(async (image, index) => {
      formData.append(`images[${index}].uuid`, image.uuid);
      formData.append(
        `images[${index}].dateTimeOriginal`,
        image.exif?.DateTimeOriginal
      );
      formData.append(`images[${index}].latitudeGPS`, image.exif?.GPSLongitude);
      formData.append(`images[${index}].longitudeGPS`, image.exif?.GPSLatitude);
      // @ts-ignore
      formData.append(`images[${index}].image`, {
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
        type: image.mimeType,
        name: image.fileName,
      });
    });
    return formData;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => {
        return (
          <ScrollView
            horizontal
            contentContainerStyle={{
              columnGap: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                addImage(onChange);
              }}
            >
              <View className="border-2 justify-center items-center w-16 h-16 rounded-lg border-primary">
                <AntDesign name="camera" size={25} color="#6b7280" />
                <Text>
                  <Text style={{ color: "#f87171" }}>{images.length}</Text>/10
                </Text>
              </View>
            </Pressable>

            {images.map((image, index) => {
              return (
                <View key={image.uuid}>
                  <Image
                    source={{ uri: image.uri }}
                    className="w-16 h-16 rounded-lg border-2 border-primary"
                  />
                  {index === 0 && (
                    <View className="absolute bottom-0 rounded-full w-full bg-primary">
                      <Text className="text-xs text-center  text-white font-jregular">
                        대표 이미지
                      </Text>
                    </View>
                  )}
                  <Pressable
                    onPress={() => removeImage(image.uuid, onChange)}
                    style={{
                      position: "absolute",
                      right: 0,
                      transform: [{ translateY: -5 }, { translateX: 5 }],
                    }}
                  >
                    <CloseIcon />
                  </Pressable>
                </View>
              );
            })}
            {isImageUploading && <ActivityIndicator color="#FF9C01" />}
          </ScrollView>
        );
      }}
    />
  );
};

export default ImageSelector;

const CloseIcon = () => {
  return (
    <View>
      <FontAwesome name="circle" size={17} style={{ position: "absolute" }} />
      <AntDesign
        name="closecircleo"
        size={16}
        style={{ zIndex: 1000 }}
        color="white"
      />
    </View>
  );
};
