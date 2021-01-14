import { encryptKey } from "./encryptKey"
import { saveUsers } from "./users"

/**
 * Sets the encrypted seed for a user, used for setting up lite mode later than account
 * creation
 * @param {Object} loadedUsers The currently loaded users in the redux store
 * @param {String} userId The user id to update
 * @param {String} password The password to encrypt the seed
 * @param {String} seed The litemode seed for the user
 */
export const setUserAuth = async (loadedUsers, userId, password, seed) => {  
  const updates = { pinFile: await encryptKey(password, seed) }

  if (!loadedUsers[userId]) throw new Error(`User with ID ${userId} not found!`)
  
  const usersObj = {...loadedUsers, [userId]: {...loadedUsers[userId], ...updates}}

  return await saveUsers(usersObj)
}