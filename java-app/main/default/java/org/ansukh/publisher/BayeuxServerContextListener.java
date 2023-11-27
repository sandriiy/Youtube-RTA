package org.ansukh.publisher;

import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.server.BayeuxServerImpl;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class BayeuxServerContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent event) {
        /**
         * BayeuxServer initialization and set as a context attribute.
         *
         * The BayeuxServer class provides an API for managing channels, subscribing and unsubscribing clients, and publishing messages to specific channels.
         * It acts as a central coordinator for handling messages in CometD applications.
         */

        BayeuxServer bayeux = new BayeuxServerImpl();
        event.getServletContext().setAttribute(BayeuxServer.ATTRIBUTE, bayeux);
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        // Clean up resources if needed
    }
}
