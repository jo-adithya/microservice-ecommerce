import { Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule as _MongooseModule } from "@nestjs/mongoose";

import { mongoConfig } from "@nx-micro-ecomm/server/config";

@Module({
  imports: [_MongooseModule.forRootAsync(mongoConfig.asProvider())],
  providers: [],
  exports: [],
})
export class MongooseModule {
  static forFeature(models?: ModelDefinition[] | undefined, connectionName?: string | undefined) {
    return _MongooseModule.forFeature(models, connectionName);
  }
}
