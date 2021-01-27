/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import db from '../db.json';

function QuestionWidget({ questionIndex, questionTotal, question, handleSubmit }) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Questão
          {` ${questionIndex + 1} `}
          de
          {` ${questionTotal} `}
        </h3>
      </Widget.Header>
      <Widget.Content>
        <img alt="Descrição" src="https://placehold.it/50x50" />
        <h2>
          {`${question.title}`}
        </h2>
        <p>
          {`${question.description}`}
        </p>
        <form onSubmit={(infosDoEvento) => {
          infosDoEvento.preventDefault();
          handleSubmit();
          // validação
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Widget.Button name="botãoDeJogar" type="submit">
            Confirmar
          </Widget.Button>
        </form>
      </Widget.Content>
    </Widget>
  )
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = React.useState(0  );
  const questionTotal = db.questions.length;
  const currentQuestion = db.questions[questionIndex];
  React.useEffect(() => {
    // Fetch
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function getResults() {
    React.useEffect(() => {
      // Fetch
      setTimeout(() => {
        setScreenState(screenStates.RESULT);
      }, 1 * 1000);
    }, []);
  }
  function handleSubmit() {
    console.log(questionIndex);
    console.log(questionTotal);
    if (questionIndex < questionTotal - 1) setQuestionIndex(questionIndex + 1);
    else console.log('Resultados');
  }

  return (
    <>
      <>
        <Head>
          <title>
            LoreQuiz - Questão
            {` ${questionIndex + 1} `}
            de
            {` ${questionTotal} `}
          </title>
          <meta og-image={({ theme }) => theme.bg} />
        </Head>
        <QuizBackground>
          <QuizContainer>
            <QuizLogo />
            {screenState === 'QUIZ'
            && (
            <QuestionWidget
              questionIndex={questionIndex}
              questionTotal={questionTotal}
              question={currentQuestion}
              handleSubmit={handleSubmit}
            />
            )}
            {screenState === 'LOADING' && (
              <img alt="Loading" style={{ width: '150px', height: '150px' }} src="https://i.pinimg.com/originals/3e/90/e8/3e90e8bfe2328d42174d3c3743977cdf.png" />
            )}
            {screenState === 'RESULT' && (
            <div>
              Acertou tudo
            </div>
            )}
            <Footer />
          </QuizContainer>
          <GitHubCorner projectUrl="https://github.com/PipsQueen/aluraquiz-base" />
        </QuizBackground>
      </>
    </>
  );
}
