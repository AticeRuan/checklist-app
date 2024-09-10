import TileGrounp from '../components/ui/tileGrounp'
import { useSelector } from 'react-redux'
import { useGetAllTemplatesQuery } from '../app/api/templateApi'
import dateFormat, { masks } from 'dateformat'
import Loading from '../components/ui/loading'
import Error from '../components/ui/error'

const Archive = () => {
  const { data: templates, error, isLoading } = useGetAllTemplatesQuery()
  const localtemplates = useSelector((state) => state.template.templates || [])

  const archived = Array.isArray(templates)
    ? templates?.filter((template) => template.status === 'archived')
    : []

  const archiveYear = [
    ...new Set(
      archived
        ?.map((template) => template.udpatedAt)
        .sort((a, b) => new Date(b) - new Date(a)),
    ),
  ]

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
        Archive
      </h1>

      {archived?.length > 0 ? (
        <div className=" flex items-center flex-col gap-16 justify-center w-full ">
          {archiveYear.map((year, index) => {
            masks.default = 'yyyy'
            const formatedyear = dateFormat(year, 'default')
            return (
              <TileGrounp data={archived} key={index} title={formatedyear} />
            )
          })}{' '}
        </div>
      ) : (
        <div className=" flex items-center flex-col gap-16 justify-center w-full h-full">
          <h3 className="flex items-center justify-center capitalize text-xl font-bold">
            No archived templates
          </h3>
        </div>
      )}
    </div>
  )
}

export default Archive
