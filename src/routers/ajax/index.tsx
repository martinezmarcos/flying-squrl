import { Hono } from 'hono'

import { APP_COMMANDS_KEY } from 'lib/constants'
import { addItem, getItemList, deleteItem } from 'lib/utils'
import { triggerEvent } from 'lib/middleware'

import CommandTable, {
    NewCommand,
    NewCommandEdit,
} from 'components/partials/command'

import configRouter from 'routers/ajax/config'

declare global {
    type CommandItem = { command: string; url: string }
}

const router = new Hono<{ Bindings: Bindings }>().basePath('/ajax')

router.route('/', configRouter)

router
    .get('/command', (c) => c.html(<NewCommandEdit />))
    .post(triggerEvent('tableUpdated'))
    .post(async (c) => {
        const { command, url }: CommandItem = await c.req.parseBody()
        await addItem(c, { command, url })
        return c.html(<NewCommand />)
    })

router.delete('/command/:encCommand', async (c) => {
    const encCommand = c.req.param('encCommand')
    await deleteItem(c, atob(encCommand))
    return c.html('', 200)
})

router.get('/command/cancel', (c) => c.html(<NewCommand />))

router.get('/commands', async (c) => {
    const commands = (await c.env.APP_NAMESPACE.get(APP_COMMANDS_KEY)) || ''
    const pairs = getItemList(commands)
    return c.html(<CommandTable pairs={pairs} />)
})

export default router
