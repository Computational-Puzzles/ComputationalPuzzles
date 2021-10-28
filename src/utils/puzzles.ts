const submitPuzzle = (session, puzzle, answer) => {
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    alert('Hi');
    // TODO: can they do this without being logged in?
    alert(`Submit Puzzle Answer ${answer}`);
    alert(`${puzzle}`);
    alert(`${session?.user}`);
    // TODO: save a Submission object for this submission
};

export { submitPuzzle }
