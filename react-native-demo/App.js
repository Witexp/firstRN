import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView,FlatList , Alert} from 'react-native';
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';
 

export default function App() {

  const [todoId, setTodoId] = useState('2')
  const [todos,setTodos] = useState([
     {id: '1', title: 'Выучить React Native'},
      {id: '2', title: 'Написать приложение'},
    // {id: 3, title: 'test3'},
    // {id: 4, title: 'test4'},
    // {id: 5, title: 'test5'},
    // {id: 6, title: 'test6'},
  ])

  const addTodo = (title) => {
    // const newTodo ={
    //   id: Date.now().toString(),
    //   title: title
    // }

    //setTodos(todos.concat([ newTodo]))

  //   setTodos((prevTodos) => {
  //       return[
  //         ...prevTodos,
  //         newTodo
  //       ]
  //   })
  // 

    setTodos(prev => [...prev,{
      id: Date.now().toString(),
      title: title
    }])
  }
  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      'Удаление элементов',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        { text: 'Удалить', 
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
          }
        }
      ],
      { cancelable: false }
    );
   
  }

  let content = (
    <MainScreen 
    todos={todos} 
    addTodo={addTodo} 
    removeTodo={removeTodo} 
    openTodo={setTodoId}
    //openTodo={(id) => {setTodoId(id)}}
    />
  )
  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
      content = <TodoScreen 
      onRemove={removeTodo} 
      goBack={ ()=>{setTodoId(null)}} 
      todo={selectedTodo}/>
  }



  return (
    <View>
      <Navbar title="Todo App"/>
      <View style={styles.container}>
         {content}
      </View>
    </View>
  );
}

//

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  }
});
