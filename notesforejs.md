In the short url hs not any UI.

SSR means wee can render the whole html page.

like 
app.get("/test", (req,res) => {
    return res.end("<h1>He from server</h1>");
}

When we do a get reuwest for this we can find the Hello from server on the webpage. But this is not enough as we will nedd to render css scripts fro evryu route. So this method is not good.

We need to make html file.
So 1 solution is to create whole html file and paste it as it is at the place wher the hey from server is written.

But this is not possible.

And for solving this blunder we have some engines that work for us that are knowns as templatioing enginem like EJS, pug.js,handlebars.

These will work for server side rendering.

First of all we installed ejs.
And then we told our express that we need to use ejs view engine by doing : app.set("view engine", "ejs");
Also we could have used pug and handlebars but we used ejs.
 and the we decided to tell it also that all my views are kept at ./views that is :
 
app.set("views", path.resolve("./views"))

Okay then
If any request comes on the /test then save all urls in a variable and return the home view we made that is:

app.get("/test", async (req,res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    });
})
also we can pass data in the res.render()