import React from 'react';
import logo from '../../images/logo.png';

export default function ApplicationLogo({ className }) {
    return (
        <img className={className} src={logo} alt="" />
    );
}
