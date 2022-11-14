import { useSelector } from 'react-redux';
import { Button, NavDropdown } from 'react-bootstrap';
import { actionCreators, State } from "../state";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from 'metamask-react';


export default function AccountNav() {
    const { status, connect, account, chainId, ethereum, switchChain } = useMetaMask();
    const dispatch = useDispatch();
    const {updateWalletInfo} = bindActionCreators(actionCreators, dispatch);  

    const user = useSelector((state: State) => state.user);
    const wallet = useSelector((state: State) => state.wallet);
    const history = useNavigate();

    //console.log(account);
    

    // useEffect(()=>{
    //     if(account){

    //         console.log(account);
    //         console.log(wallet.address);

    //         if(account === wallet.address){
    //             console.log("address unchanged...");
    //         }else{
    //             console.log("updating wallet info...");
    //             const walletInfo:WalletInfo = {
    //                 netWorkId: chainId? chainId:0,
    //                 address: account,
    //                 signedMessage: null,
    //                 loggedIn: false
    //             }
    
    //             updateWalletInfo(walletInfo);
    //         }
            
    //     }
    // },[account]);

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