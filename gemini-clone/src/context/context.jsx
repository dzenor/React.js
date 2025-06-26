import { createContext, useState } from "react";
import { runChat } from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [response, setResponse] = useState("");
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const usedPrompt = prompt !== undefined ? prompt : input;

    if (usedPrompt.trim() && !previousPrompts.includes(usedPrompt)) {
      setPreviousPrompts((prev) => [...prev, usedPrompt]);
    }

    setRecentPrompt(usedPrompt);

    const result = await runChat(usedPrompt);

    // Process bold (** **) and line breaks (*) formatting
    let responseArray = result.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");

    // Show response word by word with delay
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setResponse(result);
    setInput("");
    setLoading(false);
  };

  // New function to open a prompt from history without resending or adding duplicate
  const openPrompt = (prompt) => {
    setInput(prompt);
    setShowResult(false);
    setResultData("");
    setRecentPrompt(prompt);
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    openPrompt,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
