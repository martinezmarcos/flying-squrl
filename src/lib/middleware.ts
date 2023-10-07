import { Context, Next } from 'hono'

export function triggerEvent(event: string) {
    return async function (c: Context<{ Bindings: Bindings }>, next: Next) {
        await next()
        c.header('HX-Trigger', event)
    }
}
