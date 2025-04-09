import ButtonMainSmall from '@/components/buttons/button-main-small';
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small';
import { filterAvatars } from '@/utilities/functions/filter-avatars';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageSourcePropType } from 'react-native';

type AvatarClosetProps = {
  avatar: ImageSourcePropType;
  setAvatar: (arg: ImageSourcePropType) => void;
  purchasedAvatars: string[];
  setPopup: (arg: boolean) => void;
};

const AvatarCloset: React.FC<AvatarClosetProps> = ({
  avatar,
  setAvatar,
  purchasedAvatars,
  setPopup,
}) => {
  const [curAvatar, setCurAvatar] = useState(avatar);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleUpdateUserAvatar = () => {
    setAvatar(curAvatar);
    setPopup(false);
  };

  const handleCancel = () => {
    setAvatar(avatar);
    setCurAvatar(avatar);
    setPopup(false);
  };

  if (!hasMounted) {
    return null;
  }

  const avatarImages = filterAvatars(purchasedAvatars);

  return (
    <View>
      <View style={{ marginBottom: 20, alignSelf: 'center' }}>
        <Image
          source={curAvatar}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />
      </View>
    
      <View style={{ height: 130 }}>
        <ScrollView horizontal={true}>
          {avatarImages.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => setCurAvatar(item)} style={{ marginRight: 30 }}>
              <Image
                source={item}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: item === curAvatar ? 4 : 0,
                  borderColor: item === curAvatar ? 'green' : 'transparent',
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <View style={{ width: 20, height: 2, backgroundColor: '#ccc', marginHorizontal: 5 }} />
         <Text style={{ fontWeight: '600', color: '#ccc' }}>Scroll</Text>
         <View style={{ width: 20, height: 2, backgroundColor: '#ccc', marginHorizontal: 5 }} />
       </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
       <ButtonSecondarySmall onPress={handleCancel} title="Cancel" />
       <ButtonMainSmall onPress={handleUpdateUserAvatar} title="Save Changes" />
      </View>
    </View>
)};

export default AvatarCloset;
