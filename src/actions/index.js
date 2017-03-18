import axios from 'axios';
import { browserHistory } from 'react-router';

import { 
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
} from './types'

// const ROOT_URL = 'https://advertisementsserver.herokuapp.com'
const ROOT_URL ='http://localhost:3000/'

export function signupUser(values) {
	return dispatch => {
		axios.post(`${ROOT_URL}/api/v1/users/signup`, values)
			.then(response => {
				dispatch({
					type: AUTH_USER,
					payload: response.data
				})
				localStorage.setItem('auth_token', response.data.token)				
				localStorage.setItem('user', JSON.stringify(response.data.user))				
				browserHistory.push('/?page=1')
			})
			.catch(error => {
				dispatch({
					type: AUTH_ERROR,
					payload: error.response.data
				})
			})
  }
}

export function signinUser({email, password}) {
	return dispatch => {
		axios.post(`${ROOT_URL}/api/v1/users/signin`, {email, password})
			.then(response => {
				dispatch({
					type: AUTH_USER,
					payload: response.data
				})
				localStorage.setItem('auth_token', response.data.auth_token)
				localStorage.setItem('user', JSON.stringify(response.data.user))
				browserHistory.push('/')
			})
			.catch(error => {
				dispatch({
					type: AUTH_ERROR,
					payload: {errors: ['Погрешен Е-маил/Лозинка']}
				})
			})
	}
}

export function signoutUser() {
	return dispatch => {
		dispatch({type: UNAUTH_USER})
		localStorage.removeItem('auth_token')
		localStorage.removeItem('user')
		browserHistory.push('/')
	}
}