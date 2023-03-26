import {WebSocketLink} from "@apollo/client/link/ws";
import {getItem} from "../asyncStorage";

const ENV = {
  prod: {
    wss: 'wss://api.knmau.auditorium.com.ua/',
    https: 'https://api.knmau.auditorium.com.ua/',
  },
  stg: {
    wss: 'wss://staging.api.knmau.auditorium.com.ua/',
    https: 'https://staging.api.knmau.auditorium.com.ua/',
  },
  local: {
    wss: 'ws://192.168.31.217:8080/',
    https: 'http://192.168.31.217:8080/',
  }
}

const CURRENT_ENV = ENV.stg;

const wsLink: any = new WebSocketLink({
    uri: CURRENT_ENV.wss,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: async () => {
        const token = await getItem('token');
        return {
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    }
  }
);

const subscriptionMiddleware = {
  applyMiddleware: async (options: any, next: any) => {
    const token = await getItem('token');
    options.authorization = token ? `Bearer ${token}` : ""
    next();
  },
}

wsLink.subscriptionClient.use([subscriptionMiddleware]);

export default wsLink;
