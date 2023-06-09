import React from 'react';


interface AnswerProps {
    questionId: number;
    answers: object;
    setAnswers: React.Dispatch<React.SetStateAction<object>>;
}
export const Answer: React.FC<AnswerProps> = (
    {questionId, answers, setAnswers}
) => {

    const handleAnswers = (
        evt: React.ChangeEvent<HTMLTextAreaElement>,): void => {

        setAnswers(() => {
            answers[questionId] = evt.currentTarget.value;
            return answers;
        });
    };

    return (
        <div className={'mb-3'}>
            <label htmlFor={'exampleFormControlTextarea1'}
                className={'form-label'}>
                Why? Explain.
            </label>
            <textarea
                className={'form-control'}
                id={'exampleFormControlTextarea1'}
                name={'answer'}
                onChange={handleAnswers}
                rows={3}>
            </textarea>

        </div>
    );
};