import { Context, Hono } from 'hono'
import { Fragment } from 'hono/jsx'

import { APP_CONFIG_KEY_PREFIX } from 'lib/constants'
import { searchProviders } from 'lib/search'

const options = Object.keys(searchProviders)

const router = new Hono<{ Bindings: Bindings }>().basePath('/config')

router
    .get('/default-search-engine', async (c) => {
        const defaultSearchProvider = await c.env.APP_NAMESPACE.get(
            `${APP_CONFIG_KEY_PREFIX}:default_search_provider`
        )
        if (!defaultSearchProvider) await initDefaultSearchProvider(c)
        return c.html(
            <Fragment>
                {options.map((op) =>
                    defaultSearchProvider === op ? (
                        <option value={op} selected>
                            {op}
                        </option>
                    ) : (
                        <option value={op}>{op}</option>
                    )
                )}
            </Fragment>
        )
    })
    .post(async (c) => {
        const { searchProvider }: { searchProvider: string } =
            await c.req.parseBody()
        await c.env.APP_NAMESPACE.put(
            `${APP_CONFIG_KEY_PREFIX}:default_search_provider`,
            searchProvider
        )
        return c.html('', 200)
    })

async function initDefaultSearchProvider(c: Context<{ Bindings: Bindings }>) {
    c.env.APP_NAMESPACE.put(
        `${APP_CONFIG_KEY_PREFIX}:default_search_provider`,
        options.find((op) => op === 'google')!
    )
}

export default router
