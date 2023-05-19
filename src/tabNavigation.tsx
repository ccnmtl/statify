import React from 'react';

export const TabNav: React.FC = () => {

    return (
        <>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <a className="nav-link " href="#">
                    Draw Data Points
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                    Compare Genres
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">
                    Observe Feature Changes</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                    Observe Histograms</a>
                </li>
            </ul><p className="p-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                dictum, elit ac cursus pharetra, tellus dui interdum lorem, ut
                gravida diam nibh id dui. Quisque ut augue est. Proin quam
                velit, vulputate id ullamcorper non, dapibus eu dui. Donec
                cursus dolor at nisl lacinia hendrerit. In eros magna,
                dignissim in nibh nec, bibendum eleifend dui. Cras ut sapien eu
                quam placerat luctus id ut lectus. Morbi quis pretium mauris.
                Sed sed magna quis nisi molestie faucibus.
            </p>
        </>

    );
};