import { LightningElement, track, wire } from 'lwc';

/**
 * Importing the corresponding Apex methods (which are marked with the @AuraEnabled annotation).
 * They act as "endpoints" to receive and/or process data. Instead of URLs specified with a unique name.
 */
import getAllUsers from '@salesforce/apex/FriendRequestController.getAllUsers';
import addNewFriendRequest from '@salesforce/apex/FriendRequestController.addNewFriendRequest';

const DEFAULT_PICKLIST_VALUE = 'None';

export default class NewFriendRequest extends LightningElement {
    @track selectedUser = DEFAULT_PICKLIST_VALUE;
    @track users = [];
    @track isLoading = false; // Indicator for displaying the markup element (see HTML)

    /**
     * The wire service provisions reactive/immutable data retrieval.
     * Data acquisition reacts to changes in parameters, which allows providing up-to-date data without additional processing.
     * Reference: https://developer.salesforce.com/docs/platform/lwc/guide/data-wire-service-about.html
     */
    @wire(getAllUsers)
    wiredUsers({ error, data }) {
        if (data) {
            this.buildComboboxDataRepresentation(data);
        } else if (error) {
            // Retrieving users error handling is required.
        }
    };

    /**
     * Conversion of the received data into a correct representation.
     * Representing possible options for a picklist/combobox requires a specific format, different from a normal data list.
     * Reference: https://developer.salesforce.com/docs/component-library/bundle/lightning-combobox/example
     */
    buildComboboxDataRepresentation(data) {
        let comboboxData = data.map(record => {
            return {
                label: record.Name, 
                value: record.Id
            };
        });

        this.users = comboboxData;
    }

    /**
     * Processing and storage of the new/changed picklist (combobox) value.
     * The definition of the event and function reference are specified in the markup (see HTML).
     */
    handleChangeUser(event) {
        let newUser = event.detail.value;
        this.selectedUser = newUser;
    }

    /**
     * Processing and calling the publish method of a new event.
     * The definition of the event and function reference are specified in the markup (see HTML).
     * 
     * The imperatively method is used to call the Apex method.
     * Reference: https://developer.salesforce.com/docs/platform/lwc/guide/apex-call-imperative.html
     */
    handleNewFriendRequest(event) {
        // The event will be published only if the value of picklist is not equal to the default.
        if (this.selectedUser !== DEFAULT_PICKLIST_VALUE) {
            this.isLoading = true;
            
            addNewFriendRequest({userId: this.selectedUser})
                .then(result => {
                    this.selectedUser = DEFAULT_PICKLIST_VALUE;
                    this.isLoading = false;
                }).catch(error => {
                    // Publishing new request error handling is required.
                });
        }
    }
}