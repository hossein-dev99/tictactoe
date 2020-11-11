import React , { useReducer } from 'react';
import "../Styles/style.css";
// Import Reducers
import BoardReducer from "../Reducers/BoardReducer";
// Import Contexts
import BoardContext from "../Contexts/BoardContext";
// Import Components
import Square from "./Square";
export default function Board() {

    const [state , dispatch] = useReducer(BoardReducer,{
        isTurnX: true,
        squares: Array(9).fill(null),
        endGame: false,
        winner: null,
        history: [],
        currentHistory: [],
        condition:[],
        move: 0
    });



    return(
        <BoardContext.Provider value={{
            isTurnX: state.isTurnX,
            squares: state.squares,
            endGame: state.endGame,
            history: state.history,
            move: state.move,
            condition: state.condition,
            dispatch
        }}>
            <div className="container">
                <div className="board_outer">
                    <span>{window.screen.width + ' : '+window.screen.height}</span>
                    <div className={`board ${state.condition.length ? 'end' : ''}`}>
                        <Square cls="" value="0" />
                        <Square cls="hoz" value="1" />
                        <Square cls="" value="2" />
                        <Square cls="ver" value="3" />
                        <Square cls="both" value="4" />
                        <Square cls="ver" value="5" />
                        <Square cls="" value="6" />
                        <Square cls="hoz" value="7" />
                        <Square cls="" value="8" />
                    </div>
                    <div className="status_indicator">
                        {
                            state.endGame
                            ? state.winner === 'draw'
                                ? <span>The Game is Draw</span>
                                : <span>Winner is: {state.winner}</span>
                            : <span>Current Turn is: {state.isTurnX ? 'X' : 'O'}</span>
                        }
                    </div>
                </div>
                <div className="moves_history">
                    {
                        state.history.length
                            ? <button
                            onClick={() => dispatch({type: 'timeTravel' , payload: {move: 0}})}>
                                Go to game start
                            </button>
                            : null
                    }
                    {state.history.map((board , key) => {
                        if(key < state.history.length -1) {
                        return <button key={key}
                   onClick={() => dispatch({type: 'timeTravel' , payload: {move: key+1}})}
                        >Go to move #{key+1}</button>
                        }
                        return null;
                    })}
                </div>
            </div>
        </BoardContext.Provider>
    );
}