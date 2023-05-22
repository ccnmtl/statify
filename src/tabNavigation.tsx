import React from 'react';
import { TabData } from './common';

interface TabNavProps {
    tabsInfo: TabData[];
    activeTab: number;
    setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export const TabNav: React.FC<TabNavProps> = (
    {tabsInfo, activeTab, setActiveTab}: TabNavProps
) => {
    const handleSetActiveTab = (
        e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        setActiveTab(Number(e.currentTarget.dataset.activeTab));
    };

    return (
        <>
            <ul className="nav nav-pills">
                {tabsInfo.map((tab: TabData, idx) => {
                    return (
                        <li key={idx} className='nav-item'>
                            <a className={activeTab == idx ?
                                'nav-link active' : 'nav-link'} href='#'
                            data-active-tab={idx}
                            onClick={handleSetActiveTab}>
                                {tab.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <p className="p-3">
                {tabsInfo[activeTab].info}
            </p>
        </>

    );
};