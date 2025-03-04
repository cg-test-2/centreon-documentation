// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
const config = {
  title: 'Centreon Documentation',
  tagline: '',
  url: 'https://docs.centreon.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/logo-centreon.png',
  organizationName: 'Centreon',
  projectName: 'Centreon Documentation',
  trailingSlash: true,
  
  noIndex: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeConfigs: {
      en: {
        label: '🇬🇧 English',
      },
      fr: {
        label: '🇫🇷 Français',
      },
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: false,
          admonitions: {},
          editUrl: 'https://github.com/centreon/centreon-documentation/edit/staging/',
          editLocalizedFiles: true,
          showLastUpdateTime: true,
          includeCurrentVersion: false,
          onlyIncludeVersions: ['22.10', '22.04', '21.10', '21.04', '20.10', '20.04'],
          versions: {
            '22.10': {
              label: '⭐ 22.10',
            },
            22.04: {
              label: '22.04',
              banner:'none',
            },
            '21.10': {
              label: '21.10',
              banner:'none',
            },
            21.04: {
              label: '21.04',
              banner:'unmaintained',
            },
            '20.10': {
              label: '20.10',
              banner:'unmaintained',
            },
            20.04: {
              label: '20.04',
              banner:'unmaintained',
            },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-8418698-13',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  scripts: [
    {
      src: '/js/fix-location.js',
      async: false,
      defer: false,
    },
  ],
  
  themes: [],

  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      },
    ],
    'plugin-image-zoom',
	[
      '@docusaurus/plugin-content-docs',
      {
        id: 'cloud',
        path: 'cloud',
        routeBasePath: 'cloud',
        sidebarPath: require.resolve('./cloud/sidebarsCloud.js'),
        breadcrumbs: false,
        editUrl: 'https://github.com/centreon/centreon-documentation/edit/staging/',
        editLocalizedFiles: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pp',
        path: 'pp',
        routeBasePath: 'pp',
        sidebarPath: require.resolve('./pp/sidebarsPp.js'),
        breadcrumbs: false,
        editUrl: 'https://github.com/centreon/centreon-documentation/edit/staging/',
        editLocalizedFiles: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: '3WEC6XPLDB',
        apiKey: 'be499306058f3e54012bab278e6e6d86',
        indexName: 'centreon',
        contextualSearch: true,
      },

      zoomSelector: '.markdown :not(.authority-availability) > img',

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'shell',
        additionalLanguages: [
          'java',
          'json',
          'cpp',
          'php',
          'python',
          'ruby',
          'bash',
          'perl',
          'powershell',
        ],
      },

      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      docs: {
        sidebar: {
          hideable: true,
        },
      },

      navbar: {
        hideOnScroll: false,
        title: '',
        logo: {
          alt: 'Logo Centreon Docs',
          src: 'img/logo-centreon.png',
          href: '/',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/welcome',
            position: 'left',
            label: 'Centreon OnPrem',
          },
		     {
            to: '/cloud/getting-started/architecture',
            label: 'Centreon Cloud',
            position: 'left',
            activeBaseRegex: '/cloud/',
          },
          {
            to: '/pp/integrations/plugin-packs/getting-started/introduction',
            label: 'Plugin Packs',
            position: 'left',
            activeBaseRegex: '/pp/',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              {
                to: 'https://docs-older.centreon.com',
                label: 'Older',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/welcome',
              },
              {
                label: 'API References',
                to: '/docs/api/introduction',
              },
              {
                label: 'Releases',
                to: '/docs/releases/introduction',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Corporate Website',
                href: 'https://www.centreon.com/en/',
              },
              {
                label: 'Blog',
                href: 'https://www.centreon.com/en/blog/',
              },
              {
                label: 'Download',
                href: 'https://download.centreon.com/',
              },
            ],
          },
          {
            title: 'Follow us',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/centreon/centreon',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Centreon',
              },
            ],
          },
        ],
        logo: {
          alt: 'Centreon Open Source Logo',
          src: 'img/logo-centreon.png',
        },
        copyright: `Copyright © 2005 - ${new Date().getFullYear()} Centreon`,
      },
    }),
    webpack: {
      jsLoader: (isServer) => ({
        loader: require.resolve('swc-loader'),
        options: {
          jsc: {
            "parser": {
              "syntax": "typescript",
              "tsx": true
            },
            target: 'es2017',
          },
          module: {
            type: isServer ? 'commonjs' : 'es6',
          }
        },
      }),
    },
};

module.exports = config;
