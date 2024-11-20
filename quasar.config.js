/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

const { configure } = require("quasar/wrappers");

module.exports = configure(function (/* ctx */) {
  return {
    css: ["app.scss"],

    extras: ["fontawesome-v6", "roboto-font", "material-icons"],

    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node20",
      },
      vueRouterMode: "hash",

      // Adicionar configuração para garantir que MIME Types estejam corretos
      extendViteConf(viteConf) {
        viteConf.server = viteConf.server || {};
        viteConf.server.mimeTypes = {
          "application/javascript": ["js"],
        };
      },
    },

    devServer: {
      open: true, // opens browser window automatically
      before: (app) => {
        // Middleware para corrigir tipo MIME
        app.use((req, res, next) => {
          if (req.url.endsWith(".js")) {
            res.setHeader("Content-Type", "application/javascript");
          }
          next();
        });
      },
    },

    framework: {
      config: {},
      plugins: ["Dialog", "Notify", "LocalStorage"],
    },

    animations: ["jackInTheBox", "fadeInUp", "fadeOutDown"],

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ["render"],
    },

    pwa: {
      workboxMode: "generateSW",
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
    },

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      inspectPort: 5858,
      bundler: "packager",

      packager: {},

      builder: {
        appId: "blue-eyes",
      },
    },

    bex: {
      contentScripts: ["my-content-script"],
    },
  };
});
