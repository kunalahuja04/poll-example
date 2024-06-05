# Polling App

This is a simple polling application built with React. It allows users to vote on different polls and see the results.

## Features
- Configurable poll questions.
  - Questions can be added by including an object of Poll in the `App.jsx` component. For example:
    ```jsx
    {
      id: "poll",
      question: "your question?",
      options: [
        "option A",
        "option B",
        "option C",
      ],
    }
    ```
- Votes are saved in local storage.
- Responsive design with Tailwind CSS.
  - Used Tailwind CSS for ease of styling the components, as it is quite popular nowadays.
  - Also used Framer Motion to add animations easily.
- Unit tests with Jest and React Testing Library.
  - Used Jest testing library to achieve unit testing.
  - However, couldn't run the test cases successfully after multiple attempts.

## Getting Started

### Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd polling-app
npm install
