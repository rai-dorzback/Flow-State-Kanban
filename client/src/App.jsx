import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';  // New Homepage Component
import BoardView from './components/BoardView.jsx';  // Board view for displaying the board

export default function App() {

  return (
    <Router>
      <Routes>
        <Route
          path='/' element={<Homepage />}>
        </Route>
        <Route
          path='/board/:boardId' element={<BoardView />}>
        </Route>
      </Routes>
    </Router>
  )
};