import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({
    required: true,
    enum: ['farmer', 'storage_manager', 'distributor'],
    default: 'farmer',
  })
  role: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    unique: true,
    required: true,
  })
  mail: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    type: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
  })
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };

  @Prop()
  isVerified: boolean;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
