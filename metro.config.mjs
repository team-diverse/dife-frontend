import { getSentryExpoConfig } from "@sentry/react-native/metro.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getSentryExpoConfig(__dirname);

export default config;
