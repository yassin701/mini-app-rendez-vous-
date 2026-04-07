import './App.css'
import UsersTable from './components/AllUsers'
import AppointmentForm from './components/AppointmentForm'
import {Routes, Route, BrowserRouter } from "react-router-dom";
import Edit from './components/Edit';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-7xl mx-auto">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppointmentForm />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
        </BrowserRouter>
       </div>
     </div>
  )
}

export default App
