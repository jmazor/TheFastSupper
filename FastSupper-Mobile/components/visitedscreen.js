import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import axios from 'axios';
import Navbar from './navbar'

export default function VistedScreen({route,navigation}) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const{email, token} = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };


  useEffect(() => {
      visited();
  }, []);
  //[page]

  const visited = async () => {
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={isFocused}
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
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Review", {email:email,token:token,item:item})}>
          <Text style={styles.buttonText}>Review</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} >
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
        <Navbar email={email} token={token} navigation={navigation} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#082032',
    backgroundColor: '#B2B2B2',

    paddingBottom: 70,
  },
  listContainer: {
    flexGrow: 1,
  },
  header: {
    borderRadius: 25,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    borderRadius: 25,
    borderColor: '#333',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 30,
    color: 'white',
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
    backgroundColor: '#00ABB3',//F0A500
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },  
  loading: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 10,
    marginBottom: 20,
  },
});
