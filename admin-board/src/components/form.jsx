import React, { useEffect } from 'react'

import Add from './svg/add'

import ListItem from './ui/listItem'
import { useState } from 'react'
import Popup from './ui/popup'
import { addListitem as addListItemAction } from '../app/features/listitem/listitemSlice'
import { useAddListItemMutation } from '../app/api/listitemApi'
import { Tick } from './svg/tick'
import Archive from './svg/archive'
import {
  updateTemplate as updateTemplateAction,
  deleteTemplate as deleteTemplateAction,
} from '../app/features/template/templateSlice'
import {
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} from '../app/api/templateApi'
import { useDispatch, useSelector } from 'react-redux'

import Save from './svg/save'
import { useNavigate } from 'react-router-dom'
import Cancel from './svg/cancel'
import Error from './ui/error'
import Loading from './ui/loading'
import Loader from './svg/loader'
import { updateListitem as updateListItemAction } from '../app/features/listitem/listitemSlice'
import { useUpdateListItemMutation } from '../app/api/listitemApi'

const Form = ({ data, listitems, isCreateNew = false }) => {
  const dispatch = useDispatch()
  const [newItem, setNewItem] = useState({
    title: '',
    category_id: '',
    description: '',
    sites: [],
    status: '',
  })
  const [selectAll, setSelectAll] = useState(false)

  const [isDraft, setIsDraft] = useState(false)

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  //   useEffect(() => {
  //     console.log('Form data:', newItem)
  //   }, [newItem])

  //   useEffect(() => {
  //     console.log('Data prop:', data)
  //   }, [data])

  useEffect(() => {
    if (data) {
      setNewItem({
        title: data.title,
        category_id: data.category_id,
        description: data.description,
        sites: data.sites.map((site) => site.site_id),
        status: data.status,
      })
      setSelectedSites(data?.sites?.map((site) => site.site_id))
      setIsDraft(data.status === 'draft')
      setIsEnvironmentRelated(data.is_environment_related)
    }
  }, [data])

  const [
    updateTemplate,
    { isLoading: isUpdateTemplateLoading, isError: isUpdateTemplateError },
  ] = useUpdateTemplateMutation()
  const [
    deleteTemplate,
    { isLoading: isDeleteTemplateLoading, isError: isDeleteTemplateError },
  ] = useDeleteTemplateMutation()

  const localtemplates = useSelector((state) => state.template.templates)
  const [
    updateListItem,
    { isLoading: isUpdateListItemLoading, isError: isUpdateListItemError },
  ] = useUpdateListItemMutation()

  const [updatedListItemIds, setUpdatedListItemIds] = useState(new Set())

  const handleItemSiteUpdate = (isUpdated, listItemId) => {
    if (isUpdated) {
      setUpdatedListItemIds((prev) => new Set(prev.add(listItemId)))
    }
  }

  const handTemplateUpdate = async () => {
    try {
      if (!data || !data.template_id) {
        console.error('data.template_id is undefined')
        return
      }

      const payload = {
        ...newItem,
        id: data.template_id,
        status: 'published',
        is_environment_related: isEnvironmentRelated,
      }

      const updatedTemplate = await updateTemplate(payload).unwrap()
      const shouldOverrideAll =
        updatedListItemIds.size > 0
          ? window.confirm(
              'Some list items have been updated individually. Do you want to override their site visibility with the template’s site array?',
              'ok',
            )
          : true

      if (listitems) {
        // Create an array of promises for updating each list item
        const updatePromises = listitems.map(async (item) => {
          const itemPayload = {
            ...item,
            sites:
              shouldOverrideAll || !updatedListItemIds.has(item.listitem_id)
                ? newItem.sites
                : item.sites.map((site) => site.site_id),
            id: item.listitem_id,
            is_environment_related: isEnvironmentRelated,
          }

          console.log('Item payload:', itemPayload)
          const updatedItem = await updateListItem(itemPayload).unwrap()
          dispatch(updateListItemAction(updatedItem))
        })

        await Promise.all(updatePromises)
      }

      if (updatedTemplate) {
        dispatch(updateTemplateAction(updatedTemplate))

        setIsTemplateUpdated(true)
        setNewItem({
          title: '',
          category_id: 1,
          description: '',
          sites: [],
          status: 'draft',
        })
        setSelectedSites([])
      } else {
        console.error(
          'Failed to update template: No template returned from API',
        )
      }
    } catch (error) {
      console.error('Error while updating template:', error)
    }
  }

  const handTemplateSaveToDraft = async () => {
    try {
      if (!data || !data.template_id) {
        console.error('data.template_id is undefined')
        return
      }
      const payload = {
        id: data.template_id,
        ...newItem,
        status: 'draft',
      }
      const updatedTemplate = await updateTemplate(payload).unwrap()

      const shouldOverrideAll =
        updatedListItemIds.size > 0
          ? window.confirm(
              'Some list items have been updated individually. Do you want to override their site visibility with the template’s site array?',
            )
          : true

      if (listitems) {
        // Create an array of promises for updating each list item
        const updatePromises = listitems.map(async (item) => {
          const itemPayload = {
            ...item,
            sites:
              shouldOverrideAll || !updatedListItemIds.has(item.listitem_id)
                ? newItem.sites
                : item.sites,
            id: item.listitem_id,
            is_environment_related: isEnvironmentRelated,
          }
          const updatedItem = await updateListItem(itemPayload).unwrap()
          dispatch(updateListItemAction(updatedItem))
        })

        await Promise.all(updatePromises)
      }

      if (updatedTemplate) {
        dispatch(updateTemplateAction(updatedTemplate))

        setIsTemplateSaved(true)
        setNewItem({
          title: '',
          category_id: 1,
          description: '',
          sites: [],
          status: 'draft',
        })
        setSelectedSites([])
      } else {
        console.error(
          'Failed to update template: No template returned from API',
        )
      }
    } catch (error) {
      console.error('Error while updating template:', error)
    }
  }

  const handleTemplateArchive = async () => {
    try {
      if (!data || !data.template_id) {
        console.error('data.template_id is undefined')
        return
      }
      const payload = {
        id: data.template_id,
        ...newItem,
        status: 'archived',
      }
      const updatedTemplate = await updateTemplate(payload)
      dispatch(updateTemplateAction(updatedTemplate))
      setIsTemplateArchived(true)
    } catch (error) {
      console.error('Error while updating template:', error)
    }
  }

  const handleTemplateDelete = async () => {
    try {
      if (!data || !data.template_id) {
        console.error('data.template_id is undefined')
        return
      }
      await deleteTemplate(data.template_id)
      dispatch(deleteTemplateAction(data.template_id))
      setIsTemplateDeleted(true)
    } catch (error) {
      console.error('Error while deleting template:', error)
    }
  }

  const categories = useSelector((state) => state.category.categories)
  const Sites = useSelector((state) => state.site.sites)
  const regions = [...new Set(Sites.map((site) => site.region))]
  const [selectedSites, setSelectedSites] = useState([...(newItem.sites || [])])

  const handleSiteCheck = (e) => {
    const { value, checked } = e.target
    const siteId = Number(value)

    if (checked) {
      setSelectedSites([...selectedSites, siteId])
      setNewItem((prevItem) => ({
        ...prevItem,
        sites: [...prevItem.sites, siteId],
      }))
    } else {
      setSelectedSites(selectedSites.filter((site) => site !== siteId))
      setNewItem((prevItem) => ({
        ...prevItem,
        sites: prevItem.sites.filter((site) => site !== siteId),
      }))
    }
  }

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked
    setSelectAll(isChecked)
    if (isChecked) {
      // Select all sites
      const allSiteIds = Sites.map((site) => site.site_id)
      setSelectedSites(allSiteIds)
      setNewItem((prevItem) => ({
        ...prevItem,
        sites: allSiteIds,
      }))
    } else {
      // Deselect all sites
      setSelectedSites([])
      setNewItem((prevItem) => ({
        ...prevItem,
        sites: [],
      }))
    }
  }

  const handleCategoryChange = (e) => {
    const { value } = e.target
    setNewItem((prevItem) => ({
      ...prevItem,
      category_id: value,
    }))
  }

  const [isCreating, setIsCreating] = useState(false)
  const handleCreating = () => {
    setIsCreating(!isCreating)
  }

  const [isTemplateUpdated, setIsTemplateUpdated] = useState(false)
  const [isTemplateSaved, setIsTemplateSaved] = useState(false)
  const [isTemplateArchived, setIsTemplateArchived] = useState(false)
  const [isTemplateDeleted, setIsTemplateDeleted] = useState(false)

  useEffect(() => {
    if (isTemplateUpdated) {
      setTimeout(() => {
        setIsTemplateUpdated(false)
        navigate('/all-lists')
      }, 1500)
    }
  }, [isTemplateUpdated, navigate])

  useEffect(() => {
    if (isTemplateSaved) {
      setTimeout(() => {
        setIsTemplateSaved(false)
        navigate('/drafts')
      }, 1500)
    }
  }, [isTemplateSaved, navigate])

  useEffect(() => {
    if (isTemplateArchived) {
      setTimeout(() => {
        setIsTemplateArchived(false)
        navigate('/archive')
      }, 1500)
    }
  }, [isTemplateArchived, navigate])

  useEffect(() => {
    if (isTemplateDeleted) {
      setTimeout(() => {
        setIsTemplateDeleted(false)
        navigate('/all-lists')
      }, 1500)
    }
  }, [isTemplateDeleted, navigate])

  //   useEffect(() => {
  //     console.log('Item to delete:', itemToDelete)
  //   }, [itemToDelete])

  const [isSettingSiteVisibility, setIsSettingSiteVisibility] = useState(false)
  const [isItemSiteSettingOpen, setIsItemSiteSettingOpen] = useState(false)
  const handleItemSiteSettingOpen = () => {
    setIsItemSiteSettingOpen(true)
  }
  const handleItemSiteSettingClose = () => {
    setIsItemSiteSettingOpen(false)
  }
  const handleSiteSettingOpen = () => {
    setIsSettingSiteVisibility(true)
  }

  const handleSiteSettingClose = () => {
    setIsSettingSiteVisibility(false)
  }

  const [isEnvironmentRelated, setIsEnvironmentRelated] = useState(false)
  const handleEnvironmentRelated = () => {
    setIsEnvironmentRelated(!isEnvironmentRelated)
  }

  //create new list item logic

  const [newListItem, setNewListItem] = useState({
    keyword: '',
    description: '',
    sites: [],
    template_id: data?.template_id,
  })
  const [itemSites, setItemSites] = useState([])
  useEffect(() => {
    if (data) {
      setNewListItem({
        keyword: '',
        description: '',
        sites: newItem.sites,
        template_id: data.template_id,
      })
      setItemSites(newItem.sites)
    }
  }, [data, isEnvironmentRelated, newItem.sites])

  const [itemSiteSelectedAll, setItemSiteSelectedAll] = useState(false)

  const handleSelectAllItemSites = (e) => {
    const isChecked = e.target.checked
    setItemSiteSelectedAll(isChecked)
    if (isChecked) {
      // Select all sites
      const allSiteIds = Sites.map((site) => site.site_id)
      setItemSites(allSiteIds)
      setNewListItem((prevItem) => ({
        ...prevItem,
        sites: allSiteIds,
      }))
    } else {
      // Deselect all sites
      setItemSites([])
      setNewListItem((prevItem) => ({
        ...prevItem,
        sites: [],
      }))
    }
    setItemSiteSelectedAll((prev) => !prev)
  }

  const handleItemSiteCheck = (e) => {
    const { value, checked } = e.target
    const siteId = Number(value)
    if (!data.sites.find((site) => site.site_id === siteId)) {
      return // Exit if the site is not part of the template's ticked sites
    }

    if (checked) {
      setItemSites([...itemSites, siteId])
      setNewListItem((prevItem) => ({
        ...prevItem,
        sites: [...prevItem.sites, siteId],
      }))
    } else {
      setItemSites(itemSites.filter((site) => site !== siteId))
      setNewListItem((prevItem) => ({
        ...prevItem,
        sites: prevItem.sites.filter((site) => site !== siteId),
      }))
    }
  }

  const handleItemChange = (e) => {
    const { name, value } = e.target
    setNewListItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }))
  }

  const [
    addListItem,
    { isLoading: isListItemLoading, isError: isListItemError },
  ] = useAddListItemMutation()

  const handItemCreate = async () => {
    try {
      const payload = {
        ...newListItem,
        template_id: data.template_id,
      }
      const addedItem = await addListItem(payload).unwrap()
      if (addedItem) {
        dispatch(addListItemAction(addedItem))
        setNewListItem({
          keyword: '',
          description: '',
          sites: [],
          template_id: data.template_id,
          is_environment_related: isEnvironmentRelated,
        })
        setItemSites([])
      } else {
        console.error('Failed to add list item: No item returned from API')
      }
    } catch (error) {
      console.error('Error while adding list item:', error)
    }
  }

  const [itemBeingDeleted, setItemBeingDeleted] = useState(null)

  const handleDelete = (id) => {
    setItemBeingDeleted(id)
  }

  const cancelDelete = () => {
    setItemBeingDeleted(null)
  }

  useEffect(() => {
    if (
      isDeleteTemplateLoading ||
      isUpdateTemplateLoading ||
      isUpdateListItemLoading
    ) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [
    isLoading,
    isDeleteTemplateLoading,
    isUpdateTemplateLoading,
    isUpdateListItemLoading,
  ])

  useEffect(() => {
    if (
      isDeleteTemplateError ||
      isUpdateTemplateError ||
      isListItemError ||
      isUpdateListItemError
    ) {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }, [
    isError,
    isDeleteTemplateError,
    isUpdateTemplateError,
    isListItemError,
    isUpdateListItemError,
  ])

  if (isError)
    return <Error text="Failed to update template, refresh and try again" />

  if (isLoading) return <Loading text="Updating Database..." />

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <div className="flex gap-8 w-full justify-end mb-24 -mt-24">
        {(isDraft || isCreateNew) && (
          <button
            className="w-[3rem]"
            onClick={() => handTemplateSaveToDraft()}
          >
            <Save width="100%" height="100%" />
          </button>
        )}
        <button className="w-[3rem]" onClick={() => handTemplateUpdate()}>
          <Tick width="100%" height="100%" />
        </button>
        {isCreateNew ? (
          <button className="w-[3rem]" onClick={() => handleTemplateDelete()}>
            <Cancel width="100%" height="100%" />
          </button>
        ) : (
          <button className="w-[3rem]" onClick={() => handleTemplateArchive()}>
            <Archive width="100%" height="100%" />
          </button>
        )}
      </div>
      <div className="flex items-end justify-start  w-full gap-8">
        {/* title */}
        <div className="flex-1 ">
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Checklist title"
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
            value={newItem.title}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        {/* category */}
        <div className="flex-1">
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 capitalize"
            value={newItem?.category_id || 1}
            onChange={handleCategoryChange}
          >
            <option disabled>Select a Category</option>
            {categories?.length > 0 &&
              categories.map((category, index) => (
                <option key={index} value={category.category_id || 1}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {/* site setting */}
        <div className="flex flex-col flex-1 basis-1/4">
          <button
            className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500] flex-2 w-fit "
            onClick={handleSiteSettingOpen}
          >
            Site Visibilty to Checklist
          </button>
          {isSettingSiteVisibility && (
            <div className="flex items-center justify-center flex-col h-fit  z-50">
              <div className="w-fit bg-white rounded-xl p-8 shadow-2xl ">
                <div className="flex justify-around items-center gap-7">
                  <h2 className="text-2xl tracking-wider font-bold text-b-active-blue uppercase">
                    Set Site Visibility
                  </h2>
                  <button
                    className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500]  tracking-wider"
                    onClick={handleSiteSettingClose}
                  >
                    Done
                  </button>
                </div>
                <div className="flex gap-2 mt-3 items-center">
                  <input
                    type="checkbox"
                    className="scale-[1.5]"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <label className="text-xl font-[500] text-b-mid-grey ">
                    All
                  </label>
                </div>
                {regions.map((region, index) => (
                  <div key={index} className="my-6 ">
                    <h4 className="font-[500] uppercase text-lg text-b-mid-grey mb-1">
                      {region}
                    </h4>
                    <div className=" flex gap-6 flex-wrap">
                      {Sites.filter((site) => site.region === region).map(
                        (site) => (
                          <div key={site.site_id} className="flex gap-2">
                            <input
                              type="checkbox"
                              value={site.site_id}
                              checked={selectedSites.includes(site.site_id)}
                              onChange={handleSiteCheck}
                              className="scale-[1.5]"
                            />
                            <label className="text-xl capitalize">
                              {site.site_name}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* enviro */}
        <button
          className="whitespace-nowrap p-2 text-lg rounded-md text-white  disabled:opacity-50 capitalize font-[500] flex-2 w-fit "
          style={{
            backgroundColor: isEnvironmentRelated ? '#066F10' : '#BDBDBD',
          }}
          onClick={handleEnvironmentRelated}
        >
          {isEnvironmentRelated ? 'environmental' : 'non-Environmental'}
        </button>
      </div>
      <button
        className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500]  my-6"
        onClick={handleCreating}
        style={{
          backgroundColor: isCreating
            ? isListItemLoading
              ? '#9A8700'
              : '#C24500'
            : '',
          marginBottom: isCreating ? 10 : 20,
        }}
      >
        {isCreating
          ? isListItemLoading
            ? 'creating...'
            : 'cancel '
          : 'Add list item'}
      </button>
      {isCreating && (
        <div className="flex w-full items-center gap-5 mb-10">
          <div className="flex flex-col flex-2 r gap-4 items-stretch justify-between">
            {/* keyword */}
            <div>
              <label className="block  font-medium text-gray-700 mb-1">
                List Item Keyword
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                value={newListItem.keyword}
                onChange={handleItemChange}
                name="keyword"
              />
            </div>
            <div className="flex flex-col">
              <button
                className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500] flex-2 w-fit "
                onClick={handleItemSiteSettingOpen}
              >
                Site Visibilty To List Item
              </button>
              {isItemSiteSettingOpen && (
                <div className="w-fit bg-white rounded-xl p-8 shadow-2xl ">
                  <div className="flex justify-around items-center gap-7">
                    <h2 className="text-2xl tracking-wider font-bold text-b-active-blue uppercase">
                      Set Site Visibility
                    </h2>
                    <button
                      className="whitespace-nowrap p-2 text-lg bg-b-mid-blue rounded-md text-white hover:bg-b-active-blue disabled:opacity-50 capitalize font-[500]  tracking-wider"
                      onClick={handleItemSiteSettingClose}
                    >
                      Done
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3 items-center">
                    <input
                      type="checkbox"
                      className="scale-[1.5]"
                      checked={itemSiteSelectedAll}
                      onChange={handleSelectAllItemSites}
                    />
                    <label className="text-xl font-[500] text-b-mid-grey ">
                      All
                    </label>
                  </div>
                  {regions.map((region, index) => (
                    <div key={index} className="my-6 ">
                      <h4 className="font-[500] uppercase text-lg text-b-mid-grey mb-1">
                        {region}
                      </h4>
                      <div className=" flex gap-6 flex-wrap">
                        {Sites.filter(
                          (site) =>
                            site.region === region &&
                            newItem.sites.includes(site.site_id),
                        ).map((site) => (
                          <div key={site.site_id} className="flex gap-2">
                            <input
                              type="checkbox"
                              value={site.site_id}
                              checked={itemSites.includes(site.site_id)}
                              onChange={handleItemSiteCheck}
                              className="scale-[1.5]"
                            />
                            <label className="text-xl capitalize">
                              {site.site_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <label className="block  font-medium text-gray-700 mb-1">
              List Item Description
            </label>
            <div className="relative">
              <textarea
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                rows={4}
                value={newListItem.description}
                onChange={handleItemChange}
                name="description"
              ></textarea>
              <div className="absolute bottom-2 right-2 flex gap-4 items-center justify-center">
                {isListItemLoading ? (
                  <div className="animate-spin w-[2.5rem] mr-3 mb-3">
                    <Loader width="100%" height="100%" />
                  </div>
                ) : (
                  <button
                    className=" text-white rounded-full p-1 w-[3rem] hover:scale-110 transform duration-300"
                    onClick={handItemCreate}
                  >
                    <Add width="100%" height="100%" />{' '}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {listitems?.length > 0 &&
          listitems.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              sites={newItem.sites}
              isDeleting={itemBeingDeleted === item.listitem_id}
              handleDeleting={() => handleDelete(item.listitem_id)}
              cancelDelete={cancelDelete}
              onItemSiteUpdate={handleItemSiteUpdate}
            />
          ))}
      </div>
      {/* item delete popup */}

      {isTemplateUpdated && (
        <Popup
          content={
            isCreateNew
              ? 'Template created and published'
              : 'Template updated and published'
          }
          confirmation={false}
          title="Update Confirmation"
        >
          <Tick />
        </Popup>
      )}
      {isTemplateSaved && (
        <Popup
          content={
            isCreateNew
              ? 'Template created and saved to drafts'
              : 'Template updated and saved to drafts'
          }
          title="Changes Saved"
          confirmation={false}
        >
          <Save />
        </Popup>
      )}
      {isTemplateArchived && (
        <Popup
          content="Template archived"
          confirmation={false}
          title="Archive Confirmation"
        >
          <Archive />
        </Popup>
      )}
      {isTemplateDeleted && (
        <Popup
          title="Cancelled"
          confirmation={false}
          content="Cancelled creating new template"
        >
          <Cancel />
        </Popup>
      )}
    </div>
  )
}

export default Form
