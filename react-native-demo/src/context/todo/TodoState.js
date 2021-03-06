import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS
} from '../types'
import { ScreenContext } from '../screen/screenContext'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    const response = await fetch(
      'https://rn-todo-app-ab221.firebaseio.com/todos.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      }
    )
    const data = await response.json()
    dispatch({ type: ADD_TODO, title, id: data.name })
  }

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            changeScreen(null)
            dispatch({ type: REMOVE_TODO, id })
          }
        }
      ],
      { cancelable: false }
    )
  }

  const fetchTodos = async () => {
    const response = await fetch(
      'https://rn-todo-app-ab221.firebaseio.com/todos.json',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
    const data = await response.json()
    console.log('Fetch data', data)
    const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
    setTimeout(() => dispatch({ type: FETCH_TODOS, todos }), 5000)
  }

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = error => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
