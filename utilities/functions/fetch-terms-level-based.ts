import { DifficultyLevel } from "../enums/difficulty-level.enum"
import easyTermsData from "@/app/data/easy-terms.json";
import mediumTermsData from "@/app/data/medium-terms.json";
import hardTermsData from "@/app/data/hard-terms.json";


export const fetchTermsLevelBased = (difficulty?: DifficultyLevel) => {
  switch(difficulty) {
    case DifficultyLevel.EASY:
      return easyTermsData;
    case DifficultyLevel.MEDIUM:
      return mediumTermsData;
    case DifficultyLevel.HARD:
      return hardTermsData;
    
    default:
      return easyTermsData;
  }
};

