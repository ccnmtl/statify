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
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    }
});

interface AssignmentDocumentProps {
    questions: string[];
    answers: object;
    screenshot: any;
}


export const AssignmentDocument: React.FC<AssignmentDocumentProps>  = (
    {questions, answers, screenshot}
) =>
{
    const createQA = questions.map((question, index) => {
        return (
            <>
                <Image
                    style={styles.image}
                    // eslint-disable-next-line max-len
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    src={screenshot} />

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
