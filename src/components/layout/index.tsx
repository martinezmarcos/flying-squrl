import type { FC } from 'hono/jsx'

const Layout: FC = (props) => (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <link href="/static/assets/css/styles.css" rel="stylesheet" />
            <script defer src="/static/assets/js/main.js" />
            <script
                src="https://unpkg.com/htmx.org@1.9.5"
                integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO"
                crossorigin="anonymous"
            ></script>
        </head>
        <body>
            <div class="mx-auto max-w-2xl p-8">{props.children}</div>
        </body>
    </html>
)

export default Layout
