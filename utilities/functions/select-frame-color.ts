import { Colors } from "@/constants/Colors";
import { FRAMES } from "@/constants/shop-items";

export const selectFrameColor = (color: string): string => {
  switch (color) {
    case FRAMES.black:
      return "#1f1f1f"; 
    case FRAMES.white:
      return "#ffffff";
    case FRAMES.gray:
      return "#6b7280";
    case FRAMES.green:
      return "#047857";
    case FRAMES.blue:
      return "#1d4ed8";
    case FRAMES.lightBlue:
      return "#0ea5e9";
    case FRAMES.orange:
      return "#ea580c";
    case FRAMES.purple:
      return "#7c3aed";
    case FRAMES.red:
      return "#dc2626";
    case FRAMES.yellow:
      return "#eab308";
    case FRAMES.pink:
      return "#ec4899";
    case FRAMES.teal:
      return "#14b8a6";
    case FRAMES.lime:
      return "#84cc16";
    case FRAMES.indigo:
      return "#6366f1";
    case FRAMES.rose:
      return "#f43f5e";
    case FRAMES.amber:
      return "#f59e0b";
    case FRAMES.cyan:
      return "#06b6d4";
    case FRAMES.emerald:
      return "#10b981";
    case FRAMES.violet:
      return "#8b5cf6";

    default:
      return Colors.thirdly; 
  }
};
