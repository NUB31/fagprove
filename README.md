# Assumes you have git and docker installed

# Install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# A terminal restart might be required
nvm install --lts

# Clone repository
git clone git@github.com:nub31/fagprove
cd fagprove

# Start development environment with docker
docker compose -f compose/dev.yml up -d

# Copy environment variables to .env file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
