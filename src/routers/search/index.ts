import { Hono } from 'hono'

import { APP_COMMANDS_KEY, APP_CONFIG_KEY_PREFIX } from 'lib/constants'
import { searchProviders } from 'lib/search'
import { getItemList } from 'lib/utils'

const router = new Hono<{ Bindings: Bindings }>().basePath('/search')

router.get('/', async (c) => {
    const { cmd } = c.req.query()
    console.log(`command: ${cmd}`)
    const [commands = '', defaultSearchProvider] = await Promise.all([
        c.env.APP_NAMESPACE.get(APP_COMMANDS_KEY),
        c.env.APP_NAMESPACE.get(
            `${APP_CONFIG_KEY_PREFIX}:default_search_provider`
        ),
    ])
    const [first, ...rest] = cmd.split(' ')
    const item = getItemList(commands!).find((item) => item.command === first)
    if (item) return c.redirect(item.url.replace('%s', rest.join(' ')))
    return c.redirect(
        searchProviders[defaultSearchProvider || 'google'].replace('%s', cmd)
    )
})

export default router
