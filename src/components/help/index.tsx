import type { FC } from 'hono/jsx'
import Layout from 'components/layout'

const Help: FC = () => (
    <Layout>
        <header class="mb-6 flex justify-end border-b-2 border-black px-4 py-2">
            <a href="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-8 w-8"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                </svg>
            </a>
        </header>
        <div class="flex gap-4">
            <h3 class="text-lg">
                search URL: <span id="help-hostname" class="font-mono" />
            </h3>

            <button id="help-searchUrl-copy" aria-label="Copy search URL">
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
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                    />
                </svg>
            </button>
        </div>

        <section class="box my-4 p-6">
            <h2 class="my-8 text-2xl">getting started</h2>
            <h3 class="my-4 text-lg font-medium">chrome</h3>

            <p class="mb-2">
                copy the URL above, then go to "Settings" {'>'} "Search engine"{' '}
                {'>'} "Manage search engines and site search"
            </p>

            <p class="mb-2">under "Site search", click on "add"</p>
            <p class="mb-2">
                for "Search engine" input "flying-squrl", for "Shortcut" enter
                "f" and for "URL" paste the copied search URL, then click "add"
            </p>
            <p class="mb-2">
                <span class="italic">optional:</span> set as default search
                engine by clicking "More options" (the three dots) on the new
                entry, then by clicking "Make default"
            </p>

            <h3 class="my-4 text-lg font-medium">other browsers</h3>
            <p class="mb-2">instructions coming soon</p>
        </section>

        <section class="box my-4 p-6">
            <h2 class="my-8 text-2xl">usage</h2>

            <h3 class="my-4 text-lg font-medium">default search provider</h3>
            <p class="mb-2">
                select a default search provider from the menu (more search
                providers may be added on request)
            </p>
            <h3 class="my-4 text-lg font-medium">adding a basic command</h3>

            <p class="mb-2">click on the plus icon next to "add command"</p>
            <p class="mb-2">
                enter a value for "command". it can be anything you want, just
                no spaces (yet)
            </p>

            <p class="mb-2">enter a valid URL for "url"</p>
            <p class="mb-2">
                click the check icon to confirm, or cancel with the "x" icon
            </p>
            <p class="mb-2">
                start using the new command by typing it in the browser's
                address bar
            </p>
            <h3 class="my-4 text-lg font-medium">adding a query command</h3>

            <p class="mb-2">
                same as above, but instead for "url" replace the part of the URL
                you want to substitue with a query with{' '}
                <span class="font-bold">%s</span>
            </p>

            <p class="mb-2">
                now when using the query command, everything the command and a
                space will be used as the query for the substitution
            </p>
            <p class="mb-2 pl-4">
                for example, say you have a command{' '}
                <span class="font-bold">gh</span>, then enter
                "https://github.com/%s" for the value of "url"
            </p>
            <p class="mb-2 pl-4">
                now you can use the command <span class="font-bold">gh</span> to
                navigate to github profiles and repos, e.g. typing "gh
                psf/black" will take you to the repo for black, the Python
                formatter
            </p>
        </section>
    </Layout>
)

export default Help
