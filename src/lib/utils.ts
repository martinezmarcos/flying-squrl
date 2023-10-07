import { Context } from 'hono'
import { APP_COMMANDS_KEY } from 'lib/constants'

export async function addItem(
    c: Context<{ Bindings: Bindings }>,
    item: CommandItem
) {
    const commands = (await c.env.APP_NAMESPACE.get(APP_COMMANDS_KEY)) || ''
    const commandsUpdated = commands.concat(`${JSON.stringify({ ...item })}\n`)
    await c.env.APP_NAMESPACE.put(APP_COMMANDS_KEY, commandsUpdated)
}

export async function deleteItem(
    c: Context<{ Bindings: Bindings }>,
    command: string
) {
    const commands = (await c.env.APP_NAMESPACE.get(APP_COMMANDS_KEY)) || ''
    const commandsUpdated = findAndRemove(commands, command)
    await c.env.APP_NAMESPACE.put(APP_COMMANDS_KEY, commandsUpdated)
}

export function getItemList(commands: string): CommandItem[] {
    if (commands === '') return []
    return commands
        .split('\n')
        .filter(Boolean)
        .map((line) => JSON.parse(line))
        .sort((a, b) => {
            switch (
                (a.command as string).toUpperCase() <
                (b.command as string).toUpperCase()
            ) {
                case true:
                    return -1
                case false:
                    return 1
            }
        })
}

export function findAndRemove(
    commands: string,
    commandToRemove: string
): string {
    return commands
        .split('\n')
        .filter((s) => s !== '')
        .map((line) => JSON.parse(line))
        .reduce((acc: string, curr: { command: string; url: string }) => {
            if (curr.command === commandToRemove) return acc
            return acc.concat(`${JSON.stringify(curr)}\n`)
        }, '')
}
