// Import images from assets folder
import natureImage from "../../assets/nature.jpeg";
import bodyScanImage from "../../assets/bodyScan.jpeg";
import mindfulnessImage from "../../assets/mindfullness.jpeg";
import waterImage from "../../assets/water.jpeg";
import yogaImage from "../../assets/yoga.jpeg";
import movementImage from "../../assets/Movement.jpeg";
import soundImage from "../../assets/sound.jpeg";
import transcendentalImage from "../../assets/transcendental.jpeg";
import lovingKindnessImage from "../../assets/Loving-Kindness.jpeg";
import guidedImage from "../../assets/guided.jpeg";

export const stories = [
    { id: 1, imageUrl: natureImage, text: "Nature" },
    { id: 2, imageUrl: guidedImage, text: "Guided" },
    { id: 3, imageUrl: yogaImage, text: "Yoga" },
    { id: 4, imageUrl: movementImage, text: "Movement" },
    { id: 5, imageUrl: waterImage, text: "Water" },
    { id: 6, imageUrl: lovingKindnessImage, text: "Loving-Kindness" },
    { id: 7, imageUrl: bodyScanImage, text: "Body Scan" },
    { id: 8, imageUrl: mindfulnessImage, text: "Mindfulness" },
    { id: 9, imageUrl: soundImage, text: "Sound" },
    { id: 10, imageUrl: transcendentalImage, text: "Transcendental" },
  ];
  const popular = [
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e02c',
      order: 1,
      title: 'Power of Love',
      track: 0,
      subtitle: 'Love and Peace',
      time: 2,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/17.mp3',
      image: require('../../assets/meditate6.jpg'),
    },
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e02d',
      order: 2,
      title: 'Quick Powerful Meditation',
      track: 1,
      subtitle: 'Busy At Work',
      time: 5,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/1.mp3',
      image: require('../../assets/meditate1.jpg'),
    },
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e02e',
      order: 3,
      title: 'Deep Breathing',
      track: 2,
      subtitle: 'Just Breath',
      time: 5,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/2.mp3',
      image: require('../../assets/meditate2.jpg'),
    },
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e02f',
      order: 4,
      title: 'Yawn and Stretch',
      subtitle: 'Rise and Shine',
      track: 3,
      time: 5,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/3.mp3',
      image: require('../../assets/meditate5.jpg'),
    },
  ];
  
  const anxiety = [
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e030',
      order: 1,
      title: 'Deep and Quick Relaxation',
      track: 4,
      subtitle: 'Release Anxiety',
      time: 10,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/4.mp3',
      image: require('../../assets/meditate3.jpg'),
    },
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e031',
      order: 2,
      title: 'Calming Medition',
      subtitle: 'Deep Relaxation',
      track: 7,
      time: 11,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/7.mp3',
      image: require('../../assets/meditate4.jpg'),
    },
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e032',
      order: 2,
      title: 'Candle Relaxation',
      subtitle: 'Get Some Rest',
      track: 8,
      time: 11,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/8.mp3',
      image: require('../../assets/rocks.jpg'),
    },
  ];
  
  const sleep = [
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e033',
      order: 1,
      title: 'Deep Sleep',
      subtitle: 'Wake Up Refreshed',
      track: 5,
      time: 8,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/5.mp3',
      image: require('../../assets/tea.jpg'),
    },
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e034',
      order: 2,
      title: 'Short Sleep',
      subtitle: 'For Taking a Nap',
      track: 6,
      time: 28,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/6.mp3',
      image: require('../../assets/sleep.jpg'),
    },
    {
      id: 'ff171f80-5960-41e7-965c-1f9bcf31e035',
      order: 2,
      title: 'Good Sleep',
      track: 12,
      subtitle: 'Drift Off To Sleep',
      time: 15,
      uri: 'https://goofy-ritchie-dd0c3d.netlify.app/meditations/12.mp3',
      image: require('../../assets/sleep2.jpg'),
    },
  ];
  
  export const meditations = {
    popular,
    sleep,
    anxiety,
  };
  