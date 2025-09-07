**Authentication**
Authentication is the process of "verifying the idfentity of a user, system, or entity" to confirm that they are who they claim to be, typically using credentials such as password, token, fingerprint, or digital certificate.
=>
Authentication Patterns
1. Stateful Authentication (Server Based) : 
=> Which maintains state or data or server side.
=> Ther server *remembers the session* of each logged-in user
=> After a user logs in, the server creates *a session* and stores it in DB(For now) (usually in memory, Redis, or DB)
=> The server gives the client a *session ID* (via Cookie)
=> On each request, the client sends the session ID, and the server looks it up to check the user.

2. Stateless Authentication (Token-based, e.g., JWT)
=> Ther server *doesn't store* user session.
=> After login, the server issues *a signed token* (JWT = JSON Web Token)
=> The client stores this token (in a localStorage or cookie) and sends it with evry request.
=> The server only verifies the token's signature and decodes data (no session lookup)

There is a client that is requesting to be logged in. So the user gives username and password and in return server will give a unique ID that is known as session uid. So during this transaction the server has already kept acopy of the session. So we have UID for example  we say it is 367. then whenever we have to request on the server then i have to show this id for the sake of request.
Like Get / users | uid : 367 uid is also sent with the request. SO the server checks for 367 and then it decides to send respons.

UID can be tarnsfered as cookies, simple respons or headers. Do as you like.

We we talk about ssr, we use cookies and in rest apis we use headers.

Express flow:
Client ->Auth Middleware(Checks for cookie value or uid, if valid calls next() else rejects the request) -> Endpoint route.