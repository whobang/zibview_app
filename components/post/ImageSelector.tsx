import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { memo, useState } from "react";
import {
  Pressable,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

interface ImageType extends ImagePicker.ImagePickerAsset {
  uuid: string;
}

type Props = {
  onImageChange: (imageUuids: string[]) => void;
};

const ImageSelector = ({ onImageChange }: Props) => {
  // state
  const [images, setImages] = useState<ImageType[]>([]);

  // hooks
  const axiosPrivate = useAxiosPrivate();

  // 이미지 추가
  const addImage = async () => {
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

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => {
        return { ...asset, uuid: uuid.v4() as string };
      });

      setImages((prevState) => [...prevState, ...newImages]);
      imageHandler(newImages);
      uploadImage(createFormData(newImages));
    }
  };

  // 이미지 삭제
  const removeImage = (uuid: string) => {
    const leftImages = images.filter((image) => image.uuid !== uuid);
    setImages(leftImages);
    imageHandler(leftImages);
  };

  // props로 전달받은 onImageChange 핸들러
  const imageHandler = (images: ImageType[]) => {
    onImageChange(images.map((image) => image.uuid));
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
      formData.append(`images[${index}].image`, {
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
        type: image.mimeType,
        name: image.fileName,
      });
    });
    return formData;
  };

  // 이미지 업로드
  const uploadImage = async (formData: FormData) => {
    axiosPrivate
      .post("/api/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ columnGap: 10, paddingVertical: 5 }}
    >
      <Pressable onPress={addImage}>
        <View
          style={{
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            borderRadius: 10,
            borderColor: "#6b7280",
          }}
        >
          <AntDesign name="camera" size={25} color="#6b7280" />
          <Text>
            <Text style={{ color: "#f87171" }}>{images.length}</Text>/10
          </Text>
        </View>
      </Pressable>

      {images.map((image) => {
        return (
          <View key={image.uuid}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <Pressable
              onPress={() => removeImage(image.uuid)}
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
    </ScrollView>
  );
};

export default memo(ImageSelector);

const styles = StyleSheet.create({
  image: {
    width: 59,
    height: 59,
    borderRadius: 10,
  },
});

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
