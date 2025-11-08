import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type LanguageSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const languages = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'C/C++', label: 'C/C++' },
  { value: 'C#', label: 'C#' },
  { value: 'Go', label: 'Go' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'Ruby', label: 'Ruby' },
];

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel id="language">Language</InputLabel>
      <Select
        labelId="language"
        id="language-select"
        label="Language"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {languages.map((language) => (
          <MenuItem key={language.value} value={language.value}>
            {language.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
