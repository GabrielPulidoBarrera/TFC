// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';


import node from '@astrojs/node';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  security: {

    allowedDomains: [
      {
        hostname: '**.gabrielpulido.xyz',
        protocol: 'https'
      },
      {
        hostname: '*.gabrielpulido.xyz',
        protocol: 'https'
      },
      {
        hostname: 'n8n.gabrielpulido.xyz',
        protocol: 'https'
      },
      {
        hostname: 'gabrielpulido.xyz',
        protocol: 'https'
      },
    ],
  },
    
  output: "server",
  adapter: node({
    mode: 'standalone',
  }),
});