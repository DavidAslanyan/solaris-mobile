import { View, StyleSheet, Modal } from 'react-native'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Colors } from '@/constants/Colors';
import { useAppTheme } from '@/app/contexts/ThemeContext';

type PopupProps = {
  isOpen: boolean;
  setIsOpen: any; // Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

const Popup: React.FC<PopupProps> = ({ isOpen, setIsOpen, children }) => {
  const { theme } = useAppTheme();

  return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={[
          styles.centeredView,
          {
            backgroundColor: theme === 'light' ? Colors.lowOpacityWhite : Colors.lowOpacityDark,
          }
        ]}>
          <View style={[
            styles.modalView,
            {
              backgroundColor: theme === 'light' ? Colors.white : Colors.darkerBackgorund,
            }
          ]}>
            {children}
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    paddingHorizontal: '4%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: Colors.lowOpacityWhite,
    borderWidth: 1,
  },
});

export default Popup;
