import React, { useEffect } from 'react';

interface AnswerProps {
    questionId: number;
    answers: object;
    setAnswers: React.Dispatch<React.SetStateAction<object>>;
    module: string;
}
export const Answer: React.FC<AnswerProps> = (
    {questionId, module, answers, setAnswers}
) => {

    const handleAnswers = (
        evt: React.ChangeEvent<HTMLTextAreaElement>,): void => {
        setAnswers(() => {
            answers[questionId] = evt.currentTarget.value;
            return answers;
        });

        window.localStorage.setItem(
            module+questionId.toString(), evt.target.value);

    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const prevAnswer = answers[questionId] ? answers[questionId] : '';

    useEffect(() => {

        const answerStorage = window.localStorage.getItem(
            module+questionId.toString()
        );
        console.log('answee storage', answerStorage)
        if(answerStorage){
            setAnswers(() => {
                answers[questionId] = answerStorage;
                return answers;
            });
        }

        console.log('answers', answers);
        console.log('one answer', answers[questionId])

    },[]);

    return (
        <div className={'mb-3'}>
            <label htmlFor={`answer-${module + questionId.toString()}`}
                className={'form-label'}>
                Why? Explain.
            </label>
            <textarea
                className={'form-control'}
                id={`answer-${module + questionId.toString()}`}
                name={'answer'}
                onChange={handleAnswers}
                // eslint-disable-next-line max-len
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                defaultValue={prevAnswer}
                rows={3}>
            </textarea>

        </div>
    );
};