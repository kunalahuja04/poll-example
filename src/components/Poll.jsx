/* eslint-disable react/prop-types */
import "./Poll.css";
import { Fragment, useState, useEffect } from "react";
import { motion } from "framer-motion";

const Poll = ({ pollId, question, options, onVote, clearVotesTrigger }) => {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const savedVotes =
      JSON.parse(sessionStorage.getItem(pollId)) ||
      Array(options.length).fill(0);
    setVotes(savedVotes);
  }, [pollId, options.length]);

  useEffect(() => {
    const resetVotes = Array(options.length).fill(0);
    setVotes(resetVotes);
    sessionStorage.setItem(pollId, JSON.stringify(resetVotes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearVotesTrigger]);

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
    sessionStorage.setItem(pollId, JSON.stringify(newVotes));
    setTimeout(onVote, 300);
  };

  const totalVotes = votes.reduce((a, b) => a + b, 0);

  const maxVotes = Math.max(...votes);
  const winningIndex = votes.indexOf(maxVotes);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {question}
        </h2>
        {options.map((option, index) => (
          <Fragment key={`${pollId}-option-${index}`}>
            {index === winningIndex && totalVotes > 2 && (
              <motion.div
                className="absolute  rotate-[48deg] -mt-6 ml-[23rem] z-[1]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, rotate: "40deg" }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <img src="/crown.png" alt="crown" height="60" width="60" />
              </motion.div>
            )}

            <motion.div
              className={`mb-3 p-3 z-[1] cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 poll-option relative ${
                index === winningIndex && totalVotes > 2 ? "bg-green-200" : ""
              }`}
              onClick={() => handleVote(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={index + 2}
            >
              <div className="flex justify-between" key={index + 1}>
                <span className="text-gray-800">{option}</span>
                <span className="text-sm text-gray-600">
                  {votes[index]} votes
                </span>
              </div>
              {totalVotes > 0 && (
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(votes[index] / totalVotes) * 100}%` }}
                  ></div>
                </div>
              )}
            </motion.div>
          </Fragment>
        ))}
      </motion.div>
    </>
  );
};

export default Poll;
