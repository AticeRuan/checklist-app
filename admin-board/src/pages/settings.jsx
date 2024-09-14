import OptionGroup from '../components/ui/optionGroup'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
//import site related actions and hooks
import {
  useUpdateSiteMutation,
  useDeleteSiteMutation,
  useAddSiteMutation,
} from '../app/api/siteApi'
import {
  updateSite as updateSiteAction,
  deleteSite as deleteSiteAction,
  addSite as addSiteAction,
} from '../app/features/site/siteSlice'
//import category related actions and hooks
import {
  updateCategory as updateCategoryAction,
  deleteCategory as deleteCategoryAction,
  addCategory as addCategoryAction,
} from '../app/features/category/categorySlice'
import {
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
} from '../app/api/categoryApi'
//import user related actions and hooks
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
} from '../app/api/userApi'
import {
  addUser as addUserAction,
  deleteUser as deleteUserAction,
  updateUserRole as updateUserRoleAction,
} from '../app/features/user/userSlice'

//import ip address related actions and hooks
import {
  useAddIpAddressMutation,
  useDeleteIpAddressMutation,
  useUpdateIpAddressMutation,
} from '../app/api/ipAddress'
import {
  addIpAddress as addIpAddressAction,
  deleteIpAddress as deleteIpAddressAction,
  updateIpAddress as updateIpAddressAction,
} from '../app/features/ipAddress/ipAddressSlice'
import Popup from '../components/ui/popup'
import { useEffect } from 'react'
import Loading from '../components/ui/loading'
import Error from '../components/ui/error'
import Loader from '../components/svg/loader'

