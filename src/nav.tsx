import React, { useState } from 'react';
import Logo from './images/logo.svg';
import { Link } from 'react-router-dom';

export const Nav: React.FC = () => {

    const [selected, setSelected] = useState(location.pathname);

    const path = [
        ['Introduction', '/'],
        ['Glossary', '/glossary/'],
        ['1.Descriptive Statistics', '/descriptive/'],
        ['2.Inferential Statistics', '/inferential/'],
        ['3.Comparing Genres', '/comparative/'],
        ['4.Confidence Intervals', '/confidence/']];

    return (
        <>
            <nav id='nav-global'
                className='navbar navbar-expand-lg navbar-dark bg-dark'
                data-bs-theme='dark'>
                <div className='container-fluid'>
                    <Link to='/' className='navbar-brand'
                        onClick={() => setSelected('/')}
                    >
                        <img src={Logo} alt='Logo' height='80'
                            className='d-inline-block align-text-top'></img>
                    </Link>
                    <button className='navbar-toggler' type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse'
                        id='navbarSupportedContent'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            {path.map((item, key) => (
                                <li className='nav-item' key={key}>
                                    <Link to={item[1]}
                                        className='nav-link'
                                        onClick={() => setSelected(item[1])}
                                    >
                                        {selected === item[1] ?
                                            <strong>{item[0]}</strong> :
                                            item[0]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>);
};
