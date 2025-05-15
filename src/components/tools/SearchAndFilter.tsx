
import React from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      <Input
        placeholder="Search tools..."
        className="max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="ideation">Ideation</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SearchAndFilter;
