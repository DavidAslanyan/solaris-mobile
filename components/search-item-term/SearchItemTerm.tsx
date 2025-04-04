import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeText from '../themes/theme-text';
import { TermType } from '@/constants/types';


type SearchTermItemProps = {
  term: TermType;
};

const SearchTermItem: React.FC<SearchTermItemProps> = ({ term }) => {
  return (
    <View style={styles.container}>
      <ThemeText style={styles.title}>
        {term.id}. {term.term}
      </ThemeText>
      <ThemeText style={styles.shortExplanation}>{term.shortExplanation}</ThemeText>
      <ThemeText style={styles.longExplanation}>{term.longExplanation}</ThemeText>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shortExplanation: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  longExplanation: {
    marginTop: 4,
    fontSize: 14,
  },
  separator: {
    marginTop: 16,
    height: 2,
    width: '100%',
    backgroundColor: '#D1D5DB', // tailwind's gray-300
    borderRadius: 999,
  },
});

export default SearchTermItem;
