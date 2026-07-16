import Banner from '../models/Banner.js';

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const { title, title_color, subtitle, subtitle_color, button_text, button_link, is_active } = req.body;
    let image = '';
    
    if (req.file) {
      image = req.file.path.replace(/\\/g, '/'); // Normalize path
    }

    const banner = await Banner.create({
      title,
      title_color: title_color || '#FFFFFF',
      subtitle,
      subtitle_color: subtitle_color || '#FFFFFF',
      button_text,
      button_link,
      image,
      is_active: is_active === 'true' || is_active === true,
    });

    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, title_color, subtitle, subtitle_color, button_text, button_link, is_active } = req.body;
    
    const banner = await Banner.findByPk(id);

    if (banner) {
      if (req.file) {
        banner.image = req.file.path.replace(/\\/g, '/');
      }

      banner.title = title !== undefined ? title : banner.title;
      banner.title_color = title_color !== undefined ? title_color : banner.title_color;
      banner.subtitle = subtitle !== undefined ? subtitle : banner.subtitle;
      banner.subtitle_color = subtitle_color !== undefined ? subtitle_color : banner.subtitle_color;
      banner.button_text = button_text !== undefined ? button_text : banner.button_text;
      banner.button_link = button_link !== undefined ? button_link : banner.button_link;
      
      const parsedIsActive = is_active === 'true' || is_active === true;
      banner.is_active = parsedIsActive !== undefined ? parsedIsActive : banner.is_active;

      await banner.save();
      res.json(banner);
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);

    if (banner) {
      await banner.destroy();
      res.json({ message: 'Banner removed' });
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
