import "./App.css";
import { useState } from "react";
import Poll from "./components/Poll";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [clearVotesTrigger, setClearVotesTrigger] = useState(false);

  const polls = [
    {
      id: "poll1",
      question: "How do you feel today?",
      options: [
        "Brilliant! I have so much energy",
        "Always can be worse.",
        "Please, end my misery.",
      ],
    },
    {
      id: "poll2",
      question: "How do you like the Opinary test?",
      options: [
        "It was great and so challenging.",
        "Not bad, but you can improve.",
        "It was a nightmare, never again.",
      ],
    },
    {
      id: "poll3",
      question: "Which party did you support this Lok-sabha Elections?",
      options: ["N.D.A", "I.N.D.I.A", "OTHERS"],
    },
  ];

  const [currentPollIndex, setCurrentPollIndex] = useState(0);
  const [showPoll, setShowPoll] = useState(true);

  const handleNextPoll = () => {
    setShowPoll(false);
    setTimeout(() => {
      setCurrentPollIndex((currentPollIndex + 1) % polls.length);
      setShowPoll(true);
    }, 500); // Match the duration of exit animation
  };

  const handleClearVotes = () => {
    sessionStorage.clear();
    setClearVotesTrigger((prev) => !prev); // Toggle the trigger to reset votes
  };

  return (
    <div className="flex flex-col h-screen justify-center w-full bg-gray-100">
      <div className="flex justify-center  p-4">
        <AnimatePresence>
          {showPoll && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg"
            >
              <Poll
                pollId={polls[currentPollIndex].id}
                question={polls[currentPollIndex].question}
                options={polls[currentPollIndex].options}
                onVote={handleNextPoll}
                clearVotesTrigger={clearVotesTrigger}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <button
            type="button"
            onClick={handleClearVotes}
            className="justify-center text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 outline-none"
          >
            Clear Votes
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
