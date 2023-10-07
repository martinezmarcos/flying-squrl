import type { FC } from 'hono/jsx'
import Layout from 'components/layout'
import { NewCommand } from 'components/partials/command'

const Home: FC = () => (
    <Layout>
        <header class="mb-6 flex justify-end border-b-2 border-black px-4 py-2">
            <a href="/help">
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
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                </svg>
            </a>
        </header>
        <label
            hx-get="/ajax/config/default-search-engine"
            hx-trigger="load"
            hx-target="#default-search-engine-select"
        >
            <span class="block">default search engine:</span>
            <select
                id="default-search-engine-select"
                hx-post="/ajax/config/default-search-engine"
                hx-trigger="change"
                hx-swap="none"
                hx-include="this"
                name="searchProvider"
                class="box focus:border-red-400 focus:ring-red-400"
            ></select>
        </label>
        <div hx-get="/ajax/commands" hx-trigger="load" hx-swap="outerHTML" />
        <NewCommand />
    </Layout>
)

export default Home
