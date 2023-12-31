import { Stan, connect } from "node-nats-streaming";

import { Module } from "@nestjs/common";

import { NATS_STREAMING_MODULE_OPTIONS, getNatsClientToken } from "./nats-streaming.constants";
import {
  NatsStreamingModuleAsyncOptions,
  NatsStreamingModuleOptions,
} from "./nats-streaming.module-definition";

@Module({})
export class NatsStreamingModule {
  static forRoot(natsStreamingModuleOptions: NatsStreamingModuleOptions) {
    const { clusterId, clientId, url, onShutdown } = natsStreamingModuleOptions;

    const clientProvider = {
      provide: getNatsClientToken(),
      useValue: this.createNatsStreamingClient(clusterId, clientId, url, onShutdown),
    };

    return {
      global: true,
      module: NatsStreamingModule,
      providers: [clientProvider],
      exports: [clientProvider],
    };
  }

  static forRootAsync(options: NatsStreamingModuleAsyncOptions) {
    const asyncOptionsProvider = {
      provide: NATS_STREAMING_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    const clientProvider = {
      provide: getNatsClientToken(),
      useFactory: (natsStreamingModuleOptions: NatsStreamingModuleOptions): Stan => {
        const { clusterId, clientId, url, onShutdown } = natsStreamingModuleOptions;
        return this.createNatsStreamingClient(clusterId, clientId, url, onShutdown);
      },
      inject: [NATS_STREAMING_MODULE_OPTIONS],
    };

    return {
      global: true,
      module: NatsStreamingModule,
      providers: [asyncOptionsProvider, clientProvider],
      imports: options.imports,
      exports: [clientProvider],
    };
  }

  private static createNatsStreamingClient(
    clusterId: string,
    clientId: string,
    url: string,
    onShutdown?: () => void,
  ): Stan {
    const client = connect(clusterId, clientId, { url });

    client.on("connect", () => {
      console.log("Connected to NATS");
    });
    client.on("error", (err) => {
      console.error(err);
      throw err;
    });

    client.on("close", () => {
      onShutdown?.();
    });
    process.on("SIGINT", () => client.close());
    process.on("SIGTERM", () => client.close());

    return client;
  }
}
