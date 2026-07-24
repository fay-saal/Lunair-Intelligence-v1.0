FROM node:20-slim

# Install ffmpeg at the OS level just to be absolutely safe
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Vite frontend and TS files (just to ensure everything is compiled if needed)
RUN npm run build

# Hugging Face Spaces default port
EXPOSE 7860
ENV PORT=7860

# Start the server
CMD ["npm", "start"]
