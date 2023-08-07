import { useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom/client"
import './hook.css';
const initialState = {
    age: 20,
    height: 160,
}
const startingAge = initialState.age;
const startingHeight = initialState.height;
const reducer = (state, action) => {
    if (action.type == 'increment')
        return { age: state.age + 1, height: state.height + 2 }
    else if (action.type == 'decrement') {
        if (state.age > 0)
            return { age: state.age - 1, height: state.height - 2 }
        else return { age: state.age = 0, height: state.height }
    }
    else if (action.type == 'reset')
        return { age: state.age = startingAge, height: state.height = startingHeight }
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [myData, setData] = useState(null)
    useEffect(() => {
        const gettingData = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
            const getData = await data.json();
            console.log(getData);
            setData(getData);
        }   
        gettingData();
    }, [])

    return (
        <div className="main">
            <div className="buttons">
                <button id="B1" onClick={() => { dispatch({ type: 'increment' }) }}>Increment</button>
                <button id="B2" onClick={() => { dispatch({ type: 'decrement' }) }}>Decrement</button>
                <button id="B3" onClick={() => { dispatch({ type: 'reset' }) }}>Reset</button>
            </div>
            <h1>Hello! You are {state.age}</h1>
            <h2>Your Height is {state.height} cm</h2>
            <p>Hello Api... <br />{myData?.title}</p>
        </div>
    )
}
export default Counter
let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />)