import Popup from '../models/Popup.js';

export const getPopups = async (req, res) => {
  try {
    const popups = await Popup.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(popups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPopup = async (req, res) => {
  try {
    const { title, description, is_active } = req.body;
    let image = '';
    
    if (req.file) {
      image = req.file.path.replace(/\\/g, '/'); // Normalize path
    }

    const popup = await Popup.create({
      title,
      description,
      image,
      is_active: is_active === 'true' || is_active === true,
    });

    res.status(201).json(popup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_active } = req.body;
    
    const popup = await Popup.findByPk(id);

    if (popup) {
      if (req.file) {
        popup.image = req.file.path.replace(/\\/g, '/');
      }

      popup.title = title !== undefined ? title : popup.title;
      popup.description = description !== undefined ? description : popup.description;
      
      const parsedIsActive = is_active === 'true' || is_active === true;
      popup.is_active = is_active !== undefined ? parsedIsActive : popup.is_active;

      await popup.save();
      res.json(popup);
    } else {
      res.status(404).json({ message: 'Popup not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const popup = await Popup.findByPk(id);

    if (popup) {
      await popup.destroy();
      res.json({ message: 'Popup removed' });
    } else {
      res.status(404).json({ message: 'Popup not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
