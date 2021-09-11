import React, { useEffect, useState } from "react";
import { LDSSpinner } from "./Components";

import './styles/Pages.scss';
import './styles/DApp.scss';
import bnbIcon from './assets/icon-bnb.png'
import pogIcon from './assets/icon-pog.png'
import presaleTrade from './assets/PresaleTrade.png'

import contracts from './static/contracts.json'
import { ProviderMessage, ProviderRpcError, ProviderConnectInfo, RequestArguments } from 'hardhat/types';

interface EthereumEvent {
    connect: ProviderConnectInfo;
    disconnect: ProviderRpcError;
    accountsChanged: Array<string>;
    chainChanged: string;
    message: ProviderMessage
}

type EventKeys = keyof EthereumEvent;
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

interface Ethereumish {
    autoRefreshOnNetworkChange: boolean;
    chainId: string;
    isMetaMask?: boolean;
    isStatus?: boolean;
    networkVersion: string;
    selectedAddress: any;

    on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
    enable(): Promise<any>;
    request: (request: { method: string, params?: Array<any> }) => Promise<any>
    sendAsync: (request: RequestArguments) => Promise<any>
}

declare global {
    interface Window {
        ethereum: Ethereumish;
    }
}


export enum PresaleStatus {
    Preparing = 0,
    Open,
    OpenSuccess,
    OpenFailed,
    ClosedSuccess,
    ClosedFailed    
}


export const PresaleDApp = () => {

    const [walletAddress, setWalletAddress] = useState( "" );
    const [walletAvailable, setWalletAvailable] = useState( false );
    const [walletConnected, setWalletConnected] = useState( false );

    const [pogBalance, setPogBalance] = useState( 0 );
    const [WeiBalance, setWeiBalance] = useState( 0 );

    const [pogPrice, setPogPrice] = useState( 0 );


    let WalletReloadTimeoutHandle: null | ReturnType<typeof setTimeout> = null;

    const loadWallet = () => {

        let disconnectTimeout = setTimeout( () => { setWalletConnected(false) }, 1000 )
 
        window.ethereum.request({method: 'eth_requestAccounts'}).then((res) => {

            setWalletAddress(res)
            setWalletConnected(true)
            clearTimeout(disconnectTimeout)
            
            loadContracts()
        })

        if (WalletReloadTimeoutHandle) {
            clearTimeout(WalletReloadTimeoutHandle)
        }
        WalletReloadTimeoutHandle = setTimeout( () => { loadWallet() }, 10000)
    }

    const loadContracts = () => {
        console.log(window.ethereum)
        /*window.ethereum.request({method: "getWeiPerToken",
        params: [{
            from: walletAddress,
            to: contracts.crowdSaleAddress,         
            }]
        }).then( (res) => {
            console.log(res)
        })*/
    }

    useEffect(
        () => {
            if (window.ethereum) {
                setWalletAvailable(true)
                loadWallet()
                
                //setInterval( () => {}, 30000)
            }
            else setWalletAvailable(false)

            
        }, 
        []
    );

    if (walletConnected) {
        return (
            <div className="Page PresaleDApp">
                <img className="Presale-Logo" src={presaleTrade}></img>
                <h2> Buy $POG! </h2>
                <div className="InputWrapper">
                    <span>From</span>
                    <span><img src={bnbIcon}></img> BNB</span>
                    <input placeholder="0.0"></input>  
                </div>
                <div className="InputWrapper">
                    <span>To</span>
                    <span><img src={pogIcon}></img>$POG</span>
                    <input placeholder="0.0"></input>  
                </div>

            	<button>Swap</button>
            </div>
        )

    }
    else if (walletAvailable) {
        return (
            <div className="Page WalletAvailable">
                <LDSSpinner></LDSSpinner>
                <h1>
                    Unlock your wallet and enable dApp to continue.
                </h1>
            </div>
        )

    }

    return (
        <div className="Page NoWallet">
            {
            }
        </div>    
    )
}
