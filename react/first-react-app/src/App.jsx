import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="tasks-container">
        <form className="add-form">
          <input type="text" placeholder="Task" />
          <button className="add-button">Add</button>
        </form>
        <ul>
          <li>
            <div className="task">
              <p>Task One</p>
              <button className="delete-button">Delete</button>
            </div>
          </li>
          <li>
            <div className="task">
              <p>Task One</p>
              <button className="delete-button">Delete</button>
            </div>
          </li>
          <li>
            <div className="task">
              <p>Task One</p>
              <button className="delete-button">Delete</button>
            </div>
          </li>
          <li>
            <div className="task">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At non
                adipisci cumque sapiente nihil officia aut iusto unde molestiae.
                Voluptatum dolore, aliquid veniam unde dolorem fugiat voluptates
                ad omnis ab.
              </p>
              <button className="delete-button">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
