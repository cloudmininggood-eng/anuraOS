import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import mime from "mime";

import express from "express";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

mime.define({ "application/javascript": ["cjs", "mjs"] });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Debug a local app folder and mount it to /apps, patching config.json to force load it
const debugAppFolder = process.env.DEBUG_APP_FOLDER;

console.log(
	"For this run, app debugging will be " +
		(debugAppFolder ? "enabled" : "disabled"),
);

const app = express();
const port = process.env.PORT || 8000;

app.use((req, res, next) => {
	// cors
	res.header("Cross-Origin-Embedder-Policy", "require-corp");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Cross-Origin-Opener-Policy", "same-origin");
	res.header("Cross-Origin-Resource-Policy", "same-site");
	next();
});

if (debugAppFolder) {
	app.use((req, res, next) => {
		if (req.path === "/config.json") {
			const configPath = path.join(__dirname, "public", "config.json");
			fs.readFile(configPath, "utf8", (err, data) => {
				if (err) {
					console.error(err);
					return next(err);
				}

				const config = JSON.parse(data);
				config.apps.push("/apps/anura-devserver-debug");

				console.log("Serving patched config.json with debug app folder");
				res.json(config);
			});
		} else {
			next();
		}
	});

	app.use(
		"/apps/anura-devserver-debug",
		express.static(path.resolve(debugAppFolder)),
	);
}

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../build")));
app.use("/bin", express.static(path.join(__dirname, "../bin")));
app.use("/apps", express.static(path.join(__dirname, "../apps")));
app.use(express.static(path.join(__dirname, "../aboutproxy/static")));

const server = app.listen(port, () => console.log("Listening on port: ", port));

server.on("upgrade", (request, socket, head) => {
	wisp.routeRequest(request, socket, head);
});
