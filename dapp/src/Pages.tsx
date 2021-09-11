import React from 'react';
import './styles/Pages.scss';

export function HeaderPage(props: {header: JSX.Element, superHeader?: JSX.Element, body: JSX.Element, footer?: JSX.Element}) {
    return (
        <div className="Page">
            <h3>
                { props.superHeader }
            </h3>
            <h2>
                { props.header }
            </h2>
            <p>
                { props.body }
            </p>
            <p className="Footer">
                { props.footer }
            </p>
        </div>
    )
}

export default interface Page {
    page: JSX.Element,
    pageProps: {
        logoImage?: string,
        hideLogo?: boolean
    }
}