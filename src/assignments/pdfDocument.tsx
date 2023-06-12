import React from 'react';
import {
    Document, Page, Text, StyleSheet
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    questionTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    answer: {
        fontSize: 12,
        marginBottom: 10
    },
    question: {
        fontSize: 13,
        marginBottom: 5
    }
});

interface AssignmentDocumentProps {
    questions: string[];
    answers: object;
}


export const AssignmentDocument: React.FC<AssignmentDocumentProps>  = (
    {questions, answers}
) =>
{
    const createQA = questions.map((question, index) => {
        return (
            <>
                <Text style={styles.questionTitle}>
                Question #{index + 1}
                </Text>
                <Text style={styles.question}>
                    {question}
                </Text>
                <Text style={styles.answer}>
                    {answers[index]}
                </Text>
            </>
        );

    });

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                {createQA}
            </Page>
        </Document>
    );
};
