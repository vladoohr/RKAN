import axios from 'axios';
import { browserHistory } from 'react-router';

import { 
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
} from './types'

// const ROOT_URL = 'https://advertisementsserver.herokuapp.com'
const ROOT_URL ='http://192.168.0.141:5000'

export function signupUser(values) {
	return dispatch => {
		axios.post(`${ROOT_URL}/`, values)
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

export function signinUser() {
	return dispatch => {
		axios.get(`${ROOT_URL}/api/3/action/user_show?id=tino097`, {headers: {'Authorization':'2d157972-2d68-49b6-accd-b1b5e3f48046'}})
			.then(response => {
				dispatch({
					type: AUTH_USER,
					payload: response.data.result
				})
				localStorage.setItem('auth_token', response.data.apikey)				
				localStorage.setItem('user', JSON.stringify(response.data.result))				
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