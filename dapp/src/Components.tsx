import React from 'react';
import './styles/Components.scss'

interface NavbarProps {}
export const Navbar : React.FunctionComponent<NavbarProps> = props => {
    return (
        <div className="NavbarWrapper">
            <div className="Navbar">
                { props.children }
            </div>
            <div className="CollapsedNavbar">

            </div>
        </div>
    )
}

export const LDSSpinner = () => {
    return <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
}