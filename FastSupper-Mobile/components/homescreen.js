import React, { useEffect, useState } from 'react';
import {Dimensions, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import Navbar from './navbar'

export default function HomeScreen({route,navigation}) {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const{email, token} = route.params;
  const[currentIndex,setCurrentIndex] = useState(0);
  const[restaurantID,setRestaurantID] = useState("");
  const[tag,setTag] = useState("");

  useEffect(() => {
    //setRestaurants([]);
    fetchRestaurants();
  }, [tag]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.post(`https://fastsupper.herokuapp.com/api/restaurants`,{
        token:token,
        category: tag
      })
      const data = response.data;
      console.log(data.randomRestaurants);
      setCurrentIndex(0);
      setRestaurants(data.randomRestaurants);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLiked = () => {
    const item = restaurants[currentIndex];
    axios.post('https://fastsupper.herokuapp.com/api/history-new', {
    token:token,
    restaurantID: item._id,
    liked:true
  })
  .then(function (response) {
    console.log(response);
    handleNext();    
  })
  .catch(function (error) {
    console.log(error);
  });
};


const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const types = [
    { label: 'Korean', value: 'Korean' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Italian', value: 'Italian' },
    { label: 'Pizza', value: 'Pizza' },
    { label: 'Mexican', value: 'Mexican' },
    { label: 'Tacos', value: 'Tacos' },
    { label: 'Sushi', value: 'Sushi' },
    { label: 'Burgers', value: 'Burgers' },
    { label: 'Bakeries', value: 'Bakeries' },
    { label: 'Sandwiches', value: 'Sandwiches' },
];

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}> 
      {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={types}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setTag(item.value.toLowerCase());
            setIsFocus(false);
          }}
        />
      </View>
  );
};

const renderRestaurant = () => {
  const item = restaurants[currentIndex];
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.restaurant}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.categories[0].title}</Text>
          <Text style={styles.description}>{item.location.display_address}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLiked}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

  const handleNext = () => {
    if (currentIndex === restaurants.length - 1)
    {
        fetchRestaurants();
    }
    else{
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      
      <DropdownComponent/>
      <Text>{tag}</Text>
      {restaurants.length > 0 ? renderRestaurant() : <Text>Loading...</Text>}
      <Navbar email={email} token={token} navigation={navigation} />
    </View>
    
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 18,
    fontWeight: '400',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  listContainer: {
    flex: 1,
  },
  restaurant: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  image: {
    width: Dimensions.get('window').width / 2,
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 25.,
    borderRadius: 50,
    paddingHorizontal: 40,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2f95dc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 10,
    marginBottom: 20,
  },
});