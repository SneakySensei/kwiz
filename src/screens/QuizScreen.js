import { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

import quizList from "../models/questions.json";

import Question from "../components/Question";

const Progress = styled.div`
  background-color: #a9aaa9;
  height: 0.75rem;
  width: ${(props) => props.percent}%;
`;

const Page = styled.main`
  background-color: white;
  height: calc(100vh - 1rem);
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  main {
    padding: 2rem 4rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media screen and (max-width: 450px) {
      padding: 2rem;
    }

    header {
      margin-bottom: 2.5rem;
      h1 {
        margin: 0;
        font-weight: 500;
        color: #494949;
      }
      span {
        color: #909090;
        font-size: 11pt;
      }
      section {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 0.25rem;

        svg {
          margin-right: 0.25rem;
        }
      }
    }

    .prompt {
      text-align: center;

      div {
        font-size: 20pt;
        font-weight: 500;
        margin: 2rem 0 1rem 0;
      }
      button {
        padding: 0.5rem 1rem;
        font-size: 12pt;
      }
      span {
        font-size: 16pt;
        font-weight: 500;
      }
    }

    .spacer {
      flex: 1;
    }

    footer {
      section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 11pt;
      }
    }
  }
`;

const Score = styled.div`
  position: relative;
  border-radius: 0.5rem;
  border: 1px solid black;
  height: 2rem;
  overflow: hidden;

  .min {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => props.minScore}%;
    background-color: black;
    z-index: 10;
  }
  .current {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => props.currentScore}%;
    background-color: #717171;
    z-index: 5;
  }
  .max {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => props.maxScore}%;
    background-color: #d2d2d2;
  }
`;

const QuizScreen = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [message, setMessage] = useState("Correct!");

  const handleCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1);
    setHasAnswered(true);
    setMessage("Correct!");
  };
  const handleWrongAnswer = () => {
    setWrongAnswers(wrongAnswers + 1);
    setHasAnswered(true);
    setMessage("Sorry!");
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentQuestion(currentQuestion + 1);
    setHasAnswered(false);
  };

  return (
    <Page>
      <Progress percent={((currentQuestion + 1) * 100) / quizList.length} />
      <main>
        <header>
          <h1>Question {currentQuestion + 1} of 20</h1>
          <span>{unescape(quizList[currentQuestion].category)}</span>
          <section>
            {quizList[currentQuestion].difficulty === "easy" && (
              <FaStar color="#000000" size={14} />
            )}
            {quizList[currentQuestion].difficulty === "medium" && (
              <FaStar color="#000000" size={14} />
            )}
            {quizList[currentQuestion].difficulty === "medium" && (
              <FaStar color="#000000" size={14} />
            )}

            {quizList[currentQuestion].difficulty === "hard" && (
              <FaStar color="#000000" size={14} />
            )}
            {quizList[currentQuestion].difficulty === "hard" && (
              <FaStar color="#000000" size={14} />
            )}
            {quizList[currentQuestion].difficulty === "hard" && (
              <FaStar color="#000000" size={14} />
            )}
          </section>
        </header>
        <Question
          key={currentQuestion}
          question={quizList[currentQuestion].question}
          options={[
            ...quizList[currentQuestion].incorrect_answers,
            quizList[currentQuestion].correct_answer,
          ]}
          correctOption={quizList[currentQuestion].correct_answer}
          handleCorrectAnswer={handleCorrectAnswer}
          handleWrongAnswer={handleWrongAnswer}
        />
        {hasAnswered && (
          <section className="prompt">
            <div>{message}</div>
            {currentQuestion + 1 < quizList.length && (
              <button onClick={handleNext}>Next Question</button>
            )}
            {currentQuestion + 1 >= quizList.length && (
              <span>Quiz Completed.</span>
            )}
          </section>
        )}
        <div className="spacer"></div>
        <footer>
          <section>
            <span>
              Score:{" "}
              {(
                (correctAnswers * 100) / (correctAnswers + wrongAnswers) || 0
              ).toFixed(0)}
              %
            </span>
            <span>
              Max Score:{" "}
              {(
                ((quizList.length - wrongAnswers) * 100) /
                quizList.length
              ).toFixed(0)}
              %
            </span>
          </section>
          <Score
            minScore={(correctAnswers * 100) / quizList.length}
            currentScore={
              (correctAnswers * 100) / (correctAnswers + wrongAnswers)
            }
            maxScore={
              ((quizList.length - wrongAnswers) * 100) / quizList.length
            }
          >
            <div className="min"></div>
            <div className="current"></div>
            <div className="max"></div>
          </Score>
        </footer>
      </main>
    </Page>
  );
};

export default QuizScreen;
