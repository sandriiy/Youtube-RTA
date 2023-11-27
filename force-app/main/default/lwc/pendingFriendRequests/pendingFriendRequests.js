import { LightningElement, track, api } from 'lwc';
import { subscribe } from 'lightning/empApi';

const DEFAULT_PENDING_STATUS_NAME = 'Pending';

export default class PendingFriendRequests extends LightningElement {
    @api channelName = '/event/FriendRequestEvent__e';

    @track pendingStatusName = DEFAULT_PENDING_STATUS_NAME;
    @track subscription;
    @track requests = [];

    /**
     * The connectedCallback() lifecycle hook that executes when this document is inserted into the page.
     * Defines the initial behavior of the component.
     * Reference: https://developer.salesforce.com/docs/platform/lwc/guide/create-lifecycle-hooks-dom.html
     */
    connectedCallback() {
        // Adding logic to display previously created requests is possible.

        /**
         * Subscribes to a given channel and returns a promise that holds a subscription object, which you use to unsubscribe later.
         * Reference: https://developer.salesforce.com/docs/component-library/bundle/lightning-emp-api/documentation
         */
        subscribe(this.channelName, -1, this.messageCallback).then(response => {
            console.log('Subscription request sent to:', JSON.stringify(response.channel));

            this.subscription = response;
        });
    }

    /**
     * A function that handles new events from the specified channel.
     * The name of the function is specified at the moment of the "handshake" with the Platform Event (line 25).
     */
    messageCallback = (response) => {
        console.log('New message received:', JSON.stringify(response.data));

        let userId = response.data.payload.UserId__c;
        let userName = response.data.payload.UserName__c;
        this.addNewFriendRequest(userId, userName);
    };

    addNewFriendRequest(userId, userName) {
        let mutualFriends = this.getMutualFriends();

        this.requests.push({
            id: userId,
            name: userName,
            common: mutualFriends
        });
    }

    /**
     * The definition mutual friends with this new request.
     * @returns String - A randomly generated number in the range: (0 - 20) + additional descriptive text.
     */
    getMutualFriends() {
        return (Math.floor(Math.random() * 20) + ' mutual friend(s)');
    }

    /**
     * The definition whether there is data to display.
     * It is used as a display indicator of the corresponding <div> sections (see component markup).
     */
    get isDataToDisplay() {
        return (this.requests != undefined && this.requests.length > 0);
    }
}