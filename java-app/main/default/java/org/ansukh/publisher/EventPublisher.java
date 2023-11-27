package org.ansukh.publisher;

import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.ServerMessage;

public class EventPublisher {
    private BayeuxServer bayeuxServer;

    public void publishEvent(String channel, String message) {
        ServerMessage.Mutable mutable = bayeuxServer.newMessage();
        mutable.setChannel(channel);
        mutable.setData(message);

        bayeuxServer.getChannel(channel).publish(null, mutable);
    }
}
