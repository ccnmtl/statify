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
            <ul className={'nav nav-pills d-flex'}>
                {tabsInfo.map((tab: TabData, idx) => {
                    return (
                        <li key={idx} className='nav-item'>
                            <a className={activeTab == idx ?
                                'nav-link active' : 'nav-link'} href='#'
                            data-active-tab={idx}
                            data-cy={idx}
                            onClick={handleSetActiveTab}>
                                {tab.title}
                            </a>
                        </li>
                    );
                })}
                {document.getElementById('objectiveModal') &&
                    <li
                        className={'nav-item ms-auto'}
                    >
                        <button
                            className={'nav-link'}
                            data-bs-toggle={'modal'}
                            data-bs-target={'#objectiveModal'}
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' width='16'
                                height='16' fill='currentColor'
                                className='bi bi-list' viewBox='0 0 16 16'
                            >
                                <path fillRule='evenodd' d={'M2.5 12a.5.5 0 ' +
                                    '0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1' +
                                    '-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0' +
                                    ' 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 ' +
                                    '1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.' +
                                    '5-.5z'}/>
                            </svg>
                            <span className='mx-2'>Learning Objectives</span>
                        </button>
                    </li>
                }
                {document.getElementById('keyTermModal') &&
                    <li
                        className={'nav-item'}
                    >
                        <button
                            className={'nav-link'}
                            data-bs-toggle={'modal'}
                            data-bs-target={'#keyTermModal'}
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' width='16'
                                height='16' fill='currentColor'
                                className='bi bi-info-circle-fill'
                                viewBox='0 0 16 16'
                            >
                                <path d={'M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' +
                                    'm.93-9.412-1 4.705c-.07.34.029.533.304.5' +
                                    '33.194 0 .487-.07.686-.246l-.088.416c-.2' +
                                    '87.346-.92.598-1.465.598-.703 0-1.002-.4' +
                                    '22-.808-1.319l.738-3.468c.064-.293.006-.' +
                                    '399-.287-.47l-.451-.081.082-.381 2.29-.2' +
                                    '87zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'}/>
                            </svg>
                            <span className='mx-2'>Key Terms</span>
                        </button>
                    </li>
                }
            </ul>
            <p className={'p-3'}>
                {tabsInfo[activeTab].info}
            </p>
        </>

    );
};