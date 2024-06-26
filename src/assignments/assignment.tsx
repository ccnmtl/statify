import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { Answer } from './answer';
import { AssignmentDocument } from './assignmentDocument';
import html2canvas from 'html2canvas';
import { AssignmentData, failureCallback } from '../common';
import { ImagePreview } from './imagePreview';


interface AssignmentProps {
    questions: string[];
    module: string;
    seed: string;
}


export const Assignment: React.FC<AssignmentProps>  = (
    {questions, module, seed}
) => {
    const [answers, setAnswers] = useState({});
    const [screenshot, setScreenshot] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const [uni, setUni] = useState<string>('');
    const [uniError, setUniError] = useState<boolean>(false);
    const [nameError, setNameError] = useState<boolean>(false);

    const handleName = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        setName(evt.target.value);
        setNameError(false);
        const data = JSON.parse(
            window.localStorage.getItem(module)) as AssignmentData[];
        data[0].name = evt.target.value;
        window.localStorage.setItem(
            module, JSON.stringify(data));
    };

    const handleUni = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        setUni(evt.target.value);
        setUniError(false);
        const data = JSON.parse(
            window.localStorage.getItem(module)) as AssignmentData[];
        data[0].uni = evt.target.value;
        window.localStorage.setItem(
            module, JSON.stringify(data));
    };

    const generatePdfDocument = async() => {
        if(name === '') {
            setNameError(true);
        } else if(uni === '') {
            setUniError(true);
        } else {
            const blob = await pdf((
                <AssignmentDocument
                    questions={questions}
                    answers={answers}
                    screenshot={screenshot}
                    name={name}
                    module={module}
                    uni={uni}
                    seed={seed}
                />
            )).toBlob();
            saveAs(blob, `${name.replace(/ /g,'_')}_${module}`);
        }
    };

    const generateScreenshot = async() => {
        await html2canvas(document.querySelector('#capture'), {
            backgroundColor: '#00000'
        }).then(canvas => {

            const dataURL = canvas.toDataURL('image/png');
            setScreenshot([...screenshot, dataURL]);
        }, failureCallback);
    };

    const setLocalStorage = (module: string) => {

        const initData: AssignmentData = {
            answers: {},
            module: module,
            uni: uni,
            name: name,
        };
        const data = JSON.parse(
            window.localStorage.getItem(module)) as AssignmentData[];

        if (data){
            setUni(data[0].uni);
            setName(data[0].name);

            return data;
        } else {
            const assignmentState = [...new Array<AssignmentData>(initData)];
            return window.localStorage.setItem(module,
                JSON.stringify(assignmentState));
        }
    };

    const pdfButton =
        (module === 'DescriptiveStatistics' && screenshot.length === 0) ?
            true : false;

    useEffect(() => {
        setLocalStorage(module);

    },[]);

    return (
        <div id='assignment'>
            <h3>Questions</h3>
            {questions.map((question, index) => {
                return (
                    <div className='px-2' key={index}>
                        <p>
                            {index + 1}. {question}
                        </p>
                        <Answer
                            questionId={index}
                            answers={answers}
                            setAnswers={setAnswers}
                            module={module} />
                    </div>
                );
            })}

            <div className={'mb-3'}>
                <div className='row'>
                    <div className='col-4'>
                        <div>
                            <label htmlFor={'name-input'}
                                className={'form-label'}>
                                    Name:
                            </label>
                            {nameError && (
                                <span className={'text-danger fs-6 ms-5'}>
                                    * Required
                                </span>
                            )}
                        </div>
                        <input type='text'
                            className='form-control w-100 mb-4'
                            id='name-input'
                            placeholder='Name'
                            onChange={handleName}
                            defaultValue={name}
                            name="name" />
                    </div>
                    <div className='col-4'>
                        <div>
                            <label htmlFor={'uni-input'}
                                className={'form-label'}>
                                    Uni:
                            </label>
                            {uniError && (
                                <span className={'text-danger fs-6 ms-5'}>
                                    * Required
                                </span>

                            )}
                            <input type='text'
                                className='form-control w-50 mb-4'
                                id='uni-input'
                                placeholder='Uni'
                                onChange={handleUni}
                                defaultValue={uni}
                                name='uni' />
                        </div>
                    </div>
                    <div className='mx-2'>
                        {(module === 'DescriptiveStatistics') && (
                            <>
                                <ImagePreview {...{screenshot,
                                    setScreenshot}} />
                                {
                                    screenshot.length > 0 ?
                                        <p className='text-primary'>
                                            Screenshots generated
                                            : {screenshot.length}
                                        </p> :
                                        <p className='text-warning'>
                                            Must have at least 1 screenshot
                                                before the assignment can be
                                                created.
                                        </p>
                                }
                                <button
                                    onClick={() => void generateScreenshot()}
                                    className={'btn btn-primary btn-statify ' +
                                        'me-2 col-4'}>
                                    Screenshot Graph
                                </button>
                            </>
                        )}
                        <button
                            disabled={pdfButton}
                            onClick={() => void generatePdfDocument()}
                            className={'btn btn-primary btn-statify col-4'}>
                                    Create Assignment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};