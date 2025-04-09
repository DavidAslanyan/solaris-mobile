export function filterBackgrounds(avatarPaths: string[]): any[] {
  const imageMap: Record<string, any> = {
    "cover-1": require("@/assets/images/backgrounds/cover-1.jpg"),
    "cover-2": require("@/assets/images/backgrounds/cover-2.jpg"),
    "cover-3": require("@/assets/images/backgrounds/cover-3.jpg"),
    "cover-4": require("@/assets/images/backgrounds/cover-4.jpg"),
    "cover-5": require("@/assets/images/backgrounds/cover-5.jpg"),
    "cover-6": require("@/assets/images/backgrounds/cover-6.jpg"),
    "cover-7": require("@/assets/images/backgrounds/cover-7.jpg"),
    "cover-8": require("@/assets/images/backgrounds/cover-8.jpg"),
    "cover-9": require("@/assets/images/backgrounds/cover-9.jpg"),
    "cover-10": require("@/assets/images/backgrounds/cover-10.jpg"),
  };


  return avatarPaths.map((path) => {
    const imageKey = path.split('/')[2]?.split('.')[0]; 
    return imageKey ? imageMap[imageKey] : null;
  }).filter(Boolean);
}

export const filterBackground = (path: string) => {
  const imageMap: Record<string, any> = {
    "cover-1": require("@/assets/images/backgrounds/cover-1.jpg"),
    "cover-2": require("@/assets/images/backgrounds/cover-2.jpg"),
    "cover-3": require("@/assets/images/backgrounds/cover-3.jpg"),
    "cover-4": require("@/assets/images/backgrounds/cover-4.jpg"),
    "cover-5": require("@/assets/images/backgrounds/cover-5.jpg"),
    "cover-6": require("@/assets/images/backgrounds/cover-6.jpg"),
    "cover-7": require("@/assets/images/backgrounds/cover-7.jpg"),
    "cover-8": require("@/assets/images/backgrounds/cover-8.jpg"),
    "cover-9": require("@/assets/images/backgrounds/cover-9.jpg"),
    "cover-10": require("@/assets/images/backgrounds/cover-10.jpg"),
  };

  const imageKey = path.split('/')[2]?.split('.')[0]; 
  return imageKey ? imageMap[imageKey] : null;
}