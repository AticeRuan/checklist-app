import TileGrounp from '../components/ui/tileGrounp'
import { useSelector } from 'react-redux'
import { useGetAllTemplatesQuery } from '../app/api/templateApi'
import dateFormat, { masks } from 'dateformat'

const Archive = () => {
  const localtemplates = useSelector((state) => state.template.templates)

  const archived = localtemplates?.filter(
    (template) => template.status === 'archived',
  )

  const archiveYear = [
    ...new Set(
      archived
        ?.map((template) => template.udpatedAt)
        .sort((a, b) => new Date(b) - new Date(a)),
    ),
  ]

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
