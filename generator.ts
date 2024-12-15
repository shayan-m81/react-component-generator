/**
 * A function to provide all files for a new component.
 * @Author  Shayan Montazeri
 * @Version 0.0.1
 */

const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');

const createDir = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }
};

const toKebabCase = (str: string) => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

const generateComponent = (componentName: string, customPath: string) => {
    const kebabCaseName = toKebabCase(componentName);
    const componentDir = path.join(customPath, kebabCaseName);
    createDir(componentDir);

    const componentTemplate = `
import type {I{{name}} as Props} from './${kebabCaseName}.type';

export const {{name}}: React.FC<Props> = (Props) => {
  return <div></div>;
};
  `;

    const typesTemplate = `
export interface I{{name}} {}
  `;

    const storybookTemplate = `
import type {Meta, Story} from '@storybook/react';
import {{name}} from './${kebabCaseName}';

const meta: Meta<typeof {{name}}> = {
      title: 'components/{{name}}',
      component: {{name}},
};
export default meta;
  
type Story = StoryObj<typeof {{name}}>;

export const Default: Story = {
      render: (args) => <{{name}} {...args} />,
      args: {},
};
  `;

    const indexTemplate = `
export * from './${kebabCaseName}';
export * from './${kebabCaseName}.type';
  `;

    const componentCompiled = Handlebars.compile(componentTemplate)({
        name: componentName,
    });
    const typesCompiled = Handlebars.compile(typesTemplate)({
        name: componentName,
    });
    const storybookCompiled = Handlebars.compile(storybookTemplate)({
        name: componentName,
    });
    const indexCompiled = Handlebars.compile(indexTemplate)({
        name: componentName,
    });

    fs.writeFileSync(
        path.join(componentDir, `${kebabCaseName}.tsx`),
        componentCompiled.trim(),
    );
    fs.writeFileSync(
        path.join(componentDir, `${kebabCaseName}.type.ts`),
        typesCompiled.trim(),
    );
    fs.writeFileSync(
        path.join(componentDir, `${kebabCaseName}.stories.tsx`),
        storybookCompiled.trim(),
    );
    fs.writeFileSync(path.join(componentDir, 'index.ts'), indexCompiled.trim());

    console.log(
        `${componentName} component created successfully at "${componentDir}"!`,
    );
};

const componentName = process.argv[2];
const customPath = process.argv[3] || 'src/components/shared';

if (!componentName) {
    console.log('Please provide a component name!');
    process.exit(1);
}

generateComponent(componentName, customPath);
