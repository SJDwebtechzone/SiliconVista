import NewsEvent from '../models/NewsEvent.js';

export const getNewsEvents = async (req, res) => {
  try {
    const items = await NewsEvent.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNewsEvent = async (req, res) => { 
  try {
    const { title, description, event_date, is_active } = req.body;
    let image = '';

    if (req.file) {
      image = req.file.path.replace(/\\/g, '/');
    }

    const item = await NewsEvent.create({
      title,
      description,
      event_date,
      image,
      is_active: is_active === 'true' || is_active === true,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNewsEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date, is_active } = req.body;

    const item = await NewsEvent.findByPk(id);

    if (item) {
      if (req.file) {
        item.image = req.file.path.replace(/\\/g, '/');
      }

      item.title = title !== undefined ? title : item.title;
      item.description = description !== undefined ? description : item.description;
      item.event_date = event_date !== undefined ? event_date : item.event_date;

      const parsedIsActive = is_active === 'true' || is_active === true;
      item.is_active = is_active !== undefined ? parsedIsActive : item.is_active;

      await item.save();
      res.json(item);
    } else {
      res.status(404).json({ message: 'News/Event item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNewsEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await NewsEvent.findByPk(id);

    if (item) {
      await item.destroy();
      res.json({ message: 'News/Event item removed' });
    } else {
      res.status(404).json({ message: 'News/Event item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};