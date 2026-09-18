const fs = require('fs');
const app = fs.readFileSync('c:/Users/lOQ/Desktop/SCHOOL_ERP/School_ERP/src/App.jsx', 'utf8');
const sidebar = fs.readFileSync('c:/Users/lOQ/Desktop/SCHOOL_ERP/School_ERP/src/components/layout/Sidebar.jsx', 'utf8');
const routePaths = [...app.matchAll(/<Route[^>]*path=[\"']([^\"']+)[\"']/g)].map(m => m[1]);
const navPaths = [...sidebar.matchAll(/[<]NavLink[^>]*to=[\"']([^\"']+)[\"']/g)].map(m => m[1]);
const missingPaths = navPaths.filter(p => !routePaths.includes(p) && p !== '#' && !routePaths.includes(p.replace(/\/$/, '')));
console.log('Missing routes in App.jsx:\n', missingPaths.join('\n'));
