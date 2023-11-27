/**
 * Service for processing new friend requests.
 * To create a service instance, you must pass a unique identifier of the new user.
 * 
 * The service processes requests according to the "one to all" algorithm, 
 * the specified user will be available in the list to be added to all users.
**/
public class FriendRequestService {
    private User userRecord;

    public FriendRequestService(String userId) {
        this.processAssociatedUser(userId);
    }

    public void fireNewFriendRequestEvent() {
        /**
         * An instance of a platform event. For example, an instance of MyEvent__e. 
         * You must first define your platform event object in your org.
         */
        FriendRequestEvent__e friendRequestEvent = new FriendRequestEvent__e();
        friendRequestEvent.UserId__c = this.userRecord.Id;
        friendRequestEvent.UserName__c = this.userRecord.Name;

        /**
         * Publishes the given platform event.
         * 
         * The result of publishing the event is Database.SaveResult, which contains information about 
         * whether the operation was successful and about the errors that were detected.
         */
        Database.SaveResult[] results = EventBus.publish(friendRequestEvent);

        // Additional functionality can be added so that all requests are saved and can be modified as needed.
    }

    private void processAssociatedUser(Id userId) {
        this.userRecord = UserSelector.getUserRecordById(userId);
    }
}