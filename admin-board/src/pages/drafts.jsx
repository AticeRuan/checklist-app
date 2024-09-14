import SearchBox from '../components/ui/searchBox'
import TileGrounp from '../components/ui/tileGrounp'
import { useGetAllTemplatesQuery } from '../app/api/templateApi'
import Loading from '../components/ui/loading'
import Error from '../components/ui/error'
import { Link } from 'react-router-dom'

const Drafts = () => {
  const { data: templates, error, isLoading } = useGetAllTemplatesQuery()

  const drafts = templates?.filter((template) => template.status === 'draft')

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    )
  if (error)
    return (
      <div>
        <Error />
      </div>
    )

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Drafts
      </h1>

      {drafts.length > 0 ? (
        <>
          {' '}
          <SearchBox placeholder="Search draft by keywords" />
          <div className=" flex items-center flex-col gap-16 justify-center w-full">
            <TileGrounp title="" draft={true} data={drafts} />
          </div>
        </>
      ) : (
        <div className=" flex items-center flex-col  justify-center w-full h-full gap-4">
          <h3 className="flex items-center justify-center capitalize text-xl font-bold">
            No drafts availalbe
          </h3>
          <Link
            to="/create-new"
            className="text-b-mid-blue underline text-lg font-bold "
          >
            Create New Template
          </Link>
        </div>
      )}
    </div>
  )
}

export default Drafts
