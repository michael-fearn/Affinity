import React from 'react';
import LoginFrame from './LoginFrame/LoginFrame';
import D3Container from './../D3Container/D3Container';

export default function LoginPage (props) {
    return (
        <div>
            <LoginFrame />
            <D3Container />
        </div>
    )
}