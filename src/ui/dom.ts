export const app = document.getElementById('app') as HTMLDivElement;
export const controls = document.getElementById('controls') as HTMLDivElement;
export const screen = document.getElementById('screen') as HTMLDivElement;
export const menu = document.getElementById('menu') as HTMLDivElement;

if (!controls) throw new Error('Controls element not found!');
if (!screen) throw new Error('Screen element not found!');
if (!app) throw new Error('App element not found!');
if (!menu) throw new Error('Menu element not found!');
