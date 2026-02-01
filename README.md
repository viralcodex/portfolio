# My Portfolio

A fun, interactive portfolio that can also be accessed via curl command!
Inspired to build one by ysap.sh (Dave Eddy)! Yes I Suck At Programming XD.

## Setup

```bash
# Install dependencies
bun install

# Start the server
bun start

# Or for development with auto-reload
bun run dev
```

## Usage

Once the server is running:

```bash
# Main page
curl http://localhost:3000

# View projects
curl http://localhost:3000/projects

# Get JSON data
curl http://localhost:3000/json

# See help
curl http://localhost:3000/help
```

## Customization

Edit the `data` object in `server.js` to add your own:

- Name and tagline
- Contact information
- Skills
- Projects
- About section

You can also customize the ASCII banner by modifying the `banner` variable.

## Deployment

Deploy to any Bun or Node.js hosting platform:

- Vercel (supports Bun)
- Railway (supports Bun)
- Render
- DigitalOcean App Platform
- AWS/GCP
- Fly.io (supports Bun)

Make sure to set the `PORT` environment variable if required by your platform.

## ASCII Art Tools

- [patorjk.com/software/taag](https://patorjk.com/software/taag/) - ASCII text generator
- [asciiart.eu](https://www.asciiart.eu/) - ASCII art collection

## License

MIT
