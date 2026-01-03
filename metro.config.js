import { getDefaultConfig } from "expo/metro-config";
import { getSentryExpoConfig } from "@sentry/react-native/metro.js";

const config = getDefaultConfig(import.meta.dirname);
export default getSentryExpoConfig(config);
