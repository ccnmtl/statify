import React from 'react';
import Logo from './images/logo-ctl-color.png';
import {Link} from 'react-router-dom';

export const Footer: React.FC = () => {

    return (

        <footer className='bg-dark pt-2 pb-5 navbar-dark' id='nav-global'>
            <ul className='navbar-nav footer'>
                <li className='nav-item me-5'>
                    <Link to='/about/'
                        className='nav-link'
                        title='About'>
                        About
                    </Link>
                </li>
                <li className='nav-item'>
                    <a href={'mailto:ctl-statify@columbia.edu'}
                        className={'nav-link'}>
                            Contact Us
                    </a>
                </li>
            </ul>

            <span itemScope itemType='http://schema.org/EducationalOrganization'>
                <a href='http://ctl.columbia.edu' target='_blank' itemProp='url'
                    title='Center for Teaching and Learning at
                    Columbia University'
                    rel='noreferrer'>
                    <img src={Logo}
                        className='mx-auto d-block img-fluid mt-3'
                        alt='Center for Teaching and Learning
                        at Columbia University'
                        itemProp='logo' width='290' />
                    <span className='sr-only' itemProp='name'>
            Center for Teaching and Learning at Columbia University
                    </span>
                </a>
            </span>

        </footer>
    );
};