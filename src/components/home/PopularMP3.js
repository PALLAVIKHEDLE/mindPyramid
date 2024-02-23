import React from 'react';
import { StyleSheet, FlatList, Text, View ,TouchableOpacity,ScrollView} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';

import Colors from '../../style/colors'
import { meditations } from "./MeditationData";



function PopularMP3({ navigation }) {
  const renderPopularCard = ({ item }) => {
    return (
      <Card
        elevation={1}
        style={styles.card}
        onPress={() =>
          navigation.navigate('PlayerScreen', {
            title: item.title,
            image: item.image,
            audio: item.uri,
          })
        }
      >
        <Card.Cover style={[styles.cardImage, styles.popularImage]} source={item.image} />
        <Card.Title
          titleStyle={[styles.cardTitle, { color: Colors.lightBlue }]}
          subtitleStyle={styles.cardSubtitle}
          title={item.title}
          subtitle={item.subtitle}
        />
        <Card.Content style={styles.cardContent}>
          <Paragraph style={styles.cardParagraph}>{item.time} minutes</Paragraph>
          {/* <DownloadButton id={item.id} style={styles.downloadButton} /> */}
        </Card.Content>
      </Card>
    );
  };

  const renderCard = ({ item }) => {
    return (
      <Card
        style={styles.card}
        onPress={() =>
          navigation.navigate('PlayerScreen', {
            title: item.title,
            image: item.image,
            audio: item.audio,
          })
        }
      >
        <Card.Cover style={styles.cardImage} source={item.image} />
        <Card.Title
          titleStyle={[styles.cardTitle, { color: Colors.lightBlue }]}
          subtitleStyle={styles.cardSubtitle}
          title={item.title}
          subtitle={item.subtitle}
        />
        <Card.Content style={styles.cardContent}>
          <Paragraph style={styles.cardParagraph}>{item.time} minutes</Paragraph>
          {/* <DownloadButton id={item.id} style={styles.downloadButton} /> */}
        </Card.Content>
      </Card>
    );
  };

  return (
    <LinearGradient
    colors={["#CADFED", "#EDF5F9"]}
    style={styles.container}
  >
    <ScrollView >
    <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      <Text style={styles.title}>POPULAR</Text>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={meditations.popular}
        renderItem={renderPopularCard}
        keyExtractor={({ id }) => id}
      />
      <Text style={styles.title}>ANXIETY</Text>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={meditations.anxiety}
        renderItem={renderCard}
        keyExtractor={({ id }) => id}
      />
      <Text style={styles.title}>SLEEP</Text>
      <FlatList
        style={styles.cards}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={meditations.sleep}
        renderItem={renderCard}
        keyExtractor={({ id }) => id}
      />
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:8

  },
  goBackButton: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: Colors.grey,
    borderRadius: 5,
  },
  goBackText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    width: 250,
    height:'auto',
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
  },
  cardImage: {
    height: 135,
  },
  popularImage: {
    height: 220,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardSubtitle: {
    color: Colors.activeColor,
    fontSize: 14,
  },
  cardParagraph: {
    color: Colors.lightBlue,
    fontWeight: '600',
  },
  downloadButton: {
    position: 'relative',
    top: -6,
  },
  cards: {
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 19,
  },
});

export default PopularMP3;

