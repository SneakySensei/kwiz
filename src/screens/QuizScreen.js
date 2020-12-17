import { useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

import questions from "../models/questions.json";

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

    .question {
      font-size: 14pt;

      .options {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-auto-rows: 1fr;
        gap: 2rem;

        button {
          font-size: 11pt;
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
  const [progress, setProgress] = useState(80.0);

  return (
    <Page>
      <Progress percent={progress} />
      <main>
        <header>
          <h1>Question 16 of 20</h1>
          <span>Entertainment: Board Games</span>
          <section>
            <FaStar color="#000000" size={14} />
            <FaStar color="#000000" size={14} />
            <FaStar color="#000000" size={14} />
          </section>
        </header>
        <section className="question">
          At the start of a standard game of Monopoly, if you throw a double
          six, which square would you land on?
          <div className="options">
            <button>Chance</button>
            <button>Water Works</button>
            <button>Electric Company</button>
            <button>Community Chest</button>
          </div>
        </section>
        <section className="prompt">
          <div>Correct!</div>
          <button>Next Question</button>
        </section>
        <div className="spacer"></div>
        <footer>
          <section>
            <span>Score: 69%</span>
            <span>Max Score: 75%</span>
          </section>
          <Score minScore={50} currentScore={69} maxScore={75}>
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
