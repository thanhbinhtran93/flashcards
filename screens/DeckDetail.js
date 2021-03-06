import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import TextButton from '../components/TextButton';
import { useDeckContext } from '../context/DeckContex';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Quiz from './Quiz';
import NewCard from './NewCard';
import { orange, green, white } from '../utils/colors';

const DeckDetail = ({ navigation, route }) => {
  const { getDeck } = useDeckContext();

  const deck = React.useMemo(() => {
    return getDeck(route.params.id);
  }, [getDeck, route.params.id]);

  React.useEffect(() => {
    navigation.setOptions({
      title: deck.title,
      headerTitle: deck.title,
    });
  }, [deck.title, navigation, route.params.id]);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardNumber}>{deck.cards.length} cards</Text>
      </View>
      <View style={styles.btnContainer}>
        <TextButton
          style={[styles.button, { backgroundColor: orange }]}
          onPress={() => navigation.navigate('Quiz', { id: route.params.id })}
        >
          Start Quiz
        </TextButton>
        <TextButton
          style={[styles.button, { backgroundColor: green }]}
          onPress={() =>
            navigation.navigate('NewCard', { id: route.params.id })
          }
        >
          New Card
        </TextButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  cardNumber: {
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 20,
  },
});

const ModalClose = ({ onPress }) => {
  return (
    <Ionicons
      name="ios-close"
      size={32}
      onPress={onPress}
      style={{
        marginLeft: 10,
      }}
    />
  );
};

const Stack = createStackNavigator();

const DeckDetailStackNav = ({ route, navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: ({ label }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DeckList')}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={32}
            color="white"
            style={{ paddingLeft: 10 }}
          />
          <Text style={{ paddingLeft: 10, color: white, fontSize: 18 }}>
            {label}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName="DeckDetail" mode="modal">
      <Stack.Screen
        name="DeckDetail"
        component={DeckDetail}
        initialParams={{ id: route.params.id }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          headerStatusBarHeight: 0,
          headerLeft: () => (
            <ModalClose onPress={() => navigation.navigate('DeckDetail')} />
          ),
        }}
      />
      <Stack.Screen
        name="NewCard"
        component={NewCard}
        options={{
          headerTitle: 'Card',
          headerStatusBarHeight: 0,
          headerLeft: () => (
            <ModalClose onPress={() => navigation.navigate('DeckDetail')} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DeckDetailStackNav;
