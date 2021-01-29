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

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultados
      </Widget.Header>
      <Widget.Content>
        <h1>
          Você acertou
          {` ${results.filter((result) => result).length} `}
          questões!
        </h1>
        <div style={{ justifyContent: 'center' }}>
          <img alt="Fiddlesticks comemorando jogando confetes para o alto" src="https://i.imgur.com/POs0Syl.gif" />
        </div>
        <ul>
          {results.map((result, index) => {
            const resultId = `result__${index}`;
            return (
              <li key={resultId}>
                #0
                {`${index + 1} `}
                Resultado:
                {result === true
                  ? ' Acertou!'
                  : ' Errou! '}
              </li>
            );
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function ResultAlert({ isQuestionSubmitted, isCorrect }) {
  const position = isQuestionSubmitted ? '-5%' : '0%';
  const opacity = isQuestionSubmitted ? '100%' : '0%';

  const style = {
    position: 'absolute',
    top: '10',
    border: '0',
    right: '0',
    zIndex: '20',
    transformOrigin: 'right',
    transform: `translateX(${position})`,
    opacity: `${opacity}`,
    transition: '0.2s',
  };
  return (
    <Widget style={style}>
      <Widget.Alert>
        {isCorrect && <h2>Resposta certa :)</h2>}
        {!isCorrect && <h2>Resposta incorreta :(</h2>}
      </Widget.Alert>
    </Widget>
  );
}

function QuestionWidget({
  questionIndex, questionTotal, question, onSubmit, addResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [isQuestionSubmitted, setQuestionSubmitted] = React.useState(false);
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const isCorrect = (question.answer === selectedAlternative);
  const isAlternativeSelected = selectedAlternative !== undefined;

  return (
    <>
      <Widget>
        <Widget.Header>
          <h3>
            Questão
            {` ${questionIndex + 1} `}
            de
            {` ${questionTotal} `}
          </h3>
        </Widget.Header>
        <ResultAlert isQuestionSubmitted={isQuestionSubmitted} isCorrect={isCorrect} />
        <Widget.Content>
          <div style={{ justifyContent: 'center', display: 'flex' }}>
            <img alt="" src={`${question.image}`} style={{ maxWidth: '50%' }} />
          </div>
          <h2>
            {`${question.title}`}
          </h2>
          <p>
            {`${question.description}`}
          </p>
          <form onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setQuestionSubmitted(true);

            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                  key={alternativeId}
                >
                  <input
                    id={alternativeId}
                    name={questionId}
                    type="radio"
                    onChange={() => {
                      setSelectedAlternative(alternativeIndex);
                    }}
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
            <Widget.Button name="botãoDeJogar" type="submit" disabled={!isAlternativeSelected}>
              Confirmar
            </Widget.Button>
          </form>
        </Widget.Content>
      </Widget>
    </>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const questionTotal = db.questions.length;
  const currentQuestion = db.questions[questionIndex];
  React.useEffect(() => {
    // Fetch
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 0.9 * 1000);
  }, []);

  function onSubmit() {
    if (questionIndex < questionTotal - 1) setQuestionIndex(questionIndex + 1);
    else setScreenState(screenStates.RESULT);
  }

  function addResult(result) {
    setResults([...results, result]);
  }
  return (
    <>
      <Head>
        <title>
          LoreQuiz - Questão
          {` ${questionIndex + 1} `}
          de
          {` ${questionTotal} `}
        </title>
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
            onSubmit={onSubmit}
            addResult={addResult}
          />
          )}
          {screenState === 'LOADING' && (
            <img alt="Loading - Vi dando piscando um olho e apontando para frente sorrindo" style={{ width: '300px', height: '300px' }} src="https://i.imgur.com/0i1W5cB.gif" />
          )}
          {screenState === 'RESULT' && <ResultWidget results={results} />}
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/PipsQueen/aluraquiz-base" />
      </QuizBackground>
    </>
  );
}
