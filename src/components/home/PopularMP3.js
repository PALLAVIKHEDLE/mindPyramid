import React from 'react';
import { StyleSheet, FlatList, Text,ScrollView,View} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

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
            uri: item.uri,
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
            uri: item.uri,
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
    <View
    style={styles.container}
  >
    <ScrollView >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:8


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

