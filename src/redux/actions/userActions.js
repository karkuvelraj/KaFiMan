import { getUser } from "../../api/userApi"
import { types } from "./actions";

export function loadUserCall(id){
    return (dispatch)=>{
        return getUser({'email':id}).then(user=>{
            dispatch({ type : types.LOAD_USER ,user:user[0]?user[0]:null})
            return user[0]?user[0]:null
        }).catch((err)=>{throw err;})
    }
}