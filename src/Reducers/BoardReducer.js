
export default function BoardReducer(prevState , action) {
    const {payload} = action;
    switch (action.type) {
        case 'setSquares':
            return setSquares(prevState , payload);
        case 'checkEndGame':
            return checkEndGame(prevState , payload);
        case 'timeTravel':
            return timeTravel(prevState , payload);
        default:
            return prevState;
    }
}

// set squares function
function setSquares(prevState,payload) {
    let newSquares = prevState.squares.slice();
    newSquares[payload.square] = prevState.isTurnX ? 'X' : 'O';
    let history = prevState.currentHistory !== null ? prevState.currentHistory : prevState.history;
    return {
      ...prevState,
        squares: newSquares,
        isTurnX: ! prevState.isTurnX ,
        history: [...history,newSquares],
        currentHistory: null,
        move: prevState.move + 1
    };
}
// select won player function
function checkEndGame(prevState,payload) {
    const {squares} = prevState;
    let wonConditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for(let i=0 ; i<wonConditions.length;i++) {
        const [a,b,c] = wonConditions[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            new Audio('./sound/game-over.mp3').play();
            return {
                ...prevState,
                endGame: true,
                winner: squares[a],
                condition: wonConditions[i]
            };
        }
    }
    if(payload.moves === 8) {
        new Audio('./sound/game-over-tie.mp3').play();
        return {
            ...prevState,
            endGame: true,
            winner: 'draw',
        };
    }

    if(prevState.isTurnX) {
        new Audio('sound/note-low.mp3').play();
    } else{
        new Audio('sound/note-high.mp3').play();
    }

    return prevState;
}
// set squares function
function timeTravel(prevState,payload) {
    const { move } = payload;
    const square = prevState.history[move-1] ? prevState.history[move-1] : Array(9).fill(null);
    return {
        ...prevState,
        endGame: false,
        squares: square,
        condition: [],
        isTurnX: !(move%2),
        move:move,
        currentHistory: prevState.history.slice(0,move)
    };
}