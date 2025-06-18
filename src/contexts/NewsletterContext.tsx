import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Newsletter, Campaign, Template, Subscriber, Automation } from '../types/newsletter';
import { mockNewsletters, mockCampaigns, mockTemplates, mockSubscribers, mockAutomations } from '../data/NewsData';

interface NewsletterContextType {
  newsletters: Newsletter[];
  campaigns: Campaign[];
  templates: Template[];
  subscribers: Subscriber[];
  automations: Automation[];
  addNewsletter: (newsletter: Omit<Newsletter, 'id'>) => void;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  addTemplate: (template: Omit<Template, 'id'>) => void;
  updateTemplate: (id: string, template: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  addSubscriber: (subscriber: Omit<Subscriber, 'id'>) => void;
  updateSubscriber: (id: string, subscriber: Partial<Subscriber>) => void;
  deleteSubscriber: (id: string) => void;
  addAutomation: (automation: Omit<Automation, 'id'>) => void;
  updateAutomation: (id: string, automation: Partial<Automation>) => void;
  deleteAutomation: (id: string) => void;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  if (context === undefined) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
};

interface NewsletterProviderProps {
  children: ReactNode;
}

export const NewsletterProvider: React.FC<NewsletterProviderProps> = ({ children }) => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>(mockNewsletters);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(mockSubscribers);
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);

  const addNewsletter = (newsletter: Omit<Newsletter, 'id'>) => {
    const newNewsletter = {
      ...newsletter,
      id: Date.now().toString(),
    };
    setNewsletters(prev => [...prev, newNewsletter]);
  };

  const addCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const newCampaign = {
      ...campaign,
      id: Date.now().toString(),
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const addTemplate = (template: Omit<Template, 'id'>) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const updateTemplate = (id: string, updates: Partial<Template>) => {
    setTemplates(prev => prev.map(template => 
      template.id === id ? { ...template, ...updates } : template
    ));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const addSubscriber = (subscriber: Omit<Subscriber, 'id'>) => {
    const newSubscriber = {
      ...subscriber,
      id: Date.now().toString(),
    };
    setSubscribers(prev => [...prev, newSubscriber]);
  };

  const updateSubscriber = (id: string, updates: Partial<Subscriber>) => {
    setSubscribers(prev => prev.map(subscriber => 
      subscriber.id === id ? { ...subscriber, ...updates } : subscriber
    ));
  };

  const deleteSubscriber = (id: string) => {
    setSubscribers(prev => prev.filter(subscriber => subscriber.id !== id));
  };

  const addAutomation = (automation: Omit<Automation, 'id'>) => {
    const newAutomation = {
      ...automation,
      id: Date.now().toString(),
    };
    setAutomations(prev => [...prev, newAutomation]);
  };

  const updateAutomation = (id: string, updates: Partial<Automation>) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === id ? { ...automation, ...updates } : automation
    ));
  };

  const deleteAutomation = (id: string) => {
    setAutomations(prev => prev.filter(automation => automation.id !== id));
  };

  return (
    <NewsletterContext.Provider value={{
      newsletters,
      campaigns,
      templates,
      subscribers,
      automations,
      addNewsletter,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      addSubscriber,
      updateSubscriber,
      deleteSubscriber,
      addAutomation,
      updateAutomation,
      deleteAutomation,
    }}>
      {children}
    </NewsletterContext.Provider>
  );
};