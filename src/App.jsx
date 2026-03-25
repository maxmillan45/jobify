import Header from './components/Header'
import JobList from './pages/JobList'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <JobList />
      </main>
      <Footer />
    </div>
  )
}

export default App