import CareerPartner from '../models/CareerPartner.js';

export const getPartners = async (req, res) => {
  try {
    const partners = await CareerPartner.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPartner = async (req, res) => {
  try {
    const { name, is_active } = req.body;
    let logo_url = '';

    if (req.file) {
      logo_url = req.file.path.replace(/\\/g, '/');
    }

    if (!logo_url) {
      return res.status(400).json({ message: 'Logo file is required' });
    }

    const partner = await CareerPartner.create({
      name,
      logo_url,
      is_active: is_active === 'true' || is_active === true,
    });

    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, is_active } = req.body;

    const partner = await CareerPartner.findByPk(id);

    if (partner) {
      partner.name = name || partner.name;
      partner.is_active = is_active !== undefined ? (is_active === 'true' || is_active === true) : partner.is_active;

      if (req.file) {
        partner.logo_url = req.file.path.replace(/\\/g, '/');
      }

      await partner.save();
      res.json(partner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await CareerPartner.findByPk(id);

    if (partner) {
      await partner.destroy();
      res.json({ message: 'Partner removed' });
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
