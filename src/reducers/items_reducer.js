import { 
	GET_CITIES,
	GET_CATEGORIES
} from '../actions/types'

const INITIAL_STATE = {
	cities: [],
	categories: []
}

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case GET_CITIES:
			return {...state, cities: action.payload.cities}
		case GET_CATEGORIES:
			return {...state, categories: action.payload.categories}
	}

	return state
}