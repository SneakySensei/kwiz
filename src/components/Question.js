import { useEffect, useState } from "react";
import styled from "styled-components";

const QuestionContainer = styled.section`
  font-size: 14pt;

  .options {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 1fr;
    gap: 2rem;

    button {
      font-size: 11pt;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      @media screen and (max-width: 450px) {
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
      }
    }
  }
`;

const OptionButton = styled.button`
  &:disabled {
    ${(props) =>
      props.selected || props.correct
        ? "border : 1px solid black; border-style: outset; border-radius: 2px;"
        : ""}
    background-color: ${(props) =>
      props.selected ? "black" : props.correct ? "white" : ""};
    color: ${(props) =>
      props.selected ? "white" : props.correct ? "black" : ""};
  }
`;

const Question = ({
  question,
  options,
  correctOption,
  handleCorrectAnswer,
  handleWrongAnswer,
}) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleClick = (e) => {
    // e.preventDefault();
    setHasAnswered(true);
    setSelectedAnswer(e.target.id);
    if (e.target.id === correctOption) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  var [optionsList, setOptionList] = useState([]);

  useEffect(() => {
    setOptionList(shuffle(options));
  }, [options]);

  return (
    <QuestionContainer>
      {unescape(question)}
      <div className="options">
        {optionsList.map((option, index) => (
          <OptionButton
            correct={option === correctOption}
            selected={option === selectedAnswer}
            disabled={hasAnswered}
            key={option}
            id={option}
            onClick={handleClick}
          >
            {unescape(option)}
          </OptionButton>
        ))}
      </div>
    </QuestionContainer>
  );
};

export default Question;
