import Tile from '../components/ui/tile'
import TileGrounp from '../components/ui/tileGrounp'
import { useSelector, useDispatch } from 'react-redux'
import { useGetAllTemplatesQuery } from '../app/api/templateApi'
import { getTemplates } from '../app/features/template/templateSlice'
import { useEffect } from 'react'

const Home = () => {
  const user = useSelector((state) => state.auth.user)
  const name = user.name

  const { data: templates, error, isLoading } = useGetAllTemplatesQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    if (templates) {
      dispatch(getTemplates(templates))
    }
  }, [dispatch, templates])

  const localtemplates = useSelector((state) => state.template.templates)

  const activetemplates = localtemplates?.filter(
    (template) => template.status !== 'archived',
  )

  const recentUpdatedTemplates = activetemplates
    ?.slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3)

  const recentCreatedTemplates = activetemplates
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)

  const draftTemplates = activetemplates
    ?.filter((template) => template.status === 'draft')
    .slice(0, 5)

  return (
    <>
      <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
        <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem] whitespace-nowrap">
          Welcome Back {name}!
        </h1>
        <div className=" flex items-center flex-col gap-16 justify-center w-full">
          <TileGrounp data={recentUpdatedTemplates} title="Recently Updated" />
          <TileGrounp data={recentCreatedTemplates} title="Recently Created" />
          <TileGrounp data={draftTemplates} title="Drafts" />
        </div>
      </div>
    </>
  )
}

export default Home
