import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'fych0nrj',
    dataset: 'production',
  },
  /**
   * Hosted Studio URL → https://xr-summits.sanity.studio
   */
  studioHost: 'xr-summits',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'oxppukmtsksohmcsnrdv1pvx',
  },
})
