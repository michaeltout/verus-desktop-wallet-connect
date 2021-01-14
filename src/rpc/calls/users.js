import { API_LOAD_USERS, API_SAVE_USERS } from "../../utils/constants"
import { apiGet, apiPost } from "../callCreator"

/**
 * Loads the users object from the user file, if no file is present,
 * a new one with an empty users object is created and an empty object is returned
 */
export const loadUsers = async () => {
  try {
    const res = await apiGet(API_LOAD_USERS, true)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}

/**
 * Saves a users object to the user file
 * @param {Object} userObj 
 */
export const saveUsers = async (userObj) => {
  try {
    const res = await apiPost(API_SAVE_USERS, {userObj}, true)
    if (res.msg !== 'success') throw new Error(res.result)
    else return res.result
  } catch (e) {
    console.error(e)
    throw new Error(e.message)
  }
}