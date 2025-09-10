import React from 'react';
import Logo from './images/logo-footer-ctl.svg';
import {Link} from 'react-router-dom';
import { PageSelect } from './common';

export const Footer: React.FC<PageSelect> = (
    {selected, setSelected}: PageSelect
) => {

    return (

        <footer className='bg-dark pt-2 pb-5 navbar-dark mt-auto'
            id='footer-global'
        >
            <ul className='navbar-nav footer'>
                <li className='nav-item me-5'>
                    <Link to='/about/'
                        className='nav-link'
                        onClick={() => setSelected('/about/')}
                        title='About'>
                        {
                            selected === '/about/' ?
                                <strong>About</strong> : 'About'
                        }
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
                </a>
            </span>

        </footer>
    );
};