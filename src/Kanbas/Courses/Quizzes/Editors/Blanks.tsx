import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface BlanksProps {
  onSave: (newQuestion: any) => void;
  onUpdate: (updatedQuestion: any) => void;
  onCancel: () => void;
  question?: any;
}

function Blanks({ onSave, onUpdate, onCancel, question }: BlanksProps) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [points, setPoints] = useState(1);
  const [questionContent, setQuestionContent] = useState("");
  const [blanks, setBlanks] = useState([{ answer: "" }]); // Each blank has one answer

  useEffect(() => {
    if (question) {
      setQuestionTitle(question.title);
      setPoints(question.points);
      setQuestionContent(question.question_content);
      setBlanks(question.answers.map((a: any) => ({ answer: a.content })));
    }
  }, [question]);

  const handleTitleChange = (e: any) => {
    setQuestionTitle(e.target.value);
  };

  const handlePointsChange = (e: any) => {
    setPoints(e.target.value);
  };

  const handleQuestionChange = (e: string) => {
    setQuestionContent(e);
  };

  const handleAnswerChange = (index: number, e: any) => {
    const newBlanks = [...blanks];
    newBlanks[index].answer = e.target.value;
    setBlanks(newBlanks);
  };

  const addBlank = () => {
    setBlanks([...blanks, { answer: "" }]);
  };

  const removeBlank = (index: number) => {
    const newBlanks = blanks.filter((_, i) => i !== index);
    setBlanks(newBlanks);
  };

  const handleSave = () => {
    if (blanks.length === 0) {
      alert("Please add at least one blank.");
      return;
    }
    if (blanks.some((blank) => blank.answer === "")) {
      alert("Please fill in all blanks or remove empty blanks.");
      return;
    }
    if (question) {
      const updatedQuestion = {
        _id: question._id,
        title: questionTitle,
        points: points,
        question_content: questionContent,
        answers: blanks.map((blank) => ({ content: blank.answer })),
        type: "FILL IN BLANKS",
      };
      onUpdate(updatedQuestion);
      console.log("Updated", updatedQuestion);
    } else {
      const newQuestion = {
        title: questionTitle,
        points: points,
        question_content: questionContent,
        answers: blanks.map((blank) => ({ content: blank.answer })),
        type: "FILL IN BLANKS",
      };
      onSave(newQuestion);
      console.log("Saved", newQuestion);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <h3>Fill in the Blanks Question Editor</h3>
      <div>
        <input
          className="me-2"
          type="text"
          placeholder="Question Title"
          value={questionTitle}
          onChange={handleTitleChange}
        />
        <input
          className="float-end"
          type="number"
          placeholder="Points"
          value={points}
          onChange={handlePointsChange}
        />
        <label className="float-end me-2" htmlFor="Points">
          Points:
        </label>
      </div>
      <hr />
      <div>
        <h6>
          Enter your question text with blanks, then define correct answers for
          each blank. <br /> Students will see the question followed by a small
          text box to type their answer. <br /> Example questions with their
          corresponding blanks:
          <br />2 + 2 = __1__
          <br />4 + 4 = __2__
        </h6>
        <h5>Question:</h5>
        <Editor
          apiKey="e1ioznczok5yus73u6oqwh6dbb6gszw6rln4i87qmz9y4hc2"
          value={questionContent}
          onEditorChange={handleQuestionChange}
        />
        <br />
        <h5>Answers:</h5>
        {blanks.map((blank, index) => (
          <div key={index}>
            <label>{`Answer for Blank ${index + 1}: `}</label>
            <input
              className="ms-2 me-2"
              type="text"
              value={blank.answer}
              onChange={(e) => handleAnswerChange(index, e)}
              placeholder="Enter a correct answer"
            />
            <button
              className="btn btn-danger mb-2"
              onClick={() => removeBlank(index)}
            >
              Remove Blank
            </button>
          </div>
        ))}
        <button className="btn btn-primary mb-2" onClick={addBlank}>
          Add Blank
        </button>
        <br />
        <button className="btn btn-secondary me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-success" onClick={handleSave}>
          Update Question
        </button>
      </div>
    </div>
  );
}

export default Blanks;
