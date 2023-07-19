// BookFilter.tsx
import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface BookFilterProps {
  onFilterChange: (filter: string) => void;
}

const BookFilter: React.FC<BookFilterProps> = ({ onFilterChange }) => {
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Filter by Title or Author"
      onChange={handleFilterChange}
    />
  );
};

export default BookFilter;
