import { ComponentProps } from 'react';

import { Select } from '@/base/components/ui/select';

export type ProgrammingLanguage = {
  id: number;
  name: string;
  editorValue: string;
};

export const programmingLanguages: ProgrammingLanguage[] = [
  {
    id: 45,
    name: 'Assembly (NASM 2.14.02)',
    editorValue: 'nasm',
  },
  {
    id: 46,
    name: 'Bash (5.0.0)',
    editorValue: 'bash',
  },
  {
    id: 104,
    name: 'C (Clang 18.1.8)',
    editorValue: 'c',
  },
  {
    id: 110,
    name: 'C (Clang 19.1.7)',
    editorValue: 'c',
  },
  {
    id: 75,
    name: 'C (Clang 7.0.1)',
    editorValue: 'c',
  },
  {
    id: 76,
    name: 'C++ (Clang 7.0.1)',
    editorValue: 'cpp',
  },
  {
    id: 103,
    name: 'C (GCC 14.1.0)',
    editorValue: 'c',
  },
  {
    id: 105,
    name: 'C++ (GCC 14.1.0)',
    editorValue: 'cpp',
  },
  {
    id: 48,
    name: 'C (GCC 7.4.0)',
    editorValue: 'c',
  },
  {
    id: 52,
    name: 'C++ (GCC 7.4.0)',
    editorValue: 'cpp',
  },
  {
    id: 49,
    name: 'C (GCC 8.3.0)',
    editorValue: 'c',
  },
  {
    id: 53,
    name: 'C++ (GCC 8.3.0)',
    editorValue: 'cpp',
  },
  {
    id: 50,
    name: 'C (GCC 9.2.0)',
    editorValue: 'c',
  },
  {
    id: 54,
    name: 'C++ (GCC 9.2.0)',
    editorValue: 'cpp',
  },
  {
    id: 86,
    name: 'Clojure (1.10.1)',
    editorValue: 'clojure',
  },
  {
    id: 51,
    name: 'C# (Mono 6.6.0.161)',
    editorValue: 'csharp',
  },
  {
    id: 90,
    name: 'Dart (2.19.2)',
    editorValue: 'dart',
  },
  {
    id: 56,
    name: 'D (DMD 2.089.1)',
    editorValue: 'd',
  },
  {
    id: 57,
    name: 'Elixir (1.9.4)',
    editorValue: 'elixir',
  },
  {
    id: 87,
    name: 'F# (.NET Core SDK 3.1.202)',
    editorValue: 'fsharp',
  },
  {
    id: 60,
    name: 'Go (1.13.5)',
    editorValue: 'go',
  },
  {
    id: 95,
    name: 'Go (1.18.5)',
    editorValue: 'go',
  },
  {
    id: 106,
    name: 'Go (1.22.0)',
    editorValue: 'go',
  },
  {
    id: 107,
    name: 'Go (1.23.5)',
    editorValue: 'go',
  },
  {
    id: 91,
    name: 'Java (JDK 17.0.6)',
    editorValue: 'java',
  },
  {
    id: 62,
    name: 'Java (OpenJDK 13.0.1)',
    editorValue: 'java',
  },
  {
    id: 63,
    name: 'JavaScript (Node.js 12.14.0)',
    editorValue: 'javascript',
  },
  {
    id: 93,
    name: 'JavaScript (Node.js 18.15.0)',
    editorValue: 'javascript',
  },
  {
    id: 97,
    name: 'JavaScript (Node.js 20.17.0)',
    editorValue: 'javascript',
  },
  {
    id: 102,
    name: 'JavaScript (Node.js 22.08.0)',
    editorValue: 'javascript',
  },
  {
    id: 78,
    name: 'Kotlin (1.3.70)',
    editorValue: 'kotlin',
  },
  {
    id: 111,
    name: 'Kotlin (2.1.10)',
    editorValue: 'kotlin',
  },
  {
    id: 64,
    name: 'Lua (5.3.5)',
    editorValue: 'lua',
  },
  {
    id: 79,
    name: 'Objective-C (Clang 7.0.1)',
    editorValue: 'objective-c',
  },
  {
    id: 67,
    name: 'Pascal (FPC 3.0.4)',
    editorValue: 'pascal',
  },
  {
    id: 85,
    name: 'Perl (5.28.1)',
    editorValue: 'perl',
  },
  {
    id: 68,
    name: 'PHP (7.4.1)',
    editorValue: 'php',
  },
  {
    id: 98,
    name: 'PHP (8.3.11)',
    editorValue: 'php',
  },
  {
    id: 43,
    name: 'Plain Text',
    editorValue: '',
  },
  {
    id: 70,
    name: 'Python (2.7.17)',
    editorValue: 'python',
  },
  {
    id: 92,
    name: 'Python (3.11.2)',
    editorValue: 'python',
  },
  {
    id: 100,
    name: 'Python (3.12.5)',
    editorValue: 'python',
  },
  {
    id: 109,
    name: 'Python (3.13.2)',
    editorValue: 'python',
  },
  {
    id: 71,
    name: 'Python (3.8.1)',
    editorValue: 'python',
  },
  {
    id: 80,
    name: 'R (4.0.0)',
    editorValue: 'r',
  },
  {
    id: 99,
    name: 'R (4.4.1)',
    editorValue: 'r',
  },
  {
    id: 72,
    name: 'Ruby (2.7.0)',
    editorValue: 'ruby',
  },
  {
    id: 73,
    name: 'Rust (1.40.0)',
    editorValue: 'rust',
  },
  {
    id: 108,
    name: 'Rust (1.85.0)',
    editorValue: 'rust',
  },
  {
    id: 81,
    name: 'Scala (2.13.2)',
    editorValue: 'scala',
  },
  {
    id: 112,
    name: 'Scala (3.4.2)',
    editorValue: 'scala',
  },
  {
    id: 82,
    name: 'SQL (SQLite 3.27.2)',
    editorValue: 'sql',
  },
  {
    id: 83,
    name: 'Swift (5.2.3)',
    editorValue: 'swift',
  },
  {
    id: 74,
    name: 'TypeScript (3.7.4)',
    editorValue: 'typescript',
  },
  {
    id: 94,
    name: 'TypeScript (5.0.3)',
    editorValue: 'typescript',
  },
  {
    id: 101,
    name: 'TypeScript (5.6.2)',
    editorValue: 'typescript',
  },
  {
    id: 84,
    name: 'Visual Basic.Net (vbnc 0.0.0.5943)',
    editorValue: 'vb',
  },
];

interface ProgrammingLanguageSelectProps
  extends Omit<
    Extract<ComponentProps<typeof Select>, { multiple?: false }>,
    'multiple' | 'clearable' | 'options' | 'value' | 'onChange'
  > {
  value?: ProgrammingLanguage;
  onChange?: (lang: ProgrammingLanguage) => void;
}

export function ProgrammingLanguageSelect({ value, ...props }: ProgrammingLanguageSelectProps) {
  return (
    <Select
      multiple={false}
      clearable={false}
      options={programmingLanguages.map((lang) => ({
        value: lang,
        label: lang.name,
      }))}
      value={value ?? programmingLanguages[0]}
      {...props}
    />
  );
}
