# REAL-TIME APPLICATIONS | Pub/Sub, CometD, Salesforce Platform Events

https://www.youtube.com/watch?v=0fs_Dou3C2k

#### You can find a sample code representation for Java (publisher) and JavaScript (subscriber) at:
- java-app/main -> default -> java/org/ansukh/publisher  || Publisher
- java-app/main -> default -> javascript || Subscriber
- java-app/main -> pom.xml || Maven Dependencies
- java-app/main -> WEB-INF -> web.xml || Mapping

#### You can find a sample implementation for Salesforce ("Sending Friend Invitations") at:
- force-app/main/default -> classes || Publisher + Selector + Controller
- force-app/main/default -> lwc || UI Components
- force-app/main/default -> objects/FriendRequestEvent__e || Platform Event (Channel)
- force-app/main/default -> permissionsets || Access to all elements
