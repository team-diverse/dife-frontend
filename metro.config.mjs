import { getDefaultConfig } from "expo/metro-config.js";
import sentryMetro from "@sentry/react-native/metro.js";

const config = getDefaultConfig(import.meta.dirname);

export default sentryMetro(config);
