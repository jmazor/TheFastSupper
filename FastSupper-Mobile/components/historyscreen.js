import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import axios from 'axios';

export default function HistoryScreen({route,navigation}) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const{email, token} = route.params;
  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
      wishlist();
  }, []);
  //[page]

  const wishlist = async () => {
    //setLoading(true);
    try {
      const response = await axios.post('https://fastsupper.herokuapp.com/api/visited',{
      token:token
      })
      const data = response.data;
      console.log(data);
      setRestaurants(prevRestaurants => [...prevRestaurants, ...data.wishlist]);
    } catch (error) {
      console.error(error);
    }
    //setLoading(false);
  };

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
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Visit Restaurant</Text>
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
