import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import Logo from "../../assets/ballance.png";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { setSites } from "../../store/features/siteSlice";
const TabsLayout = () => {
  const site = useSelector((state) => state.site.sites);
  const dispatch = useDispatch();
  const onChangeSitePress = () => {
    dispatch(setSites(null));
    router.replace("/");
  };
  return (
    <SafeAreaView className="h-full bg-b-mid-blue w-screen items-center justify-start flex-1">
      <View className="w-full px-10 items-center justify-between   flex-row">
        <View className="w-[100px] h-[100px]  ">
          <Image source={Logo} resizeMode="contain" />
        </View>
        <View className="flex-row items-center justify-center">
          <Text className="mr-1 text-white font-pregular text-[16px]">
            Site:
          </Text>
          <Pressable onPress={onChangeSitePress}>
            <Text className="underline capitalize text-white font-psemibold text-[16px]">
              {site}
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="items-center justify-center  bg-white w-screen  rounded-[48px] h-full"></View>
    </SafeAreaView>
  );
};

export default TabsLayout;
