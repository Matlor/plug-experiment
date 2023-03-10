import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from "fs";

const isDev = process.env["DFX_NETWORK"] !== "ic";

let canisterIds;

try {
	canisterIds = JSON.parse(
		fs
			.readFileSync(
				isDev ? ".dfx/local/canister_ids.json" : "./canister_ids.json"
			)
			.toString()
	);
} catch (e) {
	throw new Error(JSON.stringify(e));
}

if (!isDev) {
	canisterIds.ledger = { ic: "ryjl3-tyaaa-aaaaa-aaaba-cai" };
}

const canisterDefinitions = Object.entries(canisterIds).reduce(
	(acc, [key, val]) => {
		// Examples:
		// key === invoice
		// val === {"local":"ryjl3-tyaaa-aaaaa-aaaba-cai"}
		// val.local === ryjl3-tyaaa-aaaaa-aaaba-cai
		// val.ic === ryjl3-tyaaa-aaaaa-aaaba-cai
		return {
			...acc,
			[`process.env.${key.toUpperCase()}_CANISTER_ID`]: isDev
				? JSON.stringify(val.local)
				: JSON.stringify(val.ic),
		};
	},
	{}
);

// throw new Error(JSON.stringify(canisterDefinitions));

const DFX_PORT = 8000;

const config = defineConfig({
	define: {
		// Here we can define global constants
		// This is required for now because the code generated by dfx relies on process.env being set
		...canisterDefinitions,
		"process.env.NODE_ENV": JSON.stringify(
			isDev ? "development" : "production"
		),
	},

	optimizeDeps: {
		exclude: [],
	},
	plugins: [react()],
	root: "",

	resolve: {
		alias: {},
	},

	server: {
		fs: {
			// allow: ["."],
		},

		proxy: {
			"/api": {
				target: `http://localhost:${DFX_PORT}`,
				changeOrigin: true,
				secure: false,
				//rewrite: (path) => path.replace(/^\/api/, "/api"),
			},
		},
	},

	// add build version
});

export default config;
// https://vitejs.dev/config/
