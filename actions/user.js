import Firebase, { db,authenication } from '../config/Firebase.js'
// define types

import * as k from './types'; 
// actions


export const updateEmail = email => {
	return {
		type: k.UPDATE_EMAIL,
		payload: email
	}
}

export const updatePassword = password => {
	return {
		type: k.UPDATE_PASSWORD,
		payload: password
	}
}

export const updateName = name => {
	return {
		type: k.UPDATE_NAME,
		payload: name
	}
}

export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			const response = await authenication.signInWithEmailAndPassword(email, password)

			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}



export const getUser = uid => {
	return async (dispatch, getState) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

			dispatch({ type: k.LOGIN, payload: user.data() })
		} catch (e) {
			  //alert(e)
		}
	}
}

export const signup = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password, name } = getState().user
			const response = await authenication.createUserWithEmailAndPassword(email, password)
			if (response.user.uid) {
				const user = {
					uid: response.user.uid,
					email: email,
					password: password,	
					name: name,
					firstLoggedIn: Date(),
				}

				db.collection('users')
					.doc(response.user.uid)
					.set(user)

				dispatch({ type: k.SIGNUP, payload: user })
			}
		} catch (e) {
			
		} 
	}
}


export const signInanon = () =>{

}