import { ChannelDispatcher } from '../dispatcher/channel-dispatcher.service';
import { ChatSender } from './chat-sender.service';
export declare class ChatModule {
    private readonly dispatcher;
    private readonly sender;
    constructor(dispatcher: ChannelDispatcher, sender: ChatSender);
}
