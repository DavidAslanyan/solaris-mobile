import { Colors } from "@/constants/Colors";
import Svg, { Path } from "react-native-svg";


type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const CheckIcon = ({
  width = 28,
  height = 28,
  color = Colors.secondary,
}: IconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CheckIcon;
