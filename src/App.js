import React, {Fragment, Component} from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Colors from './style/colors';
import RootNav from './routers/rootNav';
import { StreakProvider } from './components/stats/streakContext';

export default class App extends Component {
  render() {
    return (
      <StreakProvider>
          <Fragment>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={Colors.black}
            />
            <SafeAreaView
              style={{flex: 1}}
              forceInset={{bottom: 'never', top: 'never'}}>  
               <RootNav/> 
            </SafeAreaView>
          </Fragment>
          </StreakProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});