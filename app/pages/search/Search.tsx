import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import CloseIcon from '@/components/icons/CloseIcon';
import SearchIcon from '@/components/icons/navbar-icons/SearchIcon';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import  easyTermsData from '@/app/data/easy-terms.json';
import  mediumTermsData from '@/app/data/medium-terms.json';
import  hardTermsData from '@/app/data/hard-terms.json';
import { TermType } from '@/constants/types';
import SearchTermItem from '@/components/search-item-term';
import ThemeText from '@/components/themes/theme-text';
import notFoundHero from '@/components/lottie-animations/not-found-hero.json';
import LottieAnimation from '@/components/lottie-animations/lottie-animation';
import ButtonBack from '@/components/buttons/button-back';

const data = [...easyTermsData, ...mediumTermsData, ...hardTermsData];

const Search = () => {
  const { value } = useLocalSearchParams();
  const [allTermsData] = useState<TermType[]>(data); 
  const [termsData, setTermsData] = useState<TermType[]>(data);
  const [inputText, setInputText] = useState<string>(value.toString() || "");

  useEffect(() => {
    const filtered = allTermsData.filter((data) => 
      data.term.toLowerCase().includes(inputText.toLowerCase()) ||
      inputText.toLocaleLowerCase().includes(data.term.toLowerCase()) ||
      data.shortExplanation.toLowerCase().includes(inputText.toLowerCase()) ||
      data.longExplanation.toLowerCase().includes(inputText.toLowerCase())
    );
    setTermsData(filtered);
  }, [inputText, allTermsData]); 
    
  const handleTextChange = (newText: string) => {
    setInputText(newText); 
  };

  const handleSearchSubmit = () => {}
    
  return (
    <ThemedView style={styles.container}>
      <View style={styles.backButton}>
        <ButtonBack text='Back' />
      </View>
      <ThemeText weight='bold' size='xl' style={styles.title}>Search</ThemeText>
       <View style={styles.searchContainer}>
        <View>
          <View style={styles.searchContent}>
            <TouchableOpacity style={styles.searchWrapper}>
              <SearchIcon width={22} height={22} />
            </TouchableOpacity>
            <TextInput
              onSubmitEditing={handleSearchSubmit}
              style={styles.inputText}
              value={inputText}
              onChangeText={handleTextChange}
              placeholder="Search terms"
              placeholderTextColor={Colors.lowOpacityDark}
            >
            </TextInput>
          </View>
          <View style={styles.inputRightContent}>
            {inputText && (
              <TouchableOpacity onPress={() => setInputText('')}>
                <CloseIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View>
        {termsData.length !== 0
        ?
        <ScrollView style={styles.termsContainer}>
          {termsData.map((term, index) => (
            <View key={index}>
              <SearchTermItem term={term} />
            </View>
          ))}
        </ScrollView>
        :
        <View style={styles.notFoundContainer}>
          <LottieAnimation src={notFoundHero} />
          <ThemeText weight='bold' size='lg'>Term Not Found</ThemeText>
        </View>
        }
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  title: {
    paddingTop: '15%',
    paddingBottom: '3%',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: '6%',
    zIndex: 50
  },
  searchContainer: {
    marginHorizontal: '5%',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    borderRadius: 25
  },
  searchContent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: '4%',
  },
  searchWrapper: {
    paddingLeft: '3%',
  },
  inputText: {
    paddingLeft: 12,
    width: '60%',
    backgroundColor: Colors.white,
  },
  inputRightContent: {
    gap: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: '3%',
    top: '20%'
  },
  termsContainer: {
    paddingHorizontal: '4%',
    paddingTop: '5%',
    marginBottom: '25%'
  },
  notFoundContainer: {
    alignItems: 'center',
  }
})


export default Search;

