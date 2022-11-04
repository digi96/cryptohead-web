import { useState } from 'react';
import { useSelector } from 'react-redux';
import {ethers} from 'ethers';
import { Button, NavDropdown } from 'react-bootstrap';
import { State } from "../state";



function Metamask() {
    const [selectedAddress, setSelectedAddress] = useState(null);

    const user = useSelector((state: State) => state.user);
  

    const connectToMetamask = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts",[]);
        setSelectedAddress(accounts[0]);
    }

    const renderMetamask = () => {
        if(!selectedAddress){
            return (
                <Button onClick={() => connectToMetamask()}>Connect</Button>
            );
        }else{
            var address = new String(selectedAddress);
            return (
                <NavDropdown title="Connected" id="collasible-nav-dropdown">
                    <NavDropdown.Item>{address.substring(0,9)+".."}</NavDropdown.Item>
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

export default Metamask;