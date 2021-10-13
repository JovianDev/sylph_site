import UAParser from 'ua-parser-js';
let parser = new UAParser();

export const OS = parser.getOS();
console.log('OS USER OS', OS);

const version = (OS) => {
  if (OS?.name === 'Mac OS') {
    return;
    ('https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-MacOS/Sylph-1.0.0.dmg');
  }
  if (OS?.name === 'Windows') {
    return;
    ('https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-testing/Sylph.Setup.1.0.0.exe');
  }
};
export const sylphVersion = version(OS);
