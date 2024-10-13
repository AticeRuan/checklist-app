import { useSelector } from 'react-redux'

const useSiteDetails = () => {
  const localSites = useSelector((state) => state.site.sites)
  const selectedSite = useSelector((state) => state.site.singleSite)

  const siteId = localSites?.find(
    (site) => site.site_name === selectedSite,
  )?.site_id

  return { localSites, selectedSite, siteId }
}

export default useSiteDetails
