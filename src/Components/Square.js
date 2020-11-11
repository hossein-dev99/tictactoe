import React , { useContext } from 'react';
import BoardContext from "../Contexts/BoardContext";

export default function Square(props) {

    const boardContext = useContext(BoardContext);
    const { dispatch , squares , endGame , condition , move } = boardContext;

    const clickHandler = () => {
        if(squares[props.value] === null && !endGame) {
            dispatch({type:'setSquares' , payload:{square: props.value}});
            dispatch({type: 'checkEndGame' , payload:{moves: move}});
        }
    }

    return(
        <button
            className={`btn ${props.cls}
            ${squares[props.value] ? 'square' : ''}
            ${condition.includes(parseInt(props.value)) ? 'won' : 'lose'}`}
            onClick={clickHandler}
        >
            {squares[props.value]}
        </button>
    );
}