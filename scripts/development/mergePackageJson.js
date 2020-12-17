function index(obj, is, value) {
  if (typeof is === 'string') return index(obj, is.split('.'), value);
  if (is.length === 1 && value !== undefined) return obj[is[0]] = value;
  if (is.length === 0) return obj;
  return index(obj[is[0]], is.slice(1), value);
}

const fs = require('fs');

const packageJson = require('../../package.json');

let packageJsonExample = JSON.parse(fs.readFileSync('./package.json.example', 'utf8'));

const dynamic = {
  name: packageJsonExample.name,
  description: packageJsonExample.description,
  'scripts.dev': packageJsonExample.scripts.dev,
};

packageJsonExample = packageJson;

Object.keys(dynamic).forEach((key) => {
  index(packageJsonExample, key, dynamic[key]);
});

fs.writeFileSync('./package.json.example', JSON.stringify(packageJsonExample, null, 2));
