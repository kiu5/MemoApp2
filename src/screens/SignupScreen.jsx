import React,{useState} from 'react';
import {
  View, Text,TextInput, StyleSheet , TouchableOpacity,Alert
} from 'react-native';
import firebase from 'firebase';


import Button from '../components/button';

export default function SignupScreen(props){
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlePress(){
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((userCredential)=>{
      const{user} = userCredential;
      console.log(user.uid);
      navigation.reset({
        index:0,
        routes: [{name: 'MemoList'}],
      });
    })
    .catch((error)=>{
      console.log(error.code,error.message);
      Alert.alert(error.code);
    });
  
  }

  return(
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Signup</Text>
        <TextInput 
          style={styles.input} 
          value={email} 
          onChangeText={(text)=>{setEmail(text);}}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput 
          style={styles.input} 
          value={password}
          onChangeText={(text)=>{setPassword(text);}}
          autoCapitalize="none"
          placeholder="password"
          secureTextEntry={true}
          textContentType="password"
        />
        <View style={styles.buttonContainer}>
          <Button 
            label="submit" 
            onPress={handlePress}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registere?</Text>
          <TouchableOpacity 
            onPress={()=>{navigation.reset({
              index: 0,
              routes: [{name:'Login'}],
              
              });
            }}
          >
            <Text style={styles.footerLink}>Login here!</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
const styles=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  inner:{
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title:{
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input:{
    fontSize: 16,
    height: 48,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  footer:{
    flexDirection: 'row',
  },
  footerText:{
    fontSize: 14,
    lineHeight: 24,
    marginRight:8,
  },
  footerLink:{
    fontSize: 14,
    lineHeight: 24,
    color: 'green',
  }

});