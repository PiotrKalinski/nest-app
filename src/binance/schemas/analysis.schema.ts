import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type MarketDataDocument = MarketData & Document;

@Schema()
export class MarketData {

    @Prop({ required : true})
    symbol: string;

    @Prop({ required: true})
    timestamp: Date

    @Prop({ required: true})
    close: number

    @Prop({ required: true})
    open: number

    @Prop({ required: false})
    interval: string

}

export const MarketDataSchema = SchemaFactory.createForClass(MarketData)