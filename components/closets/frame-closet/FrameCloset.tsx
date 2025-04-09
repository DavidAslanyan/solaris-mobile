import Avatar from '@/components/avatar';
import ButtonMainSmall from '@/components/buttons/button-main-small';
import ButtonSecondarySmall from '@/components/buttons/button-secondary-small';
import CheckIcon from '@/components/icons/CheckIcon';
import { Colors } from '@/constants/Colors';
import { selectFrameColor } from '@/utilities/functions/select-frame-color';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageSourcePropType } from 'react-native';


type FrameClosetProps = {
  avatar: ImageSourcePropType;
  frame: string;
  setFrame: (arg: string) => void;
  purchasedFrames: string[];
  setPopup: (arg: boolean) => void;
};


const FrameCloset: React.FC<FrameClosetProps> = ({
  avatar,
  frame,
  setFrame,
  purchasedFrames,
  setPopup,
}) => {
  const [curFrame, setCurFrame] = useState(frame);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleUpdateUserFrame = () => {
    setFrame(curFrame);
    setPopup(false);
  };

  const handleCancel = () => {
    setFrame(frame);
    setCurFrame(frame);
    setPopup(false);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <View>
      <View style={{ marginBottom: 20, alignSelf: 'center' }}>
        <View style={{
          width: 180,
          height: 180,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: selectFrameColor(curFrame)
          }}>
          <Image
            source={avatar}
            style={{
              width: 150,
              height: 150
            }}
          />
        </View>
      </View>
    
      <View style={{ height: 150 }}>
        <ScrollView horizontal={true}>
          {purchasedFrames.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setCurFrame(item)} 
              >
             <View style={{ 
                width: 100,
                height: 100,
                borderRadius: '50%',
                marginRight: 30, 
                borderWidth: 10,
                borderColor: selectFrameColor(item),
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item === curFrame &&
                <CheckIcon width={36} height={36} color={Colors.primary} />
                }
             </View>
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
       <ButtonMainSmall onPress={handleUpdateUserFrame} title="Save Changes" />
      </View>
    </View>
)};

export default FrameCloset;
