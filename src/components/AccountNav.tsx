import { State } from "../state";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from 'metamask-react';
import { Button, NavDropdown } from 'react-bootstrap';
import { useEffect } from "react";
import { useGetHeadProfile } from "../hooks/HeadProfile";

export default function AccountNav() {
    const { status, connect, account, chainId, ethereum, switchChain } = useMetaMask();
    
    const user = useSelector((state: State) => state.user);
    const wallet = useSelector((state: State) => state.wallet);
    const {retrieveData: getProfileFromContract } = useGetHeadProfile();
    const history = useNavigate();

    useEffect(()=>{
        if(account){
            console.log(user);
            if(user.userId == 0 || user.address !=account){
                getProfileFromContract();
            }
        }

    },[account])

    const renderLoggedInMenu = () => {
        if(wallet.loggedIn){
            return (
                <>
                    <NavDropdown.Item href="#" onClick={()=> history('/profile')}>
                        Profile
                    </NavDropdown.Item>
                </>
            )
        }else{
            return (
            <>
                
                <NavDropdown.Item href="#" onClick={()=> history('/sign')}>Sign To Login</NavDropdown.Item>
                
            </>
            );
        }
    }

    const renderDisconnectMenu = () => {
        if(status === "connected"){
            if(chainId === "0x13881"){
                return (
                    <>
                    <NavDropdown.Item>
                        Disconnect
                    </NavDropdown.Item>
                    </>
                );
            }else{
                return (
                    <>
                    <p>Wrong netword</p>
                    <Button onClick={() => switchChain("0x13881")}>Switch Network</Button>
                    </>);
                
            }
        }
    }

    const renderMainMenu = () => {

        return (
        <>
            <NavDropdown title="Connected" id="collasible-nav-dropdown">
                        <NavDropdown.Item>{account?.substring(0,9)+".."}</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                        {user.displayName} (Head)
                        </NavDropdown.Item>
                        {renderLoggedInMenu()}
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            My Cards
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">
                            My Tempates
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        {renderDisconnectMenu()}
                        

            </NavDropdown>
        </>
        )
    }
        
    return (
        <>
          {!account && <Button onClick={connect}>Connect Wallet</Button>}
          {account && renderMainMenu()}
        
        </>
      )

}