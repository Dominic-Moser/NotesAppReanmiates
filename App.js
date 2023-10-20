import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, Text, TextInput, Button, Alert, Dimensions } from "react-native";
// import Canvas from "react-native-canvas"; // nah fuck this
import {
  useSharedValue,
  runOnUI,
  runOnJS,
  withTiming,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Svg, { Circle, Path } from "react-native-svg";

const App = () => {
  const svgRef = useRef(null); // reference the currentstroke's svg so we can modify it

  const xPosition = useSharedValue(0); // value for adding the positions to the svg's path
  const yPosition = useSharedValue(0);

  const xPositionPrev = useSharedValue(0); // value of the previous stroke, meant for calculating whether or not -
  const yPositionPrev = useSharedValue(0); // another point should be added to the svg stroke line

  const tempString = useSharedValue("");
  const pathString = useSharedValue(""); // this is the literal string of the current stroke's path

  const strokePositionsArray = useSharedValue([]); // this is the array of svg paths that are tracked and added to when the user lifts the pencil

  const [pathStringState, setPathString] = useState(""); // these are the 'useState' function so I can rerender the function on command
  const [allPathsState, setAllPathsState] = useState([]); // same as above, just for the whole canvas

  const [penWidth, setPenWidth] = useState(1); // this is the width of the pen
  const [penColor, setPenColor] = useState("black"); // this is the color of the pen


  const addPath = (path) => {
    const newPath = {
      path: path,
      color: penColor,
      width: penWidth,
    };
    setAllPathsState([...allPathsState, newPath]);
  };



  const renderCurrentSVGPath = () => {
    pathString.value = createSmoothPath(strokePositionsArray.value);
    setPathString(pathString.value);
  };

  const combinePaths = () => {

  };

  const renderAllSvgPaths = () => {};

  const panGesture = Gesture.Pan()
    .runOnJS(true) // makes it run on the js string so it doesnt continually crash
    .onTouchesDown((e) => {
      // console.log("touches down! -", e);
      xPosition.value = e.allTouches[0].x;
      yPosition.value = e.allTouches[0].y;

    })

    .onTouchesMove((e) => {
      //variables for checking if the positions are too close
      const previousValue = { x: xPosition.value, y: yPosition.value };
      const currentValue = { x: e.allTouches[0].x, y: e.allTouches[0].y };

      //set previous values
      xPositionPrev.value = xPosition.value;
      yPositionPrev.value = yPosition.value;
      //set current values
      xPosition.value = e.allTouches[0].x;
      yPosition.value = e.allTouches[0].y;

      strokePositionsArray.value.push({
        x: e.allTouches[0].x,
        y: e.allTouches[0].y,
      });

      //add the action that renders the svg userStroke here
      renderCurrentSVGPath();
    })
    .onTouchesUp((e) => {
      console.log("touches up! -", e);
      console.log("touches up! -", e.allTouches[0].x, e.allTouches[0].y);
      xPosition.value = e.allTouches[0].x;
      yPosition.value = e.allTouches[0].y;
      strokePositionsArray.value.push({
        x: e.allTouches[0].x,
        y: e.allTouches[0].y,
      });

      //rerender it again with the latest point
      renderCurrentSVGPath();

      //add the path to the array and clear the temp string
      // pathString.value += tempString.value;
      // pathString.value += "HELP ME";
      // console.log(pathString.value);
      // setPathString(pathString.value);
      // strokePositionsArray.value = [];
      // tempString.value = "";

      //empty positions array
      addPath(pathString.value);
      strokePositionsArray.value = [];
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="w-full h-full bg-slate-200">
        <GestureDetector gesture={panGesture}>
          <View className="w-full h-full">
            <Svg ref={svgRef} className="bg-transparentr w-full h-full">
              <Path
                stroke={penColor}
                strokeWidth={penWidth}
                strokeLinejoin="round" // Set line join to roundtha
                strokeLinecap="round" // Set line cap to round
                fill="none"
                d={pathStringState}
              />
            </Svg>
            <Svg className="bg-transparent w-full h-full absolute">
              {allPathsState.map((stroke, index) => {
                return (
                  <Path
                    key={index}
                    stroke={stroke.color}
                    strokeWidth={stroke.width}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    d={stroke.path}
                  />
                );
              })}
            </Svg>
          </View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};
export default App;

//helpers

const createSmoothPath = (points) => {
  if (points.length < 2) {
    return "";
  }

  let path = `M${points[0].x} ${points[0].y}`;
  // let path = ``;

  for (let i = 0; i < points.length - 1; i++) {
    const x1 = points[i].x;
    const y1 = points[i].y;
    const x2 = points[i + 1].x;
    const y2 = points[i + 1].y;
    const xMid = (x1 + x2) / 2;
    const yMid = (y1 + y2) / 2;

    path += ` Q${x1} ${y1}, ${xMid} ${yMid}`;
  }

  return path;
};
