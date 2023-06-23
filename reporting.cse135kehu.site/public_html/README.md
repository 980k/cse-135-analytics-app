# CSE135 HW4

## Main Site URL
* https://cse135kehu.site/

## Team Members
* Kevin Hu

## Server IP
* cse135kehu.site
* IP: 167.71.18.250

## Server Login
* User: grader
* Pswd: cse135grader

## Site Login
* User: kevin
* Pswd: cse135user

## Reporting Site URL
* https://reporting.cse135kehu.site/login.html

## Notes
* The CRUD grid has bugs preventing the create functionality from working.
* The Admin field must be edited first in order for the rest of the methods (read, update, delete) to work.

## Login Info
### Basic Level
* Username: basic_user
* Email: basic@kehu.site
* Password: isAdmin0
### Admin Level
* Username: admin_user
* Email: admin@kehu.site
* Password: isAdmin1

## Authentication
In order to handle authentication in my application, I implemented JWT as the middleware. The generated JWT token is used for handling user permissions and verifying user identity. Upon login, a token is generated and stored on the client-side session storage. This token carries the necessary information to determine the user's access level, distinguishing between basic users and admin users. Admin users are granted full access to all webpages, while basic users have restricted access to a subset of those webpages. To enhance security, the JWT token includes an expiration time to limit its lifespan. This ensures that tokens become invalid after a certain period, reducing the risk if a token is compromised. By using JWT, I opted for a simple and effective authentication mechanism that aligns with my stateless API architecture. Storing the token on the client-side reduces the need for server-side session management and server-side state. The token is validated on the server side, and the claims within it are used to make authorization decisions for the requested resources. Additionally, the active token eliminates the need for users to sign in repeatedly within the same browser tab. As long as the token remains valid and stored on the client-side, users will be automatically redirected to the appropriate pages based on their access level. I chose JWT authentication over Passport authentication because I did not require session management and server-side state for my application. This decision helped minimize the need to store additional data in the database and limited the authentication information to the user's client.

## Dashboard
I presented the request start and response end time metric as one of my charts because I wanted the user to see how much latency they were experiencing and to measure their experience with the website's performance. I wanted the user to be able to see the differences from the start of their request to the end of response. I chose to use a bar chart for the request and response time metric because I am comparing the magnitudes of these two times. The x-axis represents the request and response time for each user, with 2 bars per user. The y-axis represents the time in milliseconds. Lastly, I chose two complementary colors, blue and orange, to improve visual clarity. The other metric I presented was the window dimension for all users because I wanted to see how users are percieving the UI elements. Being able to understand how users are visualizing the various components, I can better design UI elements to fit the screens of my users. I choose to use a scatterplot with the x-axis as the screen width and the y-axis as the screen height. This is an appropriate chart to use because I am plotting two values against each other to understand the overall window dimensions.

## Report
The metric I decided to generate a more detailed report on is the request and response times of users. This is a useful metric because I can see how users are experiencing the site in terms of latency, performance, and responsiveness. Optimizations can be made if it is evident that many users are experiencing sub-par performance. I choose to add a box plot with individual boxes for the request start time, response end time, and overall response time. This gives information regarding the range of these values, median, and outliers. Having this information provides an holistic overview of these metrics. Additionally, I included a grid that shows all unique users and their measured request and response times. This presents a quantitative representation of the charts I presented.