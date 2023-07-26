import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { Answer } from './answer';
import { AssignmentDocument } from './assignmentDocument';
import html2canvas from 'html2canvas';


interface AssignmentProps {
    questions: string[];
    module: string;
}


export const Assignment: React.FC<AssignmentProps>  = (
    {questions, module}
) => {
    const [answers, setAnswers] = useState({});
    const [screenshot, setScreenshot] = useState<string>();
    const [name, setName] = useState<string>();
    const [uni, setUni] = useState<string>();

    const handleName = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        setName(evt.target.value);
    };

    const handleUni = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        setUni(evt.target.value);
    };

    const generatePdfDocument = async() => {
        const blob = await pdf((
            <AssignmentDocument
                questions={questions}
                answers={answers}
                screenshot={screenshot}
                name={name}
                uni={uni}
            />
        )).toBlob();
        saveAs(blob, `${name}_${module}`);
    };

    const generateScreenshot = async() => {
        await html2canvas(document.querySelector('#capture'), {
            backgroundColor: '#00000'
        }).then(canvas => {

            const dataURL = canvas.toDataURL('image/png');
            setScreenshot(dataURL);
        });
    };

    const handleLocalStorage = () => {
        // Placeholder. I am thinking here is where we will save the data to
        // local storage. Only when that data is saved, we will be able to
        // download the pdf.

    };

    return (

        <>
            <div className='col-md-9'>
                <h2>Questions</h2>
                {questions.map((question, index) => {
                    return (
                        <div key={index}>
                            <p>
                                {index + 1}. {question}
                            </p>
                            <h2>
                                Answer
                            </h2>
                            <Answer
                                questionId={index}
                                answers={answers}
                                setAnswers={setAnswers}
                                module={module} />
                        </div>
                    );
                })}

                <div className={'mb-3'}>
                    <label htmlFor={'exampleFormControlTextarea1'}
                        className={'form-label'}>3. Build a report
                    </label> <br />
                    <div className='row'>
                        <div className='col-4'>
                            <label htmlFor={'name-input'}
                                className={'form-label'}>
                            Name:
                            </label>
                            <input type='text'
                                className='form-control w-100 mb-4'
                                id='name-input'
                                placeholder='Name'
                                onChange={handleName}
                                name="name" />
                        </div>
                        <div className='col-4'>
                            <label htmlFor={'uni-input'}
                                className={'form-label'}>
                            Uni:
                            </label>
                            <input type='text'
                                className='form-control w-100 mb-4'
                                id='uni-input'
                                placeholder='Uni'
                                onChange={handleUni}
                                name='uni' />
                        </div>
                    </div>
                    <button
                        onClick={() => void generateScreenshot()}
                        className={'btn btn-primary btn-statify me-2'}>
                                Screenshot Graph
                    </button>
                    <button
                        disabled={!screenshot}
                        onClick={() => void generatePdfDocument()}
                        className={'btn btn-primary btn-statify'}>
                                Create PDF
                    </button>
                </div>
            </div>
        </>

    );
};