import { ChannelDispatcher } from '../dispatcher/channel-dispatcher.service';
import { EmailSender } from './email-sender.service';
export declare class EmailModule {
    private readonly dispatcher;
    private readonly sender;
    constructor(dispatcher: ChannelDispatcher, sender: EmailSender);
}
