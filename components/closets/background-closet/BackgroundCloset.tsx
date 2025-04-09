import ButtonMainSmall from '@/components/buttons/button-main-small';
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small';
import { filterBackgrounds } from '@/utilities/functions/filter-backgrounds';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageSourcePropType } from 'react-native';


type BackgroundClosetProps = {
  background: ImageSourcePropType;
  setBackground: (arg: ImageSourcePropType) => void;
  purchasedBackgrounds: string[];
  setPopup: (arg: boolean) => void;
};


const BackgroundCloset: React.FC<BackgroundClosetProps> = ({
  background,
  setBackground,
  purchasedBackgrounds,
  setPopup,
}) => {
  const [curBackground, setCurBackground] = useState(background);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleUpdateUserBackground = () => {
    setBackground(curBackground);
    setPopup(false);
  };

  const handleCancel = () => {
    setBackground(background);
    setCurBackground(background);
    setPopup(false);
  };

  if (!hasMounted) {
    return null;
  }

  const backgroundImages = filterBackgrounds(purchasedBackgrounds);

  return (
    <View>
      <View style={{ marginBottom: 20, alignSelf: 'center' }}>
        <Image
          source={curBackground}
          style={{ width: 200, height: 100, borderRadius: 10 }}
        />
      </View>
    
      <View style={{ height: 100 }}>
        <ScrollView horizontal={true}>
          {backgroundImages.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => setCurBackground(item)} style={{ marginRight: 30 }}>
              <Image
                source={item}
                style={{
                  width: 140,
                  height: 80,
                  borderRadius: 10,
                  borderWidth: item === curBackground ? 4 : 0,
                  borderColor: item === curBackground ? 'green' : 'transparent',
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
       <ButtonMainSmall onPress={handleUpdateUserBackground} title="Save Changes" />
      </View>
    </View>
)};

export default BackgroundCloset;
