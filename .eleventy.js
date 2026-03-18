// Imports
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginMinifier = require("@sherby/eleventy-plugin-files-minifier");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

// Configs
const configCss = require("./src/config/css");
const configSitemap = require("./src/config/sitemap");
const configServer = require("./src/config/server");

// Other
const filterPostDate = require("./src/config/postDate");
const isProduction = configServer.isProduction;

module.exports = function (eleventyConfig) {
    /**=====================================================================
          EXTENSIONS - Recognising non-default languages as templates 
    =======================================================================*/

    /**
     *  CSS EXTENSION
     *  Allows CSS files to be processed/minified
     */
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", configCss);

    /**=====================================================================
                                END EXTENSIONS
    =======================================================================*/


    /**=====================================================================
                  PLUGINS - Adds additional eleventy functionality 
    =======================================================================*/

    eleventyConfig.addPlugin(pluginEleventyNavigation);

    eleventyConfig.addPlugin(pluginSitemap, configSitemap);

    if (isProduction) {
        eleventyConfig.addPlugin(pluginMinifier);
    }

    /**=====================================================================
                                END PLUGINS
    =======================================================================*/


    /**======================================================================
       PASSTHROUGHS - Copy source files to /public with no 11ty processing
    ========================================================================*/

    // ✅ Copy ALL assets including JS (no exclusions now)
    eleventyConfig.addPassthroughCopy("./src/assets");

    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");

    /**=====================================================================
                              END PASSTHROUGHS
    =======================================================================*/


    /**======================================================================
               FILTERS - Modify data in template files at build time
    ========================================================================*/

    eleventyConfig.addFilter("postDate", filterPostDate);

    /**=====================================================================
                                    END FILTERS
    =======================================================================*/


    /**======================================================================
                  SHORTCODES - Output data using JS at build time
    ========================================================================*/

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    /**=====================================================================
                                END SHORTCODES
    =======================================================================*/


    /**=====================================================================
                                SERVER SETTINGS
    =======================================================================*/

    eleventyConfig.setServerOptions(configServer);

    /**=====================================================================
                              END SERVER SETTINGS
    =======================================================================*/

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        htmlTemplateEngine: "njk",
    };
};