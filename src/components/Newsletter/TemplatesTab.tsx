import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNewsletter } from '../../contexts/NewsletterContext';
import { Template } from '../../types/newsletter';
import TemplateCard from './TemplateCard';
import TemplateModal from './TemplateModal';
import CreateTemplateModal from './CreateTemplateModal';

const templateCategories = [
  'All', 'Technology', 'Business', 'Design', 'News', 'Marketing', 
  'Education', 'Health', 'Finance' 
];

const TemplatesTab: React.FC = () => {
  const navigate = useNavigate();
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useNewsletter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'All' || template.category === selectedCategory
  );

  const handlePreviewTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = (template: Template) => {
    // Navigate to campaign creation with selected template
    navigate(`/newsletter/create-campaign?template=${template.id}`);
    setSelectedTemplate(null);
  };

  const handleEditTemplate = (template: Template) => {
    // In a real app, this would open an edit modal
    console.log('Edit template:', template);
  };

  const handleDeleteTemplate = (template: Template) => {
    deleteTemplate(template.id);
  };

  const handleDuplicateTemplate = (template: Template) => {
    const duplicatedTemplate = {
      ...template,
      name: `${template.name} (Copy)`,
      uses: 0
    };
    delete (duplicatedTemplate as any).id;
    addTemplate(duplicatedTemplate);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const handleCreateTemplate = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Template Categories */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 overflow-x-auto">
          {templateCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleCreateTemplate}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Template</span>
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onPreview={handlePreviewTemplate}
            onUse={handleUseTemplate}
            onEdit={handleEditTemplate}
            onDelete={handleDeleteTemplate}
            onDuplicate={handleDuplicateTemplate}
          />
        ))}
      </div>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          onClose={handleCloseModal}
          onUse={handleUseTemplate}
        />
      )}

      {/* Create Template Modal */}
      <CreateTemplateModal
        isOpen={showCreateModal}
        onClose={handleCloseCreateModal}
      />
    </div>
  );
};

export default TemplatesTab;