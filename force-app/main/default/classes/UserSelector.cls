/**
 * According to best practices, when receiving information, you should make sure that the current user has access to this data. 
 * Apex code runs in system mode by default which means current logged in user's permissions, and field-level security are not respected during execution.
 * Reference: https://docs.pmd-code.org/latest/pmd_rules_apex_security.html#apexcrudviolation
 */
public with sharing class UserSelector {

    /**
     * Obtaining a user record by a unique identifier.
     */
    public static User getUserRecordById(Id userId) {
        return [
            SELECT Id, Name, IsActive
            FROM User
            WHERE Id =: userId
        ];
    }

    /**
     * Obtaining all active users.
     * Please note that there is a set limit for returning data.
     */
    public static List<User> getAllActiveUsers() {
        return [
            SELECT Id, Name
            FROM User
            WHERE IsActive = true
            LIMIT 100
        ];
    }
}