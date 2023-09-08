import React from 'react';
import Logo from '../images/logo-bw.png';
import {
    Document, Page, Text, StyleSheet, Image, Font, View
} from '@react-pdf/renderer';

Font.register({
    family: 'Poppins',
    src: 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJA.ttf'
});

Font.register({
    family: 'PoppinsBold',
    src: 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1s.ttf'
});


// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    moduleTitle: {
        fontSize: 20,
        marginBottom: 8,
        fontFamily: 'PoppinsBold'
    },
    questionTitle: {
        fontSize: 15,
        marginBottom: 8,
        fontFamily: 'PoppinsBold'
    },
    answerTitle: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'PoppinsBold'
    },
    answer: {
        fontSize: 12,
        marginBottom: 10,
        fontFamily: 'Poppins'
    },
    question: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'Poppins'
    },
    image: {
        width: '100%',
        height: '50%',
        borderColor: 'black',
        backgroundColor: 'black',
        marginBottom: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 60,
        marginRight: 10,
    },
    student: {
        fontFamily: 'Poppins',
        fontSize: 12,
    }
});

interface AssignmentDocumentProps {
    questions: string[];
    answers: object;
    screenshot: string | null;
    uni: string;
    name: string;
    module: string;
}
const d = new Date();
const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;


export const AssignmentDocument: React.FC<AssignmentDocumentProps>  = (
    {questions, answers, screenshot, name, uni, module}
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
                <Text style={styles.answerTitle}>
                    Answer
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
                <View style={styles.header} fixed>
                    <View style={styles.headerLeft}>
                        <Image
                            source={Logo} style={styles.logo} />
                    </View>
                    <View style={styles.student}>
                        <Text>
                            {name}
                        </Text>
                        <Text>
                            {uni}
                        </Text>
                        <Text>
                            {date}
                        </Text>
                    </View>

                </View>
                <Text style={styles.moduleTitle}>
                    {module.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
                {createQA}
                {(screenshot) && (
                    <>
                        <Text style={styles.answerTitle} break>
                        Evidence (Screenshot)
                        </Text>
                        <Image
                            style={styles.image}
                            source={screenshot} />
                    </>
                )}
            </Page>
        </Document>
    );
};
