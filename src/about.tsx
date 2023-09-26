import React from 'react';

export const About: React.FC = () => {
    return (
        <section className='container'>
            <div className='row m-0 p-3'>
                <div className='col-12 col-lg-7 px-2'>
                    <h1 className='mb-3'>About Statify</h1>
                    <p>
                    Using Spotify data, this project redevelops a series of
                    interactive simulations to support inquiry-based
                    learning of basic statistical concepts in Frontiers
                    of Science seminar sessions.
                    </p>

                    <h2 className='mb-3'>Faculty Partners</h2>

                    <ul className='mb-5'>
                        <li>
                    Nicholas Bock, Department of Earth & Environmental Sciences
                        </li>
                        <li>
                    Vincent FitzPatrick, Department of Biological Sciences
                        </li>
                        <li>
                    Debora Monego, Department of Chemistry
                        </li>
                    </ul>

                    <h2 className='mb-3'>
                    Center for Teaching and Learning at Columbia University
                    </h2>

                    <ul className='mb-5'>
                        <li><a href='https://ctl.columbia.edu/about/team/ross/' rel='noopener noreferrer' target='_blank'>Catherine Ross</a>, Executive Director</li>
                        <li><a href='https://ctl.columbia.edu/about/team/michael-tarnow/' rel='noopener noreferrer' target='_blank'>Michael Tarnow</a>, Learning Designer</li>
                        <li><a href='https://ctl.columbia.edu/about/team/raymond/' rel='noopener noreferrer' target='_blank'>Marc Raymond</a>, Senior Designer</li>
                        <li><a href='https://ctl.columbia.edu/about/team/dittren/' rel='noopener noreferrer' target='_blank'>Natalia Dittren</a>, Programmer</li>
                        <li><a href='https://ctl.columbia.edu/about/team/petersen/' rel='noopener noreferrer' target='_blank'>Evan Petersen</a>, Programmer</li>
                    </ul>

                    <h2 className='mb-3'>License</h2>
                    <p className='mb-5'>Statify source code is available on <a href='https://github.com/ccnmtl/statify' target='_blank' rel='noopener noreferrer'>
                    Github</a> under the<a href='https://www.gnu.org/licenses/gpl-3.0.en.html' target='_blank' rel='noopener noreferrer'> GNU GPLv3 license</a>.
                    </p>
                </div>
                <div className='col-12 col-lg-4 offset-lg-1 px-2'>
                    <h2 className='d-block d-lg-none'>
                        Questions and Feedback</h2>
                    <h2 className='h4 d-none d-lg-block'>
                        Questions and Feedback</h2>
                    <p>
                    If you’re interested in implementing this tool in your
                     teaching practice, to learn more about Statify,  or to
                     send feedback on this application, please reach out to
                     the CTL project team. Email us at&nbsp;
                        <a href='mailto:ctl-statify@columbia.edu'>
                     ctl-statify@columbia.edu.</a>
                    </p>
                </div>
            </div>
        </section>
    );
};
