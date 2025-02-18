import React, { useState, useEffect } from "react";
import faqData from "./faqData";
import "./pagestyles.css";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(faqData);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = faqData.filter((faq) =>
      faq.question.toLowerCase().includes(value)
    );
    setFilteredQuestions(filtered);
  };

  const handleClick = (index) => {
    setSelectedQuestion(index === selectedQuestion ? null : index);
  };

  const renderAnswer = () => {
    if (selectedQuestion !== null) {
      const selectedFaq = filteredQuestions[selectedQuestion];
      return (
        <div className="faq-answer">
          <h2>{selectedFaq.question}</h2>
          <p>{selectedFaq.answer}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="faq">
      <div className="sample-questions">
        <h2>Frequently Asked Questions</h2>
        <ul>
          {faqData.slice(0, 6).map((faq, index) => (
            <li key={index} onClick={() => handleClick(index)}>
              {faq.question}
            </li>
          ))}
        </ul>
      </div>
      <div className="faq-container">
        <h1>How can we help?</h1>
        <input
          type="text"
          placeholder="Type your question"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="faq-list">
          {filteredQuestions.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => handleClick(index)}>
                {faq.question}
              </div>
            </div>
          ))}
        </div>
        {renderAnswer()}
      </div>
    </div>
  );
};

export default FAQ;

