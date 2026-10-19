import './App.css'
import MovieCard from "./components/movie/MovieCard.jsx";
import poster from './assets/movie/LordOfTheRings.jpg'
import Profile from "./components/profile/Profile.jsx";
import photoMe from "./assets/profile/Me.jpg"

function App() {

  return (
    <>
      <MovieCard
          title="Lord of The Rings"
          director="Peter Jackson"
          year={2001}
          studio="New Line Cinema"
          poster={poster}
      />
      <Profile
          photo={photoMe}
          fullName="Zatserkovnyi Ivan Yuriyovich"
          city="Chernivtsi"
          email="ivan.zacerkovnij@gmail.com"
          phone="+38 099 737 4802"
          experience="Junior .Net developer"
          skills={["C#", "ASP.NET", "EFCore"]}
      />
    </>
  )
}

export default App
