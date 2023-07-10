import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./components/Landing.jsx";
import Login from './components/Login.jsx';
import Todos from './components/DisplayTodoItems.jsx';
import Register from './components/Register.jsx';


// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/todos' element={<Todos />} />
            </Routes>
        </Router>
    );
}

export default App;
