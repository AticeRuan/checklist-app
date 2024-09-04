import Add from '../components/svg/add'
import Cancel from '../components/svg/cancel'
import Delete from '../components/svg/delete'
import Edit from '../components/svg/edit'
import { useState } from 'react'

const CreateNew = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'item 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac diam ac ex convallis posuere in sit amet metus. Pellentesque maximus tortor in malesuada accumsan.',
    },
    {
      id: 2,
      title: 'item 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac diam ac ex convallis posuere in sit amet metus. Pellentesque maximus tortor in malesuada accumsan.',
    },
    {
      id: 3,
      title: 'item 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac diam ac ex convallis posuere in sit amet metus. Pellentesque maximus tortor in malesuada accumsan.',
    },
  ])
  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full  flex-1 p-8">
      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Create New Template
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site
            </label>
            <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500">
              <option>Select a site</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter Checklist title"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500">
              <option>Select a Category</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item keyword
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="relative">
              <textarea
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                rows={4}
              ></textarea>
              <button className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-1">
                <Add className="w-6 h-6" />
              </button>
              <button className="absolute bottom-2 right-11 bg-red-500 text-white rounded-full p-1">
                <Cancel className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <div className="flex justify-end space-x-2">
                <button className="text-green-600">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-600">
                  <Delete className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreateNew
