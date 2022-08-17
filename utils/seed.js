const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Array of objects to hold the users
    const user = [
        {
            username: "canslercp",
            email: "canslercp@gmail.com",
        },
        {
            username: "coco123",
            email: "coco123@gmail.com",
        },
        {
            username: "nimmyNam",
            email: "nimmyNam@gmail.com",
        },
        {
            username: "poppyyy",
            email: "poppyyy@gmail.com",
        },
    ];

    // Array of objects to hold the thoughts
    const thought = [
        {
            thought: "Bootcamp is almost over! I need to apply to more jobs...",
            username: "canslercp",
        },
        {
            thought: "I can't wait to go to Colorado!!",
            username: "coco123",
        },
        {
            thought: "SQUIRRELL!!",
            username: "nimmyNam",
        },
        {
            thought: "I'm really loving this cooler weather! I hope it says this way...",
            username: "poppyyy",
        },
    ];

    // Add users to the collection and await the results
    await User.collection.insertMany(user);

    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thought);

    // Log out the seed data to indicate what should appear in the database
    console.table(user);
    console.table(thought);
    console.info("Seeding complete!");
    process.exit(0);
});