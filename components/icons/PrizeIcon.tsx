import { Colors } from "@/constants/Colors";
import React from "react";
import Svg, { G, Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const PrizeIcon = ({
  width = 24,
  height = 24,
  color = Colors.secondary,
}: IconProps) => {
  return (
    <Svg
      fill={color}
      height={height}
      width={width}
      id="XMLID_144_"
      viewBox="0 0 24 24"
    >
      <G id="trophy">
        <G>
          <Path
            d="M20,24H4v-6h2.1c0.2-1.3,0.9-2.5,1.8-3.3C7,14,6.2,13.1,5.7,12H5c-2.9,0-5-2-5-4.7V2h5V0h14v2h5v5.3c0,2.7-2.1,4.7-5,4.7
			h-0.7c-0.5,1-1.2,1.9-2.2,2.6c1,0.9,1.6,2.1,1.8,3.4h2v6H20z M6,22h12v-2H6V22z M8.1,18h7.8c-0.3-1-0.9-1.8-1.7-2.4
			c-1.4,0.5-3,0.5-4.4,0C9,16.2,8.4,17,8.1,18z M7,2v7c0,2.8,2.2,5,5,5s5-2.2,5-5V2H7z M18.9,10L18.9,10c1.8,0,3.1-1.1,3.1-2.7V4h-3
			v5C19,9.3,19,9.7,18.9,10z M2,4v3.3C2,8.9,3.3,10,5,10h0.1C5.1,9.7,5,9.3,5,9V4H2z"
          />
        </G>
      </G>
    </Svg>
  );
};

export default PrizeIcon;
