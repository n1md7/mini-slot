export const app = document.getElementById('app') as HTMLDivElement;
export const controls = document.getElementById('controls') as HTMLDivElement;
export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
export const screen = document.getElementById('screen') as HTMLDivElement;

if (!controls) throw new Error('Controls element not found!');
if (!screen) throw new Error('Screen element not found!');
if (!app) throw new Error('App element not found!');
