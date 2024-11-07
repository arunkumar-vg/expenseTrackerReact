module.exports = {
  appId: 'com.example.expensetracker',
  productName: 'Expense Tracker',
  files: [
    'build/**/*',
    'public/electron.js'
  ],
  extraMetadata: {
    main: 'public/electron.js'
  },
  win: {
    target: [
      "zip",
      "nsis"
    ],
    icon: 'public/logo512.png'
  },
  mac: {
    target: "dmg"
  },
  linux: {
    target: [
      "deb"
    ]
  },
  nsis: {
    oneClick: true,
    perMachine: false,
    allowElevation: false,
    allowToChangeInstallationDirectory: false,
    createDesktopShortcut: true,
    createStartMenuShortcut: true
  }
};
