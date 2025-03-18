import { View, StyleSheet, Modal, useColorScheme } from 'react-native'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { ResponseEnum } from '@/utilities/enums/response.enum';
import { Colors } from '@/constants/Colors';

type PopupProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ResponseEnum | null>>
  children: ReactNode
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  setIsOpen,
  children
}) => {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, {
      position: isOpen ? "absolute" : "relative",
      backgroundColor: colorScheme === 'light' ? Colors.lowOpacityWhite : Colors.lowOpacityDark
    }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(null);
        }}>
          <View style={[styles.centeredView, {
            
          }]}>
            <View style={[styles.modalView, {
              backgroundColor:  colorScheme === 'light' ? Colors.white : Colors.darkerBackgorund
            }]}>
              {children}
            </View>
          </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "120%",
    width: "100%"
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: Colors.lowOpacityWhite,
    borderWidth: 1
  },

})

export default Popup;
