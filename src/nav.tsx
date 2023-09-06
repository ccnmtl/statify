import React from 'react';
import Logo from './images/logo.svg';
import {Link} from 'react-router-dom';

export const Nav: React.FC = () => {

    return (
        <>
            <nav id='nav-global'
                className='navbar navbar-expand-lg navbar-dark bg-dark'
                data-bs-theme='dark'>
                <div className='container-fluid'>
                    <Link to='/' className='navbar-brand'>
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
                            <li className='nav-item'>
                                <Link to='/'
                                    className='nav-link'>
                                    Introduction
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/glossary/'
                                    className='nav-link'>
                                    Glossary
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/descriptive/'
                                    className='nav-link'>
                                    1.Descriptive Statistics
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/inferential/'
                                    className='nav-link'>
                                    2.Inferential Statistics
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/comparative/'
                                    className='nav-link'>
                                    3.Comparing Genres
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/confidence/'
                                    className='nav-link'>
                                    4.Confidence Intervals
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>);
};
