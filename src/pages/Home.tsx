import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {bindActionCreators} from "redux";
import {actionCreators, State} from "../state"
import { useSiwe } from '@usedapp/siwe'
import {useEthers} from '@usedapp/core';


export default function HomePage(){
  const { signIn, signOut, isLoggedIn, isLoading, cancelLoading, message, error: siweError } = useSiwe()
  const { account } = useEthers();

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const SiweComponent = () => {
      if (isLoading) {
        return (
          <>
            <button onClick={cancelLoading}>Cancel</button>
            <div>Loading...</div>
          </>
        )
      }

      const goSignIn = () => {
        console.log("signIn...");
        signIn();
      }

      return (
        <div>
          <button onClick={goSignIn}>{!isLoggedIn ? 'Sign in' : 'Sign in again'}</button>
          &nbsp;
          <button disabled={!isLoggedIn} onClick={signOut}>
            Sign out
          </button>
          {siweError && <div>Error: {siweError.message}</div>}
          {isLoggedIn && (
            <>
              <p>Logged in with {message?.address}</p>
              <p>Nonce: {message?.nonce}</p>
              <p>ChainId: {message?.chainId}</p>
            </>
          )}
          {!siweError && !isLoggedIn && <p>Not logged in</p>}
        </div>
      )
    }

    return (
        <div>
             <h1>{user.displayName}</h1>
      <button onClick={() => onUpdateUserName("Joseph")}>Joseph</button>
      <button onClick={() => onUpdateUserName("Peter")}>Peter</button>
      <br/>
      <br/>
      <button onClick={()=> {navigate('/about/2')}}>About</button>
      <br/>
      <Link to="/about">Go to About</Link>
      {account && <SiweComponent />}
      </div>
    )

}