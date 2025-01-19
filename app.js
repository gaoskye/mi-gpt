import config from "./.migpt.js";
import { MiGPT } from "./dist/index.cjs";

async function main() {
  const client = MiGPT.create(config);

  const originAsk = client.ai.ask;
  client.ai.ask = async (msg) => {
    const {text} = msg;
    if (text.includes("穿什么") || text.includes("衣服")) {
      const url = "https://flask-65lu-134445-9-1334220256.sh.run.tcloudbase.com/api/clothes/advice/chat?uid=obmD16x-EKm9jrM5MwfEucLoOnQw&word=" + encodeURIComponent(text);
      const response = await fetch(url);
      const data = await response.json();
      console.log("response: ", data);
      const reply = data.data;
      return {text: reply};
    }
    return {text: "你可以问智能衣橱穿什么衣服"};
  };
  await client.start();
}

main();
