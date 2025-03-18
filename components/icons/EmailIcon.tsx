import { Colors } from "@/constants/Colors";
import React from "react";
import Svg, { G, Path, Rect, Defs, ClipPath } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const EmailIcon = ({
  width = 28,
  height = 28,
  color = Colors.dark.text,
}: IconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clipPath="url(#clip0_429_11225)">
        <Path
          d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 5L12 14L21 5"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_429_11225">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default EmailIcon;
