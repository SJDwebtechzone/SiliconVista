import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import '../admin.css';

const CourseManager = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals and UI state
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  
  const [editingSection, setEditingSection] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [currentSectionId, setCurrentSectionId] = useState(null);

  // Form states
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionOrder, setSectionOrder] = useState(0);
  
  const [topicContent, setTopicContent] = useState('');
  const [topicOrder, setTopicOrder] = useState(0);

  const fetchSections = async () => {
    try {
      const { data } = await axios.get('/api/course-sections');
      setSections(data);
    } catch (err) {
      setError('Failed to load course sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const getToken = () => localStorage.getItem('adminToken');

  // ---- SECTION HANDLERS ----
  const handleShowSectionModal = (section = null) => {
    setEditingSection(section);
    if (section) {
      setSectionTitle(section.title);
      setSectionOrder(section.display_order);
    } else {
      setSectionTitle('');
      setSectionOrder(sections.length + 1);
    }
    setShowSectionModal(true);
  };

  const handleSaveSection = async () => {
    try {
      if (editingSection) {
        await axios.put(`/api/admin/course-sections/${editingSection.id}`, 
          { title: sectionTitle, display_order: sectionOrder },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
      } else {
        await axios.post('/api/admin/course-sections', 
          { title: sectionTitle, display_order: sectionOrder },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
      }
      setShowSectionModal(false);
      fetchSections();
    } catch (err) {
      alert('Error saving section');
    }
  };

  const handleDeleteSection = async (id) => {
    if (window.confirm('Are you sure you want to delete this entire section AND all its topics?')) {
      try {
        await axios.delete(`/api/admin/course-sections/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchSections();
      } catch (err) {
        alert('Error deleting section');
      }
    }
  };

  // ---- TOPIC HANDLERS ----
  const handleShowTopicModal = (sectionId, topic = null) => {
    setCurrentSectionId(sectionId);
    setEditingTopic(topic);
    if (topic) {
      setTopicContent(topic.content);
      setTopicOrder(topic.display_order);
    } else {
      setTopicContent('');
      const sec = sections.find(s => s.id === sectionId);
      setTopicOrder(sec && sec.CourseSectionItems ? sec.CourseSectionItems.length + 1 : 1);
    }
    setShowTopicModal(true);
  };

  const handleSaveTopic = async () => {
    try {
      if (editingTopic) {
        await axios.put(`/api/admin/course-section-items/${editingTopic.id}`, 
          { content: topicContent, display_order: topicOrder },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
      } else {
        await axios.post('/api/admin/course-section-items', 
          { section_id: currentSectionId, content: topicContent, display_order: topicOrder },
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
      }
      setShowTopicModal(false);
      fetchSections();
    } catch (err) {
      alert('Error saving topic');
    }
  };

  const handleDeleteTopic = async (id) => {
    if (window.confirm('Delete this topic?')) {
      try {
        await axios.delete(`/api/admin/course-section-items/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchSections();
      } catch (err) {
        alert('Error deleting topic');
      }
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div className="py-4 px-2" style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: '"Poppins", sans-serif' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 className="section-title fs-3 mb-0" style={{ fontWeight: '500' }}>Course Content</h2>
        <Button 
          className="rounded-pill px-4 fw-bold shadow-sm border-0 d-flex align-items-center" 
          style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', color: 'white' }}
          onClick={() => handleShowSectionModal()}
        >
          <FaPlus className="me-2" /> Add Section
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {sections.length === 0 && !error ? (
        <div className="text-center py-5 text-muted bg-white rounded border shadow-sm">
          <h4>No course sections yet</h4>
          <p>Click "Add Section" to create your first course module.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded shadow-lg border-0 p-4 mb-4" style={{ transition: 'transform 0.2s' }}>
              <div 
                className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4" 
                style={{ cursor: 'pointer' }}
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              >
                <h2 className="section-title fs-4 mb-0 d-flex align-items-center">
                  <span style={{ color: '#1e293b', marginRight: '8px', fontWeight: '500' }}>Title:</span>
                  <span style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '500' }}>{section.title}</span>
                </h2>
                <span className="text-muted fw-bold">
                  {expandedSection === section.id ? '▲ Hide Topics' : '▼ Show Topics'}
                </span>
              </div>
              
              {expandedSection === section.id && (
                <div>
                  <h6 className="fw-bold mb-3">Topics</h6>
                  
                  {section.CourseSectionItems && section.CourseSectionItems.length > 0 ? (
                    <div className="d-flex flex-column gap-2 mb-4">
                      {section.CourseSectionItems.map((topic, index) => (
                        <div key={topic.id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded border-start border-4 shadow-sm" style={{ borderLeftColor: '#3b82f6' }}>
                          <span className="fw-bold text-dark" style={{ fontSize: '1.05rem' }}>{index + 1}. {topic.content}</span>
                          <div className="d-flex gap-2">
                            <Button variant="light" size="sm" className="text-primary fw-bold border" onClick={(e) => { e.stopPropagation(); handleShowTopicModal(section.id, topic); }}>
                              <FaEdit className="me-1" /> Edit
                            </Button>
                            <Button variant="light" size="sm" className="text-danger fw-bold border" onClick={(e) => { e.stopPropagation(); handleDeleteTopic(topic.id); }}>
                              <FaTrash className="me-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted fst-italic mb-4">No topics added to this section yet.</p>
                  )}

                  <div className="text-center mb-4">
                    <Button 
                      className="rounded-pill px-4 fw-bold shadow-sm border-0" 
                      style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', color: 'white' }}
                      onClick={(e) => { e.stopPropagation(); handleShowTopicModal(section.id); }}
                    >
                      <FaPlus className="me-2" /> Add Topic
                    </Button>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-center gap-3 mt-4 bg-light p-3 rounded border">
                    <Button variant="light" className="rounded-pill px-4 fw-bold text-primary border shadow-sm" onClick={(e) => { e.stopPropagation(); handleShowSectionModal(section); }}>
                      <FaEdit className="me-2" /> Edit Section
                    </Button>
                    <Button variant="light" className="rounded-pill px-4 fw-bold text-danger border shadow-sm" onClick={(e) => { e.stopPropagation(); handleDeleteSection(section.id); }}>
                      <FaTrash className="me-2" /> Delete Section
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SECTION MODAL */}
      <Modal show={showSectionModal} onHide={() => setShowSectionModal(false)} centered style={{ fontFamily: '"Poppins", sans-serif' }}>
        <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', color: 'white', borderBottom: 'none' }}>
          <Modal.Title className="section-title fs-3">{editingSection ? 'Edit Section' : 'Add Section'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Section Title</Form.Label>
              <Form.Control 
                type="text" 
                value={sectionTitle} 
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="e.g. Verilog" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Display Order</Form.Label>
              <Form.Control 
                type="number" 
                value={sectionOrder} 
                onChange={(e) => setSectionOrder(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0 bg-light">
          <Button variant="outline-secondary" className="rounded-pill fw-bold" onClick={() => setShowSectionModal(false)}>Cancel</Button>
          <Button className="rounded-pill fw-bold border-0" style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', color: 'white' }} onClick={handleSaveSection}>Save Section</Button>
        </Modal.Footer>
      </Modal>

      {/* TOPIC MODAL */}
      <Modal show={showTopicModal} onHide={() => setShowTopicModal(false)} centered style={{ fontFamily: '"Poppins", sans-serif' }}>
        <Modal.Header closeButton style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', color: 'white', borderBottom: 'none' }}>
          <Modal.Title className="section-title fs-3">{editingTopic ? 'Edit Topic' : 'Add Topic'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Topic Content</Form.Label>
              <Form.Control 
                type="text" 
                value={topicContent} 
                onChange={(e) => setTopicContent(e.target.value)}
                placeholder="e.g. Verilog Basics" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Display Order</Form.Label>
              <Form.Control 
                type="number" 
                value={topicOrder} 
                onChange={(e) => setTopicOrder(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0 bg-light">
          <Button variant="outline-secondary" className="rounded-pill fw-bold" onClick={() => setShowTopicModal(false)}>Cancel</Button>
          <Button className="rounded-pill fw-bold border-0" style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', color: 'white' }} onClick={handleSaveTopic}>Save Topic</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default CourseManager;
