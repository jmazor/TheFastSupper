import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function savedScreen() {
  const [restaurants, setRestaurants] = useState([
    { id: '1', rating: 'Customer rating: 4.5', name: 'Restaurant 1', description: 'Some description about Restaurant 1.', image: require('../assets/fastSupperLogo.png') },
    { id: '2', rating: 'Customer rating: 4.5', name: 'Restaurant 2', description: 'Some description about Restaurant 2.', image: require('../assets/fastSupperLogo.png') },
    // Add more restaurants here
  ]);

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={styles.restaurant}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>{item.rating}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Visit Restaurant</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//     padding: 20,
//   },
//   listContainer: {
//     flexGrow: 1,
//   },
//   restaurant: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 20,
//     overflow: 'hidden',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//   },
//   details: {
//     flex: 1,
//     padding: 10,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#f55d22',
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
},
image: {
  width: '100%',
  height: 200,
},
name: {
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 16,
  marginLeft: 16,
  marginRight: 16,
},
description: {
  fontSize: 16,
  color: 'gray',
  marginLeft: 16,
  marginRight: 16,
  marginBottom: 16,
},
});
