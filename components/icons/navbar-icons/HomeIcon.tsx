import { Colors } from "@/constants/Colors";
import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
}

const HomeIcon = ({
  width = 28,
  height = 28,
  color = Colors.secondary
}: IconProps) => {
  return (
    <Svg
      fill="#000000"
      width={width}
      height={height}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        d="M33,19a1,1,0,0,1-.71-.29L18,4.41,3.71,18.71a1,1,0,0,1-1.41-1.41l15-15a1,1,0,0,1,1.41,0l15,15A1,1,0,0,1,33,19Z"
        fill={color}
      ></Path>
      <Path
        d="M18,7.79,6,19.83V32a2,2,0,0,0,2,2h7V24h6V34h7a2,2,0,0,0,2-2V19.76Z"
        fill={color}
      ></Path>
      <Rect x="0" y="0" width="36" height="36" fillOpacity="0" />
    </Svg>
  );
};

export default HomeIcon;
