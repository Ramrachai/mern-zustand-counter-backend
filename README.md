# About the app:
This is the backend of a fullstack counter app. When we click on the increase/decrease button it will send the count value and operation to node server. Server saves the data in database. After successfully saving in database, node server returns the value to the next.js client side. As soon as the client sire receives response, Zustand instantly updates the global state of count. When global state is updated then all the different components re-renders to display the Final count value. 

## Technology used: 
- Client side ui: Next.js, 
- Server: Express.js, 
- Database: Mongodb, 
- State Management: Zustand

Screenshot: 
![image](https://github.com/Ramrachai/mern-zustand-counter-backend/assets/47687976/5d9962ed-590d-46d9-94ce-87eeda29b57f)
