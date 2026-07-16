import Setting from '../models/Setting.js';

export const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOne({ where: { key } });
    
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    let setting = await Setting.findOne({ where: { key } });
    
    if (!setting) {
      // If it doesn't exist, create it
      setting = await Setting.create({ key, value });
    } else {
      setting.value = value;
      await setting.save();
    }
    
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
