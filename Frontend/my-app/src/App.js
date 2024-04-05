
import './App.css';
import ExcelUploader from './components/ExcelUploader';
import { TableDatas } from './components/TableDatas';
import BarGraph from './components/BarGraph';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
  <Router>

    <div>
      <Routes>
        <Route exact path='/'  element={<ExcelUploader/>} />
        <Route path='/table'  element={<TableDatas/>} />
        <Route path='/bar-grapg'  element={<BarGraph/>} />
      </Routes>
    </div>

  </Router>
    
  )
}
export default App;