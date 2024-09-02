import SearchBox from '../components/ui/searchBox'
import TileGrounp from '../components/ui/tileGrounp'
import { useGetAllTemplatesQuery } from '../app/api/templateApi'

const Drafts = () => {
  const { data: templates, error, isLoading } = useGetAllTemplatesQuery()

  const drafts = templates?.filter((template) => template.status === 'draft')

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Drafts
      </h1>
      <SearchBox placeholder="Search draft by keywords" />
      <div className=" flex items-center flex-col gap-16 justify-center w-full">
        <TileGrounp title="" draft={true} data={drafts} />
      </div>
    </div>
  )
}

export default Drafts
