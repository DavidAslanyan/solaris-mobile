import { Colors } from "@/constants/Colors";
import Svg, { Path, Rect } from "react-native-svg";


type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const SuccessIcon = ({
  width = 28,
  height = 28,
  color = Colors.primary,
}: IconProps) => {
  return (
    <Svg
      fill={color}
      width={width}
      height={height}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z"></Path>
      <Path
        d="M28,12.1a1,1,0,0,0-1.41,0L15.49,23.15l-6-6A1,1,0,0,0,8,18.53L15.49,26,28,13.52A1,1,0,0,0,28,12.1Z"
      ></Path>
      <Rect x="0" y="0" width="36" height="36" fillOpacity="0" />
    </Svg>
  );
};

export default SuccessIcon;
