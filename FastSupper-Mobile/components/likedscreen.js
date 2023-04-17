import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Modal, Pressable} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';


export default function LikedScreen({route,navigation}) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const{email, token} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const[modalVisible, setModalVisible] = useState(true);



  useEffect(() => {
      wishlist();
  },[]);
  //[page]

  const wishlist = async () => {
    //setLoading(true);
    try {
      const response = await axios.post('https://fastsupper.herokuapp.com/api/wishlist',{
      token:token
      })
      const data = response.data;
      //const ids = data.wishlist.map(item => item.id);
      //console.log(ids);
      //console.log(data.id);
      setRestaurants(prevRestaurants => [...prevRestaurants, ...data.wishlist]);
      //console.log(restaurants);
    } catch (error) {
      console.error(error);
    }
    //setLoading(false);
  };

  const deleteRes = async (item) => {
    //console.log(token);
    //console.log(item._id);
    axios.post('https://fastsupper.herokuapp.com/api/history-delete', {
    token:token,
    restaurantID: item._id
  })
  .then(function (response) {
    console.log(response);
    deleteItemByID(item.id);
  })
  .catch(function (error) {
    console.log(error);
  });
};



  deleteItemByID = (id) =>{
    let arr = restaurants.filter(function(item) {
      return item.id !== id
    })
    setRestaurants(arr);
  }

  const handleSearch = text =>{
    setSearchQuery(text); 
  }

  const filteredRestaurants = restaurants.filter(
    restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RenderHeader = () => {
    return(
    <View style={styles.header}>
      <TextInput autoCapitalize='none'
       onChangeText={handleSearch}
       value={searchQuery}
       status='info'
       placeholder='Search'
       ></TextInput>
    </View>
  )}

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={styles.restaurant}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.categories[0].title}</Text>
        <Text style={styles.description}>{item.location.display_address}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Show", {item:item,email:email,token:token})}>
          <Text style={styles.buttonText}>Information</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>deleteRes(item)} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // const handleLoadMore = () => {
  //   if (!loading) {
  //     setPage(prevPage => prevPage + 1);
  //   }
  // };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRestaurants}
        //data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={RenderHeader}
        //onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <Text style={styles.loading}>Loading more restaurants...</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    borderRadius: 25,
    borderColor: '#333',
    backgroundColor: '#fff'
  },
  restaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
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
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
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
