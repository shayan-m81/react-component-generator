# React Component Generator

A customizable Node.js script to automate generating React components with TypeScript support, Storybook integration, and structured templates.

## Features

- Automatically generate React components in a structured format.
- Includes customizable templates for:
  - Component file (`.tsx`)
  - Types file (`.type.ts`)
  - Storybook file (`.stories.tsx`)
  - Index file (`index.ts`)
- Converts component names to kebab-case for consistent file naming.
- Fully customizable to adapt to your team's needs.

---

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/shayan-m81/react-component-generator.git
2. Navigate to the project directory:

   ```
   cd react-component-generator
3. Install dependencies:

   ```
   npm install
## Usage

### Method 1: Using the Script Directly

To generate a new React component, run the script with the following command:

   ```
   node generate.js [ComponentName] [CustomPath]
   ```
    
ComponentName: The name of the React component you want to create. It will be automatically converted to kebab-case for file naming.
CustomPath (optional): The directory where the component should be created. Defaults to src/components/shared if not specified.

## Example:

   ```
   node generate.js Button src/components/ui
   ```

This will generate a Button component in the directory src/components/ui/button with the following files:

   ``` 
   button/
   ├── button.tsx
   ├── button.type.ts
   ├── button.stories.tsx
   └── index.ts
   ```
### Method 2: Using an NPM Script

You can also integrate the script into your package.json for easier usage. Add the following script to the scripts section of your package.json:
   ```
   "scripts": {
   "generate-component": "node generate.js"
   }
   ```
Now, you can generate components using the following command:

   ```
   npm run generate-component [ComponentName] [CustomPath]
   ```
## Example:

   ```
   npm run generate-component Button src/components/ui
   ```
This will generate the same output as Method 1.


## Customizing Templates

All templates are defined inline in the generate.js script. You can modify the following sections to suit your project needs:

1. Component Template:
   ```
   const componentTemplate = `
   import type {I{{name}} as Props} from './{{kebabCaseName}}.type';

   export const {{name}}: React.FC<Props> = (Props) => {
     return <div></div>;
   };
   `;
   ```
2. Types Template:
   ```
   const typesTemplate = `
   export interface I{{name}} {}
   `;
   ```
3. Storybook Template:
   ```
   const storybookTemplate = `
   import type {Meta, StoryObj} from '@storybook/react';
   import {{name}} from './{{kebabCaseName}}';

   const meta: Meta<typeof {{name}}> = {
         title: 'components/{{name}}',
         component: {{name}},
   };
   export default meta;

   export const Default: StoryObj<typeof {{name}}> = {
         render: (args) => <{{name}} {...args} />,
         args: {},
   };
   `;
   ```
4. Index Template:
   ```
   const indexTemplate = `
   export * from './{{kebabCaseName}}';
   export * from './{{kebabCaseName}}.type';
   `;
   ```
Edit these templates directly in the script to match your preferred coding style or project conventions.


## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests with your improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Repository Structure
   ```
   react-component-generator/ 
   ├── README.md
   ├── LICENSE
   ├── generate.js
   ├── package.json
   ├── .gitignore
   └── node_modules/ (ignored in the repository)
   ```
This version is fully optimized for GitHub's markdown styling and can be copied directly into a `README.md` file. Let me know if you need further adjustments!
