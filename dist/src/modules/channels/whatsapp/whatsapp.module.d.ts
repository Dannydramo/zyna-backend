import { ChannelDispatcher } from '../dispatcher/channel-dispatcher.service';
import { WhatsAppSender } from './whatsapp-sender.service';
export declare class WhatsAppModule {
    private readonly dispatcher;
    private readonly sender;
    constructor(dispatcher: ChannelDispatcher, sender: WhatsAppSender);
}
