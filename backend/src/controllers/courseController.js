import CourseSection from '../models/CourseSection.js';
import CourseSectionItem from '../models/CourseSectionItem.js';

// ---- SECTION APIs ----

export const createSection = async (req, res) => {
  try {
    const { title, display_order } = req.body;
    const section = await CourseSection.create({ title, display_order });
    // Return section with empty items array
    res.status(201).json({ ...section.toJSON(), CourseSectionItems: [] });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create section', error: error.message });
  }
};

export const getSections = async (req, res) => {
  try {
    const sections = await CourseSection.findAll({
      include: [CourseSectionItem],
      order: [
        ['display_order', 'ASC'],
        [CourseSectionItem, 'display_order', 'ASC']
      ]
    });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sections', error: error.message });
  }
};

export const getSection = async (req, res) => {
  try {
    const section = await CourseSection.findByPk(req.params.id, {
      include: [CourseSectionItem],
      order: [[CourseSectionItem, 'display_order', 'ASC']]
    });
    if (!section) return res.status(404).json({ message: 'Section not found' });
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch section', error: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { title, display_order } = req.body;
    const section = await CourseSection.findByPk(req.params.id);
    if (!section) return res.status(404).json({ message: 'Section not found' });
    
    await section.update({ title, display_order });
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update section', error: error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const section = await CourseSection.findByPk(req.params.id);
    if (!section) return res.status(404).json({ message: 'Section not found' });
    
    await section.destroy(); // Will cascade delete items
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete section', error: error.message });
  }
};


// ---- TOPIC APIs ----

export const createTopic = async (req, res) => {
  try {
    const { section_id, content, display_order } = req.body;
    const topic = await CourseSectionItem.create({ section_id, content, display_order });
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add topic', error: error.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { content, display_order } = req.body;
    const topic = await CourseSectionItem.findByPk(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    await topic.update({ content, display_order });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update topic', error: error.message });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topic = await CourseSectionItem.findByPk(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    
    await topic.destroy();
    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete topic', error: error.message });
  }
};
