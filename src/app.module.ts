import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entitie';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes()
    }),
    ConfigModule.forRoot({
      envFilePath: '../docker.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'products',
      entities: [Product],
      autoLoadEntities: true,
      synchronize: true,
    }),

  ],
})
export class AppModule { }
