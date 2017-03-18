import axios from 'axios';
import { browserHistory } from 'react-router';

import { 
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
	GET_USER_ADS,
	GET_ADS,
	FEATURED_AD,
	NEW_AD,
	EDIT_AD,
	DELETE_AD,
	DELETE_PHOTO_AD,
	ERROR_AD,
	LOAD,
	GET_CITIES,
	GET_CATEGORIES
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

export function newAdvertisement(values) {
	return dispatch => {
		axios.post(`${ROOT_URL}/api/v1/advertisements/new`, values)
			.then(response => {
				dispatch({
					type: NEW_AD,
					payload: response.data.message 
				})
				browserHistory.push(`/user/ads/${values.user}?page=1`)
			})
			.catch(error => {
				dispatch({
					type: ERROR_AD,
					payload: error.response.data
				})
			})
	}
}

export function editAdvertisement(values, ad_id) {
	return dispatch => {
		axios.post(`${ROOT_URL}/api/v1/advertisements/${ad_id}/update`, values )
			.then(response => {
				dispatch({
					type: EDIT_AD,
					payload: response.data.message 
				})
			})
			browserHistory.push(`/ad/${ad_id}`)
			.catch(error => {
				dispatch({
					type: ERROR_AD,
					payload: error.response.data
				})
			})
	}
}

export function deleteAdvertisement(ad_id, user_id) {
	return dispatch => {
		axios.delete(`${ROOT_URL}/api/v1/advertisements/${ad_id}`)
			.then(response => {
				dispatch({
					type: DELETE_AD,
					payload: 'Огласот е избришан'
				})
				browserHistory.push(`/user/ads/${user_id}?page=1`)
			})
	}
}

export function deleteAdImage(ph_id, ad_id) {
	return dispatch => {
		axios.delete(`${ROOT_URL}/api/v1/photos/${ph_id}`, { params: {ad_id: ad_id} })
			.then(response => {
				dispatch({
					type: DELETE_PHOTO_AD,
					payload: response.data
				})
			})
	}	
}

export function getUserAdvertisements(id, page) {
	return dispatch => {
		axios.get(`${ROOT_URL}/api/v1/users/advertisements/${id}?page=${page}`)
			.then(response => {
				dispatch({
					type: GET_USER_ADS,
					payload: response.data 
				})
			})
	}
}

export function getAdvertisements(page, values) {
	return dispatch => {
		axios.get(`${ROOT_URL}/api/v1/advertisements?page=${page}`, { params: values })
			.then(response => {
				dispatch({
					type: GET_ADS,
					payload: response.data 
				})
			})
	}	
}

export function getFeaturedAd() {
	return dispatch => {
		axios.get(`${ROOT_URL}/api/v1/advertisement/featured`)
			.then(response => {
				dispatch({
					type: FEATURED_AD,
					payload: response.data 
				})
			})
	}
}

export function loadData(id) {
	return dispatch => {
		axios.get(`${ROOT_URL}/api/v1/advertisements/${id}`, {id: id})
		.then(response => {
			dispatch({
				type: LOAD,
				payload: response.data
			})
		})
	}
}

export function getCities() {
	return dispatch => {
		axios.get(`${ROOT_URL}/api/v1/items/cities`)
			.then(response => {
				dispatch({
					type: GET_CITIES,
					payload: response.data
				})
			})
	}
}

export function getCategories() {
	return dispatch => {
		axios.get(`${ROOT_URL}/api/v1/items/categories`)
			.then(response => {
				dispatch({
					type: GET_CATEGORIES,
					payload: response.data
				})
			})
	}
}