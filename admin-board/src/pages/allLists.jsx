import SearchBox from '../components/ui/searchBox'
import TileGrounp from '../components/ui/tileGrounp'
import { useGetAllTemplatesQuery } from '../app/api/templateApi'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
const AllLists = () => {
  const localtemplates = useSelector((state) => state.template.templates)

  const published = localtemplates?.filter(
    (template) => template.status === 'published',
  )

  const categories = useSelector((state) => state.category.categories)

  const [selectedCategory, setSelectedCategory] = useState('')

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Checklists
      </h1>
      {/* fitler */}
      <SearchBox placeholder="Search checklists by site name,title or keywords" />
      <div className="flex w-full px-3 mx-5 gap-20 mb-8">
        {/* date picker */}
        <div className="flex flex-col items-start gap-2">
          <label
            htmlFor="date"
            className="text-[1rem] text-[#4b5563] font-bold"
          >
            Date updated
          </label>
          <input
            type="date"
            className="h-[2.5rem] w-[15rem] px-2 border-2 border-b-light-grey rounded-lg "
            placeholder="Select Date"
          />
        </div>
        {/* category  */}
        <div className="flex flex-col items-start gap-2">
          <label className="text-[1rem] text-[#4b5563] font-bold">
            Category
          </label>
          <select
            name="category"
            className="h-[2.5rem] w-[15rem] px-2 border-2 border-b-light-grey rounded-lg capitalize font-bold "
            placeholder="Select Category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="" disabled selected>
              Select Category
            </option>
            {categories?.map((category, index) => (
              <option
                value={category.name}
                key={index}
                className="capitalize "
                onChange={handleCategoryChange}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* filter ends */}
      {/* list start */}
      {published?.length > 0 ? (
        <div className=" flex items-center flex-col gap-16 justify-center w-full">
          <TileGrounp title="" data={published} />
        </div>
      ) : (
        <div className=" flex items-center flex-col gap-16 justify-center w-full h-full">
          <h3 className="flex items-center justify-center capitalize text-xl font-bold">
            No published templates
          </h3>
        </div>
      )}
    </div>
  )
}

export default AllLists
