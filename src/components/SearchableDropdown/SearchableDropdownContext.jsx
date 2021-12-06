import { createContext } from 'react';

const SearchableDropdownContext = createContext({
  onUpdate: () => {},
  searchValue: '',
  setSelected: () => {},
  selected: [],
  singleSelect: false,
  showTagsInFilter: true,
});

export default SearchableDropdownContext;
