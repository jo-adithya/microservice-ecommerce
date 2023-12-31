import { FactoryProvider, ModuleMetadata } from "@nestjs/common";

export interface NatsStreamingModuleOptions {
  clusterId: string;
  clientId: string;
  url: string;
  onShutdown?: () => void;
}

export type NatsStreamingModuleAsyncOptions = Pick<ModuleMetadata, "imports"> &
  Pick<FactoryProvider<NatsStreamingModuleOptions>, "inject" | "useFactory">;
