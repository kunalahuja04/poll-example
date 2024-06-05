import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { jest } from 'jest';
import Poll from './Poll';

const pollProps = {
    pollId: 'poll1',
    question: "What's your favorite color?",
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    onVote: jest.fn(),
    clearVotesTrigger: false,
};

describe('Poll Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders the poll question and options correctly', () => {
        render(<Poll {...pollProps} />);
        expect(screen.getByText(pollProps.question)).toBeInTheDocument();
        pollProps.options.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    test('increments vote count on clicking an option', () => {
        render(<Poll {...pollProps} />);
        const optionElement = screen.getByText(pollProps.options[0]);

        fireEvent.click(optionElement);
        expect(optionElement.nextSibling.textContent).toBe('1 votes');
        expect(localStorage.getItem(pollProps.pollId)).toBe(JSON.stringify([1, 0, 0, 0]));
    });

    test('highlights the winning option after more than two votes', async () => {
        const { rerender } = render(<Poll {...pollProps} />);
        const optionElement = screen.getByText(pollProps.options[0]);

        fireEvent.click(optionElement);
        fireEvent.click(optionElement);
        fireEvent.click(optionElement);

        rerender(<Poll {...pollProps} />);
        await waitFor(() => expect(optionElement.closest('.bg-green-200')).toBeInTheDocument());
    });

    test('clears votes on clicking the "Clear Votes" button', () => {
        const { rerender } = render(<Poll {...pollProps} />);
        const optionElement = screen.getByText(pollProps.options[0]);

        fireEvent.click(optionElement);
        expect(optionElement.nextSibling.textContent).toBe('1 votes');

        // Simulate clearVotesTrigger toggle
        rerender(<Poll {...pollProps} clearVotesTrigger={true} />);
        rerender(<Poll {...pollProps} clearVotesTrigger={false} />);

        pollProps.options.forEach((option) => {
            expect(screen.getByText(option).nextSibling.textContent).toBe('0 votes');
        });
        expect(localStorage.getItem(pollProps.pollId)).toBe(JSON.stringify([0, 0, 0, 0]));
    });

    test('animates poll options on click', () => {
        const { container } = render(<Poll {...pollProps} />);
        const optionElement = screen.getByText(pollProps.options[0]);

        fireEvent.click(optionElement);
        const animatedElement = container.querySelector('.poll-option');
        expect(animatedElement).toHaveStyle('transform: scale(1.02)');
    });
});
