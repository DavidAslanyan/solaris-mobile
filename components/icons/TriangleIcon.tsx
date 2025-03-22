import { Colors } from '@/constants/Colors';
import React from 'react'
import Svg, { G, Path } from 'react-native-svg';

type IconProps = {
  width: number;
  height: number;
  color: string;
}

const TriangleIcon: React.FC<IconProps> = ({
  width,
  height,
  color
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <G
        id="Page-1"
        stroke={Colors.primary}
        strokeWidth="20"
        fill="none"
        fillRule="evenodd"
      >
        <G
          id="drop"
          fill={color}
          transform="translate(32.000000, 42.666667)"
        >
          <Path
            d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z"
            id="Combined-Shape"
          ></Path>
        </G>
      </G>
    </Svg>
  )
}

export default TriangleIcon