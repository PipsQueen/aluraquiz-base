import React from 'react';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from './index';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import db from '../db.json';

export default function QuizPage() {
  return (
    <>
      <QuizBackground>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>
                Questão 1:
                {db.questions[0]}
              </h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                {db.description}
              </p>
            </Widget.Content>
            <Widget.Content>
              <ul>
                <li>
                  Opção 1
                </li>
                <li>
                  Opção 2
                </li>
                <li>
                  Opção 3
                </li>
                <li>
                  Opção 4
                </li>
              </ul>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Content>
              <h2>Quizes da Galera</h2>
              <p>Placeholder nervoso</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/" />
      </QuizBackground>
    </>
  );
}
