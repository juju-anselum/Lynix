import { Header, Nav, Summary } from './containers'
import './App.css'

const App = () => {
  return (
    <div className="main">
      <div className='w-full px-4 max-w-screen-xl flex flex-col items-center'>
        <Nav />
        <div className='w-full max-w-screen-sm mt-20'>
          <Header />
          <Summary />
        </div>
      </div>
    </div>
  )
}

export default App
