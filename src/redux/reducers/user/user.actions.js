import { getCurrentUser } from "../../../rpc/calls/checkCurrentUser";
import { loadUsers } from "../../../rpc/calls/users";
import {
  SET_USERS,
  SET_ACTIVE_USER_ID
} from "./user.types";

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: {
      users
    }
  }
}

export const setActiveUserId = (id) => {
  return {
    type: SET_ACTIVE_USER_ID,
    payload: {
      id
    }
  }
}

/**
 * Attempts to get the current user
 */
export const checkAndUpdateUsers = async () => {
  try {
    const currentUser = await getCurrentUser()
    const users = await loadUsers()
    
    return [setActiveUserId(currentUser), setUsers(users)]
  } catch (e) {
    console.error(e.message)
    throw new Error(e.message)
  }
}