const Settings = () => {
  const dispatch = useDispatch()

  //handle site settings logic
  const site = useSelector((state) => state.site.sites)
  const site_keys = ['site_name', 'region']
  const [
    updateSite,
    { isLoading: isUpdateSiteLoading, isError: isUpdateSiteError },
  ] = useUpdateSiteMutation()
  const [
    deleteSite,
    { isLoading: isDeletingSiteLoading, isError: isDeletingSiteError },
  ] = useDeleteSiteMutation()

  const [addSite, { isLoading: isAddSiteLoading, isError: isAddSiteError }] =
    useAddSiteMutation()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSiteUpdate = async (updatedItem) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      await updateSite({
        id: updatedItem.site_id,
        site_name: updatedItem.site_name,
        region: updatedItem.region,
      })
      dispatch(
        updateSiteAction({
          id: updatedItem.site_id,
          site_name: updatedItem.site_name,
          region: updatedItem.region,
        }),
      )
    } catch (error) {
      console.error('Error while updating site:', error)
      setIsError(true)
      setErrorMessage('Failed to update the site. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSiteDelete = async (id) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      await deleteSite(id)
      dispatch(deleteSiteAction(id))
    } catch (error) {
      console.error('Error while deleting site:', error)

      setIsError(true)
      setErrorMessage('Failed to delete the site. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSiteCreate = async (newSite) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      const newItem = await addSite(newSite)
      dispatch(addSiteAction(newItem.data))
    } catch (error) {
      console.error('Error while adding site:', error)
      setIsError(true)
      setErrorMessage('Failed to create the site. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  //handle user settings logic
  const users = useSelector((state) => state.user.users)
  const user_keys = ['user_name', 'role']
  const [addUser, { isLoading: isAddUserLoading, isError: isAddUserError }] =
    useAddUserMutation()
  const [
    deleteUser,
    { isLoading: isDeleteUserLoading, isError: isDeleteUserError },
  ] = useDeleteUserMutation()
  const [
    updateUser,
    { isLoading: isUpdateUserLoading, isError: isUpdateUserError },
  ] = useUpdateUserMutation()
  const [
    resetPassword,
    { isLoading: isResetPasswordLoading, isError: isResetPasswordError },
  ] = useResetPasswordMutation()

  const handleUserCreate = async (newUser) => {
    const data = newUser

    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      const newItem = await addUser(data)

      dispatch(addUserAction(newItem.data))
    } catch (error) {
      console.error('Error while adding user:', error)
      setIsError(true)
      setErrorMessage('Failed to create user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserDelete = async (id) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      await deleteUser(id)
      dispatch(deleteUserAction(id))
    } catch (error) {
      console.error('Error while deleting user:', error)
      setIsError(true)
      setErrorMessage('Failed to delete the user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserRoleUpdate = async (updatedItem) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      await updateUser({
        id: updatedItem.user_id,
        role: updatedItem.role,
      })
      dispatch(
        updateUserRoleAction({
          id: updatedItem.user_id,
          role: updatedItem.role,
        }),
      )
    } catch (error) {
      console.error('Error while updating user role:', error)
      setIsError(true)
      setErrorMessage('Failed to update the user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUserResetPassword = async (id) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      await resetPassword(id)

      dispatch(
        updateUserRoleAction({
          user_id: id,
          password: '00000000',
        }),
      )
    } catch (error) {
      console.error('Error while resetting user password:', error)
      setIsError(true)
      setErrorMessage('Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  //handle category settings logic
  const categories = useSelector((state) => state.category.categories)
  const category_keys = ['name', 'duration']
  const [
    updateCategory,
    { isLoading: isUpdateCategoryLoading, isError: isUpdateCategoryError },
  ] = useUpdateCategoryMutation()
  const [
    deleteCategory,
    { isLoading: isDeleteCategoryLoading, isError: isDeleteCategoryError },
  ] = useDeleteCategoryMutation()
  const [
    addCategory,
    { isLoading: isAddCategoryLoading, isError: isAddCategoryError },
  ] = useAddCategoryMutation()

  const handleCategoryUpdate = async (updatedItem) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      await updateCategory({
        id: updatedItem.category_id,
        category_name: updatedItem.category_name,
        duration: updatedItem.duration,
      })
      dispatch(
        updateCategoryAction({
          id: updatedItem.category_id,
          category_name: updatedItem.category_name,
          duration: updatedItem.duration,
        }),
      )
    } catch (error) {
      console.error('Error while updating category:', error)
      setIsError(true)
      setErrorMessage('Failed to udpate the category. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryDelete = async (id) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      if (id) {
        await deleteCategory(id)
      } else {
        console.error('Attempted to delete a category with an undefined ID')
      }

      dispatch(deleteCategoryAction(id))
    } catch (error) {
      console.error('Error while deleting category:', error)
      setIsError(true)
      setErrorMessage('Failed to delete the category. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryCreate = async (newCategory) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      const newItem = await addCategory(newCategory).unwrap()

      dispatch(addCategoryAction(newItem))
    } catch (error) {
      console.error('Error while adding category:', error)
      setIsError(true)
      setErrorMessage('Failed to create the category. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  //handle ip address settings logic
  const ipAddresses = useSelector((state) => state.ipAddress.ipAddresses)
  const ip_keys = ['site_name', 'ip_address']
  const [
    addIpAddress,
    { isLoading: isAddIpAddressLoading, isError: isAddIpAddressError },
  ] = useAddIpAddressMutation()
  const [
    deleteIpAddress,
    { isLoading: isDeleteIpAddressLoading, isError: isDeleteIpAddressError },
  ] = useDeleteIpAddressMutation()
  const [
    updateIpAddress,
    { isLoading: isUpdateIpAddressLoading, isError: isUpdateIpAddressError },
  ] = useUpdateIpAddressMutation()

  const handleIpAddressCreate = async (newIpAddress) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      const newItem = await addIpAddress(newIpAddress)
      dispatch(addIpAddressAction(newItem.data))
    } catch (error) {
      console.error('Error while adding ip address:', error)
      setIsError(true)
      setErrorMessage('Failed to add IP address. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleIpAddressDelete = async (id) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      await deleteIpAddress(id)
      dispatch(deleteIpAddressAction(id))
    } catch (error) {
      console.error('Error while deleting ip address:', error)
      setIsError(true)
      setErrorMessage('Failed to delete IP address. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleIpAddressUpdate = async (updatedItem) => {
    try {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      await updateIpAddress({
        id: updatedItem.ip_address_id,
        ip_address: updatedItem.ip_address,
      })
      dispatch(
        updateIpAddressAction({
          id: updatedItem.ip_address_id,
          ip_address: updatedItem.ip_address,
          location: updatedItem.location,
        }),
      )
    } catch (error) {
      console.error('Error while updating ip address:', error)
      setIsError(true)
      setErrorMessage('Failed to update IP address. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (
      isUpdateSiteError ||
      isDeletingSiteError ||
      isAddSiteError ||
      isUpdateCategoryError ||
      isDeleteCategoryError ||
      isAddCategoryError ||
      isAddUserError ||
      isDeleteUserError ||
      isUpdateUserError ||
      isResetPasswordError ||
      isAddIpAddressError ||
      isDeleteIpAddressError ||
      isUpdateIpAddressError
    ) {
      setIsError(true)
    }
    if (
      isUpdateSiteLoading ||
      isDeletingSiteLoading ||
      isAddSiteLoading ||
      isUpdateCategoryLoading ||
      isDeleteCategoryLoading ||
      isAddCategoryLoading ||
      isAddUserLoading ||
      isDeleteUserLoading ||
      isUpdateUserLoading ||
      isResetPasswordLoading ||
      isAddIpAddressLoading ||
      isDeleteIpAddressLoading ||
      isUpdateIpAddressLoading
    )
      setIsLoading(true)
    else setIsLoading(false)
  }, [
    isUpdateSiteError,
    isDeletingSiteError,
    isAddSiteError,
    isUpdateCategoryError,
    isDeleteCategoryError,
    isAddCategoryError,
    isAddUserError,
    isDeleteUserError,
    isUpdateUserError,
    isResetPasswordError,
    isAddIpAddressError,
    isDeleteIpAddressError,
    isUpdateIpAddressError,
    isUpdateSiteLoading,
    isDeletingSiteLoading,
    isAddSiteLoading,
    isUpdateCategoryLoading,
    isDeleteCategoryLoading,
    isAddCategoryLoading,
    isAddUserLoading,
    isDeleteUserLoading,
    isUpdateUserLoading,
    isResetPasswordLoading,
    isAddIpAddressLoading,
    isDeleteIpAddressLoading,
    isUpdateIpAddressLoading,
  ])

  if (isError)
    return (
      <Error
        text={
          errorMessage != ''
            ? errorMessage
            : 'Something went wrong, refresh and try again'
        }
      />
    )

  return (
    <div className="p-[3rem] flex flex-col items-start justify-start w-full ">
      {isLoading && (
        <div className=" w-[80vw] h-20 fixed top-15 flex items-center justify-center    z-40 backdrop-blur-sm">
          <div className="flex text-b-mid-blue font-[500] gap-4 items-center justify-center text-lg">
            <div className="animate-spin">
              <Loader />
            </div>
            <p>Processing</p>
          </div>
        </div>
      )}

      <h1 className="text-[1.875rem] font-[600] leading-[1.5rem] mb-[3.5rem]">
        Settings
      </h1>
      <div className=" flex items-center flex-col gap-16 justify-center w-full ">
        <OptionGroup
          title="Sites"
          data={site}
          keys={site_keys}
          handleDelete={(id) => handleSiteDelete(id)}
          handleUpdate={(updatedItem) => handleSiteUpdate(updatedItem)}
          id_key="site_id"
          handleCreate={(newSite) => handleSiteCreate(newSite)}
        />{' '}
        <OptionGroup
          title="Categories"
          data={categories}
          keys={category_keys}
          handleDelete={(id) => handleCategoryDelete(id)}
          handleUpdate={(updatedItem) => handleCategoryUpdate(updatedItem)}
          id_key="category_id"
          handleCreate={(newCategory) => handleCategoryCreate(newCategory)}
        />
        <OptionGroup
          title="Users"
          data={users}
          keys={user_keys}
          handleDelete={(id) => handleUserDelete(id)}
          handleUpdate={(updatedItem) => handleUserRoleUpdate(updatedItem)}
          id_key="user_id"
          handleCreate={(newUser) => handleUserCreate(newUser)}
          isUser={true}
          handleReset={(id) => handleUserResetPassword(id)}
        />
        <OptionGroup
          title="IP Address Range"
          data={ipAddresses}
          keys={ip_keys}
          handleDelete={(id) => handleIpAddressDelete(id)}
          handleUpdate={(updatedItem) => handleIpAddressUpdate(updatedItem)}
          id_key="ip_address_id"
          handleCreate={(newIpAddress) => handleIpAddressCreate(newIpAddress)}
        />
      </div>
    </div>
  )
}

export default Settings
