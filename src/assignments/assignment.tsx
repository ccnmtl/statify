import React from 'react';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import { Answer } from './answer';
import { AssignmentDocument } from './pdfDocument';


interface AssignmentProps {
    questions: string[];
}


export const Assignment: React.FC<AssignmentProps>  = (
    {questions}
) => {
    const [answers, setAnswers] = React.useState({});

    const generatePdfDocument = async() => {
        const blob = await pdf((
            <AssignmentDocument
                questions={questions}
                answers={answers}
            />
        )).toBlob();
        saveAs(blob, 'test-pdfs');
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
                                setAnswers={setAnswers} />
                        </div>
                    );
                })}

                <div className={'mb-3'}>
                    <label htmlFor={'exampleFormControlTextarea1'}
                        className={'form-label'}>3. Build a report
                    </label> <br />
                    <button
                        onClick={() => void generatePdfDocument()}
                        className={'btn btn-primary btn-statify'}>
                                Create PDF
                    </button>
                </div>
            </div>
        </>

    );
};