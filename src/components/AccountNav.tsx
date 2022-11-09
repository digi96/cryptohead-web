import { useSelector } from 'react-redux';
import { Button, NavDropdown } from 'react-bootstrap';
import { actionCreators, State } from "../state";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {useEthers} from '@usedapp/core';
import { Link } from 'react-router-dom';



export default function AccountNav() {

    const { activateBrowserWallet, account, chainId } = useEthers();
    const dispatch = useDispatch();
    const {updateWalletInfo} = bindActionCreators(actionCreators, dispatch);  

    const user = useSelector((state: State) => state.user);
    const wallet = useSelector((state: State) => state.wallet);

    

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
                <Link to="/profile">
                    <NavDropdown.Item href="#">
                        Profile
                    </NavDropdown.Item>
                </Link>
                </>
            )
        }else{
            return (
            <>
                <Link to="/sign">
                    <NavDropdown.Item href="#">Sign To Login</NavDropdown.Item>
                </Link>
            </>
            );
        }
    }
        
    return (
        <>
          {!account && <Button onClick={()=> activateBrowserWallet({type: 'metamask'})}> Connect </Button>}
          if(account){
                <NavDropdown title="Connected" id="collasible-nav-dropdown">
                    <NavDropdown.Item>{wallet.address?.substring(0,9)+".."}</NavDropdown.Item>
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
                </NavDropdown>
          }
        
        </>
      )

}