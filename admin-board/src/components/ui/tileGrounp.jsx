import Tile from './tile'

const TileGrounp = ({
  title = 'Group',
  data,
  draft = false,
  archived = false,
}) => {
  return (
    <div className="flex flex-col w-full 2xl:w-[60vw] justify-center gap-6 items-center">
      <h2 className="leading-[1.5rem] font-[500] text-[1.5rem] text-b-active-blue w-full text-left">
        {title}
      </h2>
      <div className="w-full flex pl-[2rem] flex-wrap gap-6">
        <Tile draft={draft} archived={archived} />
        <Tile draft={draft} archived={archived} />
        <Tile draft={draft} archived={archived} />
        <Tile draft={draft} archived={archived} />
        <Tile draft={draft} archived={archived} />
      </div>
    </div>
  )
}

export default TileGrounp
