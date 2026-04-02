import './App.css'
import AppointmentForm from './components/AppointmentForm'

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-7xl mx-auto">
        <AppointmentForm />
      </div>
    </div>
  )
}

export default App
