import React, { useEffect, useState } from 'react';
import {FlatList,Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

export default function ShowScreen({route,navigation}) {
  const{item,email,token} = route.params;
  const[review,setReview] = useState([]);

  console.log(token);
  console.log(item._id);

  useEffect(() => {
    reviews(item);
  }, []);

  const visitedRes = async (item) => {
    //console.log(token);
    //console.log(item._id);
    axios.post('https://fastsupper.herokuapp.com/api/history-visited', {
    token:token,
    restaurantID: item._id
  })
  .then(function (response) {
    console.log(response);
    navigation.navigate("Visited", {email:email,token:token})
  })
  .catch(function (error) {
    console.log(error);
  });
};

const reviews = async (item) => {
  try {
    const response = await axios.get(`https://fastsupper.herokuapp.com/api/review/${item._id}`);
    const data = response.data;
    setReview(prevReview => [...prevReview, ...data]);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const renderReview = ({ item }) => (
  <TouchableOpacity style={styles.restaurant}>
    <View style={styles.details}>
      <Text style={styles.name}>Rating: {item.rating}</Text>
      <Text style={styles.description}>{item.comment}</Text>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.restaurant}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.categories[0].title}</Text>
            <Text style={styles.description}>Address: {item.location.display_address}</Text>
            <Text style={styles.description}>Rating: {item.rating}</Text>
            <Text style={styles.description}>Price: {item.price}</Text>
          </View>
        </TouchableOpacity>


        <FlatList
        data={review}
        renderItem={renderReview}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        //onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />

  
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.buttonInfo} onPress={() => visitedRes(item)}>
            <Text style={styles.buttonText}>Visited</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.buttonInfo} onPress={() =>navigation.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
         </TouchableOpacity>

    
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({

  listComp: {
    paddingTop: 90,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  buttonInfo: {
    backgroundColor: '#00ABB3',
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: '#2f95dc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#B2B2B2',
    padding: 20,
    paddingTop: 100,
  },
  bottom:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }, 
  listContainer: {
    flexGrow: 1,
  },
  restaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3C4048',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    padding: 10,
    marginHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  details: {
    flex: 1,
    padding: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    fontSize: 36,
    fontWeight: '400',

  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '400',

  },
  button: {
    backgroundColor: '#f55d22',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loading: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 10,
    marginBottom: 20,
  },
});
  