import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators, State, HeadProfile} from "../state"


export default function Home(){

    const dispatch = useDispatch();

    const {updateUser} = bindActionCreators(actionCreators, dispatch);
    const user = useSelector((state: State) => state.user);
  
    const onUpdateUserName = (name:string) => {
      let newUserProfile: HeadProfile ={
        userId: 1,
        address: "11111111",
        displayName: name,
        email: "guest@digi96.com",
        isEmailVerified: false
      }
      updateUser(newUserProfile);
    }


    return (
        <div>
             <h1>{user.displayName}</h1>
      <button onClick={() => onUpdateUserName("Joseph")}>Joseph</button>
      <button onClick={() => onUpdateUserName("Peter")}>Peter</button>
        </div>
    )

}