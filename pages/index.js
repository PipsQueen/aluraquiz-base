import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <>
      <Head>
        <title>{db.title}</title>
        <meta og-image={({ theme }) => theme.bg} />
      </Head>
      <QuizBackground>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                {db.description}
              </p>
            </Widget.Content>
            <Widget.Content>
              <form onSubmit={(infosDoEvento) => {
                infosDoEvento.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
              >
                <Widget.Input
                  name="nomeDoUsuário"
                  onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                  placeholder="Coloca seu nome pra jogar :)"
                />
                <Widget.Button name="botãoDeJogar" type="submit" disabled={name.length === 0}>
                  JOGAR
                </Widget.Button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Content>
              <h2>Quizes da Turma</h2>
              <p>Placeholder nervoso mesmo</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/PipsQueen/aluraquiz-base" />
      </QuizBackground>
    </>
  );
}
