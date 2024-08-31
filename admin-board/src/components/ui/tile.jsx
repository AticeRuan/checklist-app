import { Link } from 'react-router-dom'
import Archive from '../svg/archive'
import Delete from '../svg/delete'
import Edit from '../svg/edit'
import { Restore } from '../svg/restore'

const Tile = ({
  title = 'Title',
  createdAt = 'dd/mm/yy',
  updatedAt = 'dd/mm/yy',
  draft = false,
  archived = false,
}) => {
  return (
    <div className="w-[11.8rem] h-[11.8rem] rounded-[1.25rem] bg-b-background-grey px-[1.25rem] py-[2.19rem] flex flex-col items-start shadow-lg justify-center gap-2 relative group ">
      <h2 className="text-[1.25rem] font-[600] text-b-active-blue">{title}</h2>
      <p className="text-b-light-grey font-[400] text-[0.75rem]">
        Created at {createdAt}
      </p>
      <p className="text-b-light-grey font-[400] text-[0.75rem]">
        Last Updated at {updatedAt}
      </p>
      {draft && (
        <span className="absolute bg-b-dark-green text-white text-[1rem] py-[2px] top-0 right-0 w-[5rem] text-center rounded-bl-xl rounded-tr-xl capitalize font-bold">
          in draft{' '}
        </span>
      )}
      {archived ? (
        <div className="w-full h-full backdrop-blur-sm absolute top-0 left-0 rounded-[1.25rem] group-hover:flex items-center justify-center gap-8 hidden ">
          <button>
            <Restore />
          </button>
          <button>
            <Delete />
          </button>
        </div>
      ) : (
        <div className="w-full h-full backdrop-blur-sm absolute top-0 left-0 rounded-[1.25rem] group-hover:flex items-center justify-center gap-8 hidden">
          <Link to="/update">
            <Edit />
          </Link>
          {draft ? (
            <button>
              <Delete />
            </button>
          ) : (
            <button>
              <Archive />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Tile
