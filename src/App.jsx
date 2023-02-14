import { Provider, WalletConnectRPC } from "@psychedelic/plug-inpage-provider";
import { useState } from "react";
import { isMobile } from "@walletconnect/browser-utils";

//const host = window.location.origin;
//const host = "https://mainnet.dfinity.network";
const host = "https://sy2uo-aqaaa-aaaak-aea5q-cai.ic0.app";

const whitelist = ["s73s2-niaaa-aaaak-aea5a-cai"];
const timeout = 10000;

const test = async (setPrin) => {
	if (!window.ic?.plug) {
		console.log(isMobile(), "is mobile");
		if (!isMobile()) {
			window.open("https://plugwallet.ooo/", "_blank");
			return;
		}

		const debug = true;

		const clientRPC = new WalletConnectRPC({ window, debug });
		const plugProvider = new Provider(clientRPC);

		const ic = window.ic;
		window.ic = {
			...ic,
			plug: plugProvider,
		};
	}

	const onConnectionUpdate = () => {
		console.log(window.ic.plug.sessionManager.sessionData);
	};

	// @ts-ignore
	const connected = await window?.ic?.plug?.requestConnect({
		whitelist,
		host,
		timeout,
		onConnectionUpdate,
	});

	console.log(await window.ic.plug.isConnected());

	setPrin(window?.ic?.plug.principalId);
};

const App = () => {
	const [prin, setPrin] = useState("not connected");

	const handler = async () => {
		const debug = false;

		const clientRPC = new WalletConnectRPC({ window, debug });
		const plugProvider = new Provider(clientRPC);

		const ic = window.ic;
		window.ic = {
			...ic,
			plug: plugProvider,
		};

		console.log(plugProvider, "plugProvider");

		//window?.ic?.plug?.requestConnect();
		console.log(navigator.userAgent.toLowerCase());

		const ua = navigator.userAgent.toLowerCase();
		const isAndroid = ua.indexOf("android") > -1;
		const isApple = ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1;
		console.log(isApple);

		const isMobile = true;
		//isAndroid || isApple;

		console.log(window.ic.plug, "window.ic.plug");

		if (isMobile) {
			console.log("is mobile");
			console.log(
				await plugProvider.requestConnect(host, whitelist)
				/* plugProvider.exposeProviderWithWalletConnect({ window, debug: true }),
				"exposeProviderWithWalletConnect" */
			);
		}

		const plug = window.ic?.plug;
	};

	return (
		<div>
			{prin}
			<br />
			<button onClick={() => test(setPrin)}>click</button>
			<button onClick={handler}>raw requestConnect</button>
		</div>
	);
};

export default App;
