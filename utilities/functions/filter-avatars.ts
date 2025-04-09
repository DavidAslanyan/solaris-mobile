export function filterAvatars(avatarPaths: string[]): any[] {
  const imageMap: Record<string, any> = {
    "male-1": require("@/assets/images/user-avatars/male-1.png"),
    "female-1": require("@/assets/images/user-avatars/female-1.png"),
    "male-2": require("@/assets/images/user-avatars/male-2.png"),
    "female-2": require("@/assets/images/user-avatars/female-2.png"),
    "male-3": require("@/assets/images/user-avatars/male-3.png"),
    "female-3": require("@/assets/images/user-avatars/female-3.png"),
    "limited-1": require("@/assets/images/user-avatars/limited-1.png"),
    "limited-2": require("@/assets/images/user-avatars/limited-2.png"),
    "limited-3": require("@/assets/images/user-avatars/limited-3.png"),
    "limited-4": require("@/assets/images/user-avatars/limited-4.png"),
    "limited-5": require("@/assets/images/user-avatars/limited-5.png"),
    "limited-6": require("@/assets/images/user-avatars/limited-6.png"),
  };


  return avatarPaths.map((path) => {
    const imageKey = path.split('/')[2]?.split('.')[0]; 
    return imageKey ? imageMap[imageKey] : null;
  }).filter(Boolean);
}

export const filterAvatar = (path: string) => {
  const imageMap: Record<string, any> = {
    "male-1": require("@/assets/images/user-avatars/male-1.png"),
    "female-1": require("@/assets/images/user-avatars/female-1.png"),
    "male-2": require("@/assets/images/user-avatars/male-2.png"),
    "female-2": require("@/assets/images/user-avatars/female-2.png"),
    "male-3": require("@/assets/images/user-avatars/male-3.png"),
    "female-3": require("@/assets/images/user-avatars/female-3.png"),
    "limited-1": require("@/assets/images/user-avatars/limited-1.png"),
    "limited-2": require("@/assets/images/user-avatars/limited-2.png"),
    "limited-3": require("@/assets/images/user-avatars/limited-3.png"),
    "limited-4": require("@/assets/images/user-avatars/limited-4.png"),
    "limited-5": require("@/assets/images/user-avatars/limited-5.png"),
    "limited-6": require("@/assets/images/user-avatars/limited-6.png"),
  };

  const imageKey = path.split('/')[2]?.split('.')[0]; 
  return imageKey ? imageMap[imageKey] : null;
}