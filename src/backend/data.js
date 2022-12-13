

export interface ColourOption {
    value: string;
    label: string;
    color: string;
    isFixed?: boolean;
    isDisabled?: boolean;
}


export const colourOptions: ColourOption[] = [
    { value: 'Filipino', label: 'Filipino', isDisabled: true },
    { value: 'Cebuano', label: 'Cebuano', color: '#0052CC', isDisabled: true },
    { value: 'Mandaya', label: 'Mandaya', color: '#5243AA', isDisabled: true },

];


export interface Languagess {
    value: string;
    label: string;
    color: string;
    isFixed?: boolean;
    isDisabled?: boolean;
}


export const languagess: Languagess[] = [

    { value: 'Filipino', label: 'Filipino', isDisabled: false },
    { value: 'Cebuano', label: 'Cebuano', color: '#0052CC', isDisabled: false },
    { value: 'Mandaya', label: 'Mandaya', color: '#5243AA', isDisabled: false },

];

export interface TestOption {
    value: string;
    label: string;
}


export const testOptions: TestOption[] = [
    { value: 'Option1', label: 'Option 1' },
    { value: 'Option2', label: 'Option 2' },
    { value: 'Option3', label: 'Option 3' },
    { value: 'Option4', label: 'Option 4' },

];

export interface TestOption2 {
    value: string;
    label: string;
}


export const testOptions2: TestOption2[] = [
    { value: 'Option1', label: 'Option 1' },
    { value: 'Option2', label: 'Option 2' },
    { value: 'Option3', label: 'Option 3' },
    { value: 'Option4', label: 'Option 4' },

];

export interface LanguageFluency {
    value: string;
    label: string;
}
export interface EducAttainment {
    value: string;
    label: string;
}


export const educAttainment: EducAttainment[] = [
    { value: 'No Schooling', label: 'No Schooling' },
    { value: 'Elementary Graduate', label: 'Elementary Graduate' },
    { value: 'Junior high school graduate', label: 'Junior high school graduate' },
    { value: 'Senior HighSchool Graduate', label: 'Senior HighSchool Graduate' },
    { value: 'College Undergraduate', label: 'College Undergraduate' },
    { value: 'Bachelors Degree', label: 'Bachelors Degree' },
    { value: 'Masters Degree', label: 'Masters Degree' },
    { value: 'Doctoral Degree', label: 'Doctoral Degree' },

];

export const languagefluency: LanguageFluency[] = [
    { value: 'Cebuano - Beginner', label: 'Cebuano - Beginner' },
    { value: 'Cebuano - Elementary', label: 'Cebuano - Elementary' },
    { value: 'Cebuano - Intermediate', label: 'Cebuano - Intermediate' },
    { value: 'Cebuano - Advanced', label: 'Cebuano - Advanced' },
    { value: 'Tagalog - Beginner', label: 'Tagalog - Beginner' },
    { value: 'Tagalog - Elementary', label: 'Tagalog - Elementary' },
    { value: 'Tagalog - Intermediate', label: 'Tagalog - Intermediate' },
    { value: 'Tagalog - Advanced', label: 'Tagalog - Advanced' },
    { value: 'Mandaya - Beginner', label: 'Mandaya - Beginner' },
    { value: 'Mandaya - Elementary', label: 'Mandaya - Elementary' },
    { value: 'Mandaya - Intermediate', label: 'Mandaya - Intermediate' },
    { value: 'Mandaya - Advanced', label: 'Mandaya - Advanced' },

]; 
