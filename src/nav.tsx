import React from 'react';
import Logo from './images/logo.svg';

export const Nav: React.FC = () => {

    return (
        <>
            <nav id="nav-global" className="navbar navbar-expand-lg bg-dark"
                data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={Logo} alt="Logo" height="80"
                            className="d-inline-block align-text-top"></img>
                    </a>
                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse"
                        id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Introduction
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    href="/descriptive">Descriptive Statistics
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    href="/inferential">Inferential Statistics
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    href="/comparative">Comparing Genres
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    href="/confidence">Confidence Intervals
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>);
};
