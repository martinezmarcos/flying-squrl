import type { FC } from 'hono/jsx'
import { html, raw } from 'hono/html'
import { HtmlEscapedString } from 'hono/utils/html'

type CommandURLPair = { command: string; url: string }

const CommandTable: FC<{ pairs: CommandURLPair[] }> = ({ pairs }) => (
    <div
        id="command-table"
        class="box mb-6 mt-8 py-4"
        hx-get="/ajax/commands"
        hx-trigger="tableUpdated from:body"
        hx-swap="outerHTML"
    >
        <table class="w-full table-fixed bg-white text-sm">
            <thead class="">
                <tr>
                    <th class="w-24"></th>
                    <th class="whitespace-nowrap px-4 py-2 text-lg font-normal text-gray-900">
                        available commands
                    </th>
                    <th class="w-16"></th>
                </tr>
            </thead>
            <tbody
                id="command-table-body"
                class="divide-y divide-black"
                hx-target="closest tr"
                hx-swap="outerHTML"
            >
                {pairs.map((pair) => (
                    <CommandRow pair={pair} />
                ))}
            </tbody>
        </table>
    </div>
)

export const CommandRow: FC<{ pair: CommandURLPair }> = ({ pair }) => {
    const command = pair.url.includes('%s')
        ? transformCommand(pair.command)
        : pair.command
    return (
        <tr>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {command}
            </td>
            <td class="overflow-x-auto whitespace-nowrap px-4 py-2 text-gray-700">
                {transformURL(pair.url)}
            </td>
            <td class="py2 px-4">
                <button
                    hx-confirm={`Are you sure you want to delete command "${pair.command}"?`}
                    hx-delete={`/ajax/command/${btoa(pair.command)}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6 hover:text-red-400"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export const NewCommand: FC = () => (
    <div
        hx-target="this"
        hx-swap="outerHTML transition:true"
        class="slide-it box flex h-16 items-center justify-center gap-2"
    >
        add command
        <button hx-get="/ajax/command">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-8 w-8 hover:text-red-400"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        </button>
    </div>
)

export const NewCommandEdit: FC = () => (
    <div
        hx-target="this"
        hx-swap="outerHTML transition:true"
        class="slide-it box flex flex-col items-center justify-center gap-2 p-4"
    >
        <div class="w-full">
            <form class="flex gap-1" hx-post="/ajax/command">
                <label class="w-24 flex-initial">
                    <span class="block">command:</span>
                    <input
                        class="w-full border-2 border-black focus:border-red-400 focus:ring-red-400"
                        type="text"
                        name="command"
                        required
                    />
                </label>
                <label class="grow">
                    <span class="block">url:</span>
                    <input
                        class="w-full border-2 border-black focus:border-red-400 focus:ring-red-400"
                        type="text"
                        name="url"
                        maxlength="1000"
                        required
                    />
                </label>
                <input type="submit" id="submit-new-command" class="hidden" />
            </form>
        </div>
        <div class="col-span-1 mx-auto flex w-24 justify-center gap-2">
            <label for="submit-new-command">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-8 w-8 hover:text-red-400"
                    aria-label="Confirm"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </label>
            <button hx-get="/ajax/command/cancel">
                <svg
                    aria-label="Cancel"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-8 w-8 hover:text-red-400"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
        </div>
    </div>
)

export const SearchTermPlaceHolder = () =>
    html`<span class="font-semibold text-red-400">{...}</span>`

function transformCommand(command: string): HtmlEscapedString {
    return raw(html`${command} ${(<SearchTermPlaceHolder />)}`)
}

function transformURL(url: string): HtmlEscapedString {
    return raw(url.replace('%s', <SearchTermPlaceHolder />))
}

export default CommandTable
