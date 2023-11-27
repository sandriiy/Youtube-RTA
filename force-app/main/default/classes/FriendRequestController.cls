/**
 * The controller for processing and selecting data in relation to the LWC (UI) component.
 * To set a method as callable, it must be public, static, and annotated accordingly - @AuraEnabled.
 * 
 * The names of the parameters specified in the Apex methods must fully correspond to the parameters used by LWC (UI) components.
**/
public class FriendRequestController {
    @AuraEnabled(cacheable=true)
    public static List<User> getAllUsers() {
        return UserSelector.getAllActiveUsers();
    }

    @AuraEnabled
    public static void addNewFriendRequest(String userId) {
        FriendRequestService newRequest = new FriendRequestService(userId);
        newRequest.fireNewFriendRequestEvent();
    }
}