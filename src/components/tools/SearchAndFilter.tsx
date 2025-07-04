
import React from 'react';
import { Input } from '@/components/ui/input';
import { ResponsiveDropdown } from '@/components/ui/responsive-dropdown';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'content', label: 'Content Creation' },
  { value: 'video', label: 'Video Tools' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'planning', label: 'Planning' },
  { value: 'ideation', label: 'Ideation' },
  { value: 'resources', label: 'Resources' },
];

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-8">
      <Input
        placeholder="Search tools..."
        className="max-w-md glass"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="w-full sm:w-auto min-w-[200px]">
        <ResponsiveDropdown
          options={categoryOptions}
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          placeholder="Select category"
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
