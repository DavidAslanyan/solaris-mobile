import { Colors } from '@/constants/Colors';
import { ResponseEnum } from '@/utilities/enums/response.enum';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type CommentBlockProps = {
  comment: string;
  buttonActive?: boolean;
  setResponse?: (arg: ResponseEnum) => void;
};

const insertSounds = (str: string): string => {
  if (!str) return '';
  const insertAtRandom = (text: string, insert: string): string => {
    const index = Math.floor(Math.random() * (text.length + 1));
    return text.slice(0, index) + insert + text.slice(index);
  };

  let modifiedStr = str;
  const insertions = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < insertions; i++) {
    modifiedStr = insertAtRandom(modifiedStr, 'aaarrrrrr');
  }

  return modifiedStr;
};

const CommentBlock: React.FC<CommentBlockProps> = ({
  comment,
  buttonActive = false,
  setResponse,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>{insertSounds(comment)}</Text>
      <View style={styles.circle} />
      {buttonActive && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setResponse?.(ResponseEnum.SUCCESS)}
        >
          <Text style={styles.buttonText}>Feed the Monster</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 300,
    height: 60,
    borderWidth: 2,
    borderColor: Colors.thirdly, 
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    position: 'relative',
    backgroundColor: Colors.white,
  },
  commentText: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  circle: {
    position: 'absolute',
    bottom: -18,
    left: 100,
    width: 28,
    height: 28,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.thirdly, 
    backgroundColor: Colors.backPrimary, 
    zIndex: 10,
  },
  button: {
    position: 'absolute',
    top: 10,
    left: 65,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CommentBlock;
