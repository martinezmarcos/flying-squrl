import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { serveStatic } from 'hono/cloudflare-workers'
import routers from 'routers'

import Home from 'components/home'
import Help from 'components/help'

import config from '../config.json'

declare global {
    type Bindings = {
        APP_NAMESPACE: KVNamespace
    }
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/static/*', serveStatic({ root: './' }))

app.use('/', basicAuth({ username: '', password: config.password }))

for (const router of routers) {
    app.route('/', router)
}

app.get('/', (c) => c.html(<Home />))

app.get('/help', (c) => c.html(<Help />))

app.get('/robots.txt', (c) => {
    return c.text('Agent: *\nDisallow: /')
})

export default app
