# The Capsaicin Station - deployed link [here](https://capsaicin-station.netlify.app/)

#### Solo project - MEN stack app, made within a week. Users can add imformation about chillies and view other users' added information about chillies. Chillies have full CRUD functionality.

### Technologies used

#### Front end:
- EJS
- CSS
- JavaScript
- Node.js

#### Back end:
- JavaScript
- Express
- Mongoose
- MongoDB
- dotenv
- bcrypt

![Homepage, signed in as user admin.](/readme-images/homepage.png "Homepage")
![Jalapeno page, created by user admin.](/readme-images/jalapeno.png "Jalapeno page")

---

### Brief

- Use EJS templates for rendering views to users.
- The app uses session-based authentication.
- Keep file structure appropriately organised.
- The app must have a "User" model, as well as at least one more data entity with a relationship to the "User" model.
- Full CRUD functionality.
- Guest users must not be able to create, update or delete data.
- App is deployed online.

---

### Code installation

Run `npm i` to install dependencies.

Go to [MongoDB](https://cloud.mongodb.com/) and create a database.

Create a `.env` file and add the following variables:

```
MONGODB_URI=
SESSION_SECRET=
PORT=
```
Then, to run the app, type the command `node server.js`.

---
---
---
---

### So, what *is* this app?

My app is called The Capsaicin Station. It's essentially a cross between a user forum and a database for chillies. Users can sign up/sign in and add, edit or delete their own data entries for chillies of their choice. Users can also view other users' chilli pages.

The idea for the app came about from my interest in spicy food, and by extension, chillies! I like to read up on chillies because they've always been interesting plants to me, in the sense that their defence mechanism of being spicy is what makes humans enjoy them so much.

Capsaicin is the chemical compound in chillies responsible for making them spicy, hence the app name **Capsaicin Station**. I was going to call it **Capsaicin Corner**, but I preferred the idea of wordplay to alliteration. :)

This app was made with the following technologies:

- **EJS**
- **CSS**
- **JavaScript**

The app can be accessed here: <https://capsaicin-station.netlify.app/>

### Any challenges while making this app?

Messing around with embedded schemas was really annoying - part of me just wanted to metaphorically rip up the model and start over with 2 separate model.js files. But for some reason, I carried on with just the one model.js file, and powered through to get the embedded schema working. It resulted in a **lot** of messing around with arrays and functions being considerably longer and more complicated than if I had used two models.

```
router.get("/:userId/chillies/:chilliId", async (req, res) => {
    try {
        const chilliUser = await User.findById(req.params.userId).populate("chillies.creator")
        const oneChilliArray = await chilliUser.chillies.filter((chilli) => chilli._id.toString() === req.params.chilliId.toString())
        const creator = await User.findById(oneChilliArray[0].creator)
        res.render("chillies/show.ejs", {
            chilli: oneChilliArray[0],
            creator: creator,
        })
    } catch (error) {
        res.render("error.ejs", {message: error.message})
    }
})
```

Though, in the end, having figured it out, I'm glad I went for this option as it really pushed my problem solving skills to the limit. It was fun to apply more of my previously learnt knowledge to bring things all together. It makes for a much better learning experience to take on a difficult piece of work (within reason of course!). 10/10, would do again, but also wouldn't wholly recommend because it was driving me crazy... :/

### Next steps?

- I'd like to add a comments feature because as of right now, the only way for other users to communicate is via the information in their data posts (very limited!).

- I've found the colour scheme of the webpage to be quite easy on the eyes, but it may still be worth it to add a dark mode in the future.

- Implement a feature where a user who isn't signed in can still view information pages of individual chillies. This would benefit someone who for example, were to search on a search engine for a chilli and see my app, to be able to do so quickly i.e. without having to also create an account.

- A search bar on the app, and filters to sort the **Community Chillies** page (alphabetically for example).


## Enjoy the app! <3