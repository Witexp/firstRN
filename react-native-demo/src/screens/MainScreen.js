import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) =>{
    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data = {todos}
                renderItem={({item}) => (
                <Todo todo = { item } onRemove={removeTodo} onOpen={openTodo}/>
                )}
        />
        {/* Первый способ
        <View>
            { todos.map(todo => (
              <Todo todo = {todo} key = {todo.id}/>
            )) }
        </View> */}
         </View>
     )
   
}

const styles = StyleSheet.create({


})






