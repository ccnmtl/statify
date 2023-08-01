import React, { useEffect } from 'react';
import { AssignmentData } from '../common';

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
        evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const target = evt.currentTarget;
        setAnswers(() => {
            answers[questionId] = target.value;
            return answers;
        });
        const data = JSON.parse(
            window.localStorage.getItem(module)) as AssignmentData[];
        data[0].answers = answers;

        window.localStorage.setItem(
            module, JSON.stringify(data));

    };

    const setAnswerStorage = (module: string) => {

        const data = JSON.parse(
            window.localStorage.getItem(module)) as AssignmentData[];

        if(data) {
            if (Object.keys(data[0].answers).length > 0) {
                const localAnswers: object = data[0].answers;

                if(localAnswers[questionId]){
                    setAnswers(() => {
                        // eslint-disable-next-line max-len
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        answers[questionId] = localAnswers[questionId];
                        return answers;
                    });
                }
            }
        }
    };

    useEffect(() => {
        setAnswerStorage(module);

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
                defaultValue={answers[questionId]}
                rows={3}>
            </textarea>

        </div>
    );
};