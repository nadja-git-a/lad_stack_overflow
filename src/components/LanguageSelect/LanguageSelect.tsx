import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type LanguageSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

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
        <MenuItem value="JavaScript">JavaScript</MenuItem>
        <MenuItem value="Python">Python</MenuItem>
        <MenuItem value="Java">Java</MenuItem>
        <MenuItem value="C/C++">C/C++</MenuItem>
        <MenuItem value="C#">C#</MenuItem>
        <MenuItem value="Go">Go</MenuItem>
        <MenuItem value="Kotlin">Kotlin</MenuItem>
        <MenuItem value="Ruby">Ruby</MenuItem>
      </Select>
    </FormControl>
  );
}
