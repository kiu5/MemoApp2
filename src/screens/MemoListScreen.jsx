import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet
} from 'react-native';
import firebase from 'firebase';

import AppBar from '../components/AppBar';
import MemoList from '../components/MemoList'
import CircleButton from '../components/CircleButton';
import LogoutButton from '../components/LogoutButton'


export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => { };
    if (currentUser) {
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
      unsubscribe = ref.onSnapshot((snapshot) => {
        const userMemos = [];
        snapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          const data = doc.data();
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
          });
        });
        setMemos(userMemos);
      },
        (error) => {
          console.log(error);
          Alert.alert('データの読み込みに失敗しました。')
        });
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton name="plus"
        onPress={() => { navigation.navigate('MemoCreate'); }} />

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})