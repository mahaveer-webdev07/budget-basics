import { useState } from 'react'
import './ChatbotWidget.css'
import faq from '../data/chatbotFaq.json'

// Common filler words to ignore when matching a typed question against the
// FAQ list, so a stray "a"/"is"/"the" doesn't accidentally match everything.
const STOPWORDS = new Set([
  'what', 'is', 'a', 'an', 'the', 'how', 'do', 'i', 'to', 'of', 'and',
  'in', 'on', 'for', 'my', 'can', 'should', 'does', 'are', 'you', 'me',
  'it', 'this', 'that', 'be', 'if', 'or', 'so',
])

const getKeywords = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word))

// Floating chat bubble, fixed to the bottom-right of the screen (no longer
// tied to the navbar). Clicking the bubble opens a compact chat window
// anchored above it.
export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm your budgeting assistant. Ask me anything about saving, spending, or using this app — or tap a suggestion below.",
    },
  ]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const toggleChatbot = () => setIsOpen((prev) => !prev);
  const closeChatbot = () => setIsOpen(false);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { from: "user", text };
    const lower = text.toLowerCase().replace(/[^\w\s]/g, "");

    let bestMatch = null;
    let bestScore = 0;

    faq.forEach((f) => {
      // A near-exact match (e.g. clicking a suggested question) always wins.
      if (lower.includes(f.q.replace(/[^\w\s]/g, ""))) {
        bestMatch = f;
        bestScore = Infinity;
        return;
      }
      if (bestScore === Infinity) return;

      const keywords = getKeywords(f.q);
      const score = keywords.filter((word) => lower.includes(word)).length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = f;
      }
    });

    const botReply =
      bestMatch && bestScore > 0
        ? bestMatch.a
        : "I'm not sure about that one — I can only help with basic budgeting topics like needs vs wants, saving, and using the Planner. Try one of the suggested questions below, or check the Basics section above.";

    setMessages((m) => [...m, userMsg, { from: "bot", text: botReply }]);
    setInput("");
  };

  const handleAsk = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestedClick = (question) => {
    sendMessage(question);
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <>
      {isOpen && <div className="chatbot-overlay" onClick={closeChatbot}></div>}

      {/* Floating toggle bubble, bottom-right, fixed on screen */}
      <button
        type="button"
        className={`chatbot-fab ${isOpen ? "open" : ""}`}
        onClick={toggleChatbot}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        )}
      </button>

      <div className={`chatbot-float-panel ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <span>AI Q&A Assistant</span>
          <button
            type="button"
            className="chatbot-close-btn"
            onClick={closeChatbot}
            aria-label="Close chatbot"
          >
            ✕
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chatbot-msg ${m.from}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="chatbot-suggestions-wrapper">
          <button
            type="button"
            className="chatbot-suggestions-toggle"
            onClick={() => setShowSuggestions((prev) => !prev)}
            aria-label={
              showSuggestions ? "Hide suggestions" : "Show suggestions"
            }
          >
            <span>Suggested questions</span>
            <svg
              className={`chevron-icon ${showSuggestions ? "open" : ""}`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {showSuggestions && (
            <div className="chatbot-suggestions">
              {faq.map((f) => (
                <button
                  key={f.q}
                  type="button"
                  className="chatbot-suggestion-chip"
                  onClick={() => handleSuggestedClick(f.q)}
                >
                  {capitalize(f.q)}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="chatbot-input-row" onSubmit={handleAsk}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
          />
          <button type="submit">Ask</button>
        </form>
        <p className="chatbot-disclaimer">
          This assistant provides basic educational information, not
          professional financial advice.
        </p>
      </div>
    </>
  );
}
