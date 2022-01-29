import react, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';

export default function App() {
  const[keyword, setKeyword] = useState("");
  const[recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRecipes(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image style={styles.img} source={{uri: item.strMealThumb }}/>
          </View>}
        data={recipes} 
        ItemSeparatorComponent={listSeparator} /> 

      <TextInput style={{fontSize:18, width:200}} 
      placeholder='Enter ingredient'
      onChangeText={text => setKeyword(text) } />

      <Button title="Find" onPress= {getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },

  img : {
    width: 50,
    height: 50,
  }
});
