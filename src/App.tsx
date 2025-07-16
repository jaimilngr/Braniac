import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import {Welcome} from './components/Welcome';
import { Selector } from './components/Selector';
import { Quiz } from './components/Quiz';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {

  return (
    <>
        <QueryClientProvider client={queryClient}>
      <BrowserRouter> 
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/started" element={<Selector />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
        </QueryClientProvider>

    </>
  )
}

export default App
