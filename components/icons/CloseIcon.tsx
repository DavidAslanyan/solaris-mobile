import React from 'react';
import { Svg, Path, Rect, Mask, G, Circle } from 'react-native-svg';
import { ColorValue } from 'react-native';
import { Colors } from '@/constants/Colors';

type IconProps = {
  width?: "100%" | number;
  height?: "100%" | number;
  fill?: ColorValue;
}

const CloseIcon = ({
  fill = Colors.secondary, 
  width = 28, 
  height = 28, 
  ...props
}: IconProps) => {
  return (
    <Svg 
      width={width} 
      height={height}
      viewBox="0 0 28 28" 
      fill="none"
      {...props}>
      <Mask id="mask0_2507_4628" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
        <Rect width="28" height="28" fill="#D9D9D9"/>
      </Mask>
      <G mask="url(#mask0_2507_4628)">
        <Circle cx="14" cy="14" r="12" fill="#F3F5F6"/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.452 17.4925C10.2023 17.2552 10.1955 16.8635 10.4368 16.6177L16.4921 10.4452C16.7333 10.1993 17.1312 10.1923 17.3808 10.4296C17.6304 10.6669 17.6372 11.0585 17.396 11.3044L11.3407 17.4769C11.0995 17.7228 10.7016 17.7298 10.452 17.4925Z" fill="#46474F"/>
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.6193 10.5074C10.8689 10.2701 11.2668 10.2771 11.508 10.523L17.5634 16.6955C17.8046 16.9414 17.7978 17.333 17.5482 17.5703C17.2986 17.8076 16.9007 17.8006 16.6594 17.5547L10.6041 11.3822C10.3629 11.1363 10.3697 10.7447 10.6193 10.5074Z" fill="#46474F"/>
      </G>
    </Svg>
  );
};

export default CloseIcon;
