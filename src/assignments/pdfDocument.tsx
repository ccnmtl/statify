import React from 'react';
import {
    Document, Page, Text, StyleSheet, Image
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
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
    },
    image: {
        width: '100%',
        height: '50%',
        borderColor: 'black',
        backgroundColor: 'black',
        marginBottom: 10
    }
});

interface AssignmentDocumentProps {
    questions: string[];
    answers: object;
    screenshot: string;
}


export const AssignmentDocument: React.FC<AssignmentDocumentProps>  = (
    {questions, answers, screenshot}
) =>
{
    const createQA = questions.map((question, index) => {
        return (
            <>
                <Text style={styles.questionTitle}>
                Question {index + 1}
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
                <Image
                    style={styles.image}
                    source={screenshot} />
                {createQA}
            </Page>
        </Document>
    );
};
