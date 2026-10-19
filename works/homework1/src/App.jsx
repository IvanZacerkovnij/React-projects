import './App.css'
import CityFunctional from './components/CityFunctional.jsx'
import CityClass from './components/CityClass.jsx'
import Book from './components/Book.jsx'

function App() {
  return (
    <main>
      <h1>Домашня робота з React</h1>

      <h2>Завдання 1. Функціональний компонент</h2>
      <CityFunctional />

      <h2>Завдання 2. Класовий компонент</h2>
      <CityClass />

      <h2>Завдання 3. Улюблена книга</h2>
      <Book />
    </main>
  )
}

export default App
