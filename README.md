# flying-squrl

A helpful little bookmarking tool to help jump to exactly what you're looking for using configurable commands in your browser's address bar.

This project uses [pnpm](https://pnpm.io/installation).

## Install and run locally

```
pnpm i
pnpm run dev
```

When prompted, the default password is "flying-squrl". The username will be blank.

## Deploy to use across the web

This tool is meant to be deployed on Cloudflare Workers and operate entirely on the free tier (at the time of writing this). If you don't have an account, you can [sign up](https://dash.cloudflare.com/sign-up) for free with no payment method required.

Before deploying, you will have to create a KV namespace for `flying-squrl`. Once signed up or logged in, run:

```bash
pnpm exec wrangler kv:namespace create APP_NAMESPACE && pnpm exec wrangler kv:namespace create APP_NAMESPACE --preview
```

This will create a regular and preview KV namespace, respectively. The name of the namespace **must** be `APP_NAMESPACE`. Update the `wrangler.toml` file with the id values of your newly created namespaces.

```toml
kv_namespaces = [
  { binding = "APP_NAMESPACE", id = "<NEW NAMESPACE ID>", preview_id = "<NEW NAMESPACE PREVIEW ID>" }
]
```

Lastly before deploying, update `config.json` by setting a new value for `password`. This will be to (somewhat) protect your command settings in case you will be sharing this tool.

Now, run:

```
pnpm run deploy
```

Navigate to the new URL and start using!

## Contributing

For any bugs or enhancement request, please file an issue. Feedback, issues and pull requests are greatly appreciated!

## Note

This tool is a WIP. Please expect breaking changes and for things to look unpolished.

## License

MIT and follow whatever license(s) Cloudflare claims.
