import SearchIcon from "@assets/svg/search.svg?react";

type SearchInputProps = {
  onChange: (text: string) => void;
  placeholder?: string;
  value?: string;
};

export default function SearchInput({
  onChange,
  placeholder,
  value,
  ...remainingProps
}: SearchInputProps): JSX.Element {
  return (
    <div className="search-input">
      <SearchIcon />
      <input
        value={value}
        onChange={(text) => onChange(text.target.value)}
        placeholder={placeholder}
        {...remainingProps}
      />
    </div>
  );
}
