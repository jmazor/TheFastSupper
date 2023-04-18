import React, { useEffect, useState } from 'react';
import {TextInput,Dimensions, Button, Image, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList} from 'react-native';
import axios from 'axios';
import Navbar from './navbar'

export default function ReviewScreen({route,navigation}) {
  const{email, token, item} = route.params;
  const[favorite,setFavorite] = useState(false);
  const[rating,setRating] = useState(0);
  const[comment,setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const[review,setReview] = useState([]);

  useEffect(() => {
    reviews(item);
  }, []);

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

  const writeReview = () => {
    axios.post('https://fastsupper.herokuapp.com/api/review', {
    token:token,
    restaurantID: item._id,
    rating:rating,
    favorite:favorite,
    review:comment,
  })
  .then(function (response) {
    console.log(response);
    setRating(0);
    setComment("");
    setReview([]);
    reviews(item);
  })
  .catch(function (error) {
    console.log(error);
  });
};

const renderReview = ({ item }) => (
    <TouchableOpacity style={styles.restaurant}>
      <View style={styles.details}>
        <Text style={styles.name}>Rating: {item.rating}</Text>
        <Text style={styles.description}>Comment: {item.comment}</Text>
      </View>
    </TouchableOpacity>
  );

const handleRatingSelect = (value) => {
    setRating(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      <View>

      <FlatList style={styles.listComp}
        data={review}
        renderItem={renderReview}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={0.1}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Rating: {rating}</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <View style={{ backgroundColor: '#ffffff', margin: 50, padding: 40, borderRadius: 10 }}>
            <TouchableOpacity onPress={() => handleRatingSelect(1)}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRatingSelect(2)}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRatingSelect(3)}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRatingSelect(4)}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRatingSelect(5)}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>5</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Comment:</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={writeReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>

      <Navbar email={email} token={token} navigation={navigation} />
    </View>
    
    
  );
};
const styles = StyleSheet.create({

  listComp: {
    paddingTop: 90,
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
    marginBottom: 100,
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