import React from "react";
import { View, Text, Button } from "react-native";
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView,
  } from "react-native-gesture-handler";

const Overlay = (props) => {
    const handler = Gesture.Pan()
    .runOnJS()
    .onTouchesDown((e) => {
        if(e.numberOfTouches == 2){
            console.log("two fingers down");
        }
        console.log("pan gesture down", e);
    })

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={handler}>
        <View
          className="bg-gray-400 w-[98vw] h-10 mx-auto mt-7 rounded-2xl shadow-md"
          onPress={console.log("weewoo")}
        />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Overlay;
