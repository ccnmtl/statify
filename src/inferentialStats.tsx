import React from 'react';
import { TabNav } from './tabNavigation';

export const InferentialStats: React.FC = () => {
    return (
        <>
            <section id="top">
                <div className="container-fluid">
                    <h1 className={'py-4 px-3'}>Inferential Stats</h1>
                    <TabNav />
                </div>
            </section>
        </>
    );
};