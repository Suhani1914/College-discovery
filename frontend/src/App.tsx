import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import ListingPage from './pages/ListingPage'
import DetailPage from './pages/DetailPage'
import ComparePage from './pages/ComparePage'
import PredictorPage from './pages/PredictorPage'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/colleges/:id" element={<DetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/predictor" element={<PredictorPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App