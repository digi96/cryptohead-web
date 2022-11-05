import { useSelector } from 'react-redux';
import { Button, NavDropdown } from 'react-bootstrap';
import { actionCreators, State } from "../state";
import { addAccountChangeListener, connectMetamask } from '../utils/EthersHelper';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';



export default function Metamask() {
    const dispatch = useDispatch();
    const {updateWalletInfo} = bindActionCreators(actionCreators, dispatch);  

    const user = useSelector((state: State) => state.user);
    const wallet = useSelector((state: State) => state.wallet);

    const accountChangeHandler = async (address:string) => {
        console.log("address changed,"+ address);
        const walletInfo:WalletInfo = await connectMetamask();
        updateWalletInfo(walletInfo);
    }
    
    const connectToMetamask = async () => {
        const walletInfo:WalletInfo = await connectMetamask();
        updateWalletInfo(walletInfo);

        addAccountChangeListener(accountChangeHandler);
        //setSelectedAddress(wallet.address);

    }

    const renderMetamask = () => {
        if(!wallet.connected){
            return (
                <Button onClick={() => connectToMetamask()}>Connect</Button>
            );
        }else{
            return (
                <NavDropdown title="Connected" id="collasible-nav-dropdown">
                    <NavDropdown.Item>{wallet.address.substring(0,9)+".."}</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        {user.displayName} (Head)
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Singed
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        My Cards
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.4">
                        My Tempates
                    </NavDropdown.Item>
                </NavDropdown>
            );
        }
    }

    return renderMetamask();

}