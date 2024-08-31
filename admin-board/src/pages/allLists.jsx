import SearchBox from '../components/ui/searchBox'
import TileGrounp from '../components/ui/tileGrounp'
const AllLists = () => {
  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Checklists
      </h1>
      <SearchBox placeholder="Search checklists by keywords" />
      <div className=" flex items-center flex-col gap-16 justify-center w-full">
        <TileGrounp title="" />
      </div>
    </div>
  )
}

export default AllLists
