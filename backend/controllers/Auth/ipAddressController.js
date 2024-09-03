const db = require('../../models')

const IPAddress = db.IPAddress

const addIPAddress = async (req, res) => {
  try {
    const { ip_address, site_name } = req.body

    if (!ip_address || !site_name) {
      return res
        .status(400)
        .json({ message: 'IP Address and site name is required.' })
    }

    const ipAddress = await IPAddress.create({
      ip_address,
      site_name,
    })

    res.status(201).json(ipAddress)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

const getIPAddresses = async (req, res) => {
  try {
    const ipAddresses = await IPAddress.findAll()

    res.status(200).json(ipAddresses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

const getIPAddressById = async (req, res) => {
  try {
    const id = req.params.id

    const ipAddress = await IPAddress.findOne({
      where: { ip_address_id: id },
    })

    if (!ipAddress) {
      return res.status(404).json({ message: 'IP Address not found.' })
    }

    res.status(200).json(ipAddress)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

const updateIPAddress = async (req, res) => {
  try {
    const id = req.params.id
    const { ip_address } = req.body

    const ipAddress = await IPAddress.findOne({
      where: { ip_address_id: id },
    })

    if (!ipAddress) {
      return res.status(404).json({ message: 'IP Address not found.' })
    }

    const updatedipAddress = await ipAddress.update(
      { ip_address },
      { where: { ip_address_id: id } },
    )

    res.status(200).json(updatedipAddress)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

const deleteIPAddress = async (req, res) => {
  try {
    const id = req.params.id

    const ipAddress = await IPAddress.findOne({
      where: { ip_address_id: id },
    })

    if (!ipAddress) {
      return res.status(404).json({ message: 'IP Address not found.' })
    }

    await ipAddress.destroy()

    res.status(204).json({ message: 'IP Address deleted successfully.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

module.exports = {
  addIPAddress,
  getIPAddresses,
  getIPAddressById,
  updateIPAddress,
  deleteIPAddress,
}
