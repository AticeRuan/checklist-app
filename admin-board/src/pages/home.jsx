import Tile from '../components/ui/tile'
import TileGrounp from '../components/ui/tileGrounp'

const Home = () => {
  const user = 'User'
  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Welcome Back {user}!
      </h1>
      <div className=" flex items-center flex-col gap-16 justify-center w-full">
        <TileGrounp />
        <TileGrounp />
        <TileGrounp />
      </div>
    </div>
  )
}

export default Home
