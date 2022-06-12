import ably from "ably";

const ablyClient = new ably.Realtime(process.env.REACT_APP_ABLY_API_KEY);
const orderQueueChannel = ablyClient.channels.get("order:queue");

const ablyChannels = {
    orderQueueChannel,
};

export default ablyChannels;
