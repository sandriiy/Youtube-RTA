package org.ansukh.publisher;

import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.server.CometDServlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * CometDServlet initializes the CometD server and handles configuration setup.
 *
 * One of the main goals of this class is to handle the handshake process.
 * This class is responsible for determining whether your website, mobile app, etc. can be a subscriber.
 *
 * In general, if you can be a subscriber, you will have access to all the channels that are created here.
 * (if you know their names)
 */
@WebServlet("/cometd/userId")
public class CometDServer extends CometDServlet {

    @Override
    public void init() throws ServletException {
        super.init();

        /**
         * Obtaining an instance of the Bayeux server used for CometD functionality.
         * In case of absence - return an exception with an error, since CometD cannot fully function without initializing the Bayeux server.
         *
         * In our case, the initialization itself takes place in the listeners, the class name: BayeuxServerContextListener
         * All such listeners and servlet mappings should be specified in the web.xml file (under the WEB-INF folder).
         */

        BayeuxServer bayeux = getBayeuxContext();
        if (bayeux == null) {
            throw new ServletException("No BayeuxServer!");
        } else {
            // Create a channel from which subscribers will receive events
            bayeux.createChannelIfAbsent("/sharePrice");

            // There can be several such channels and each of them will be responsible for a different set of data/functionality.
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Extract the token from request
        String token = request.getParameter("token");

        // Custom validation code
    }

    private BayeuxServer getBayeuxContext() {
        return (BayeuxServer) getServletContext().getAttribute(BayeuxServer.ATTRIBUTE);
    }
}
