app.factory("ItemsFactory", function() {

    var users = [
        {name: "Karol", id: 1},
        {name: "Arek", id: 2},
        {name: "Tomek", id: 3},
    ];

    return {
        users: users,
        pluralize: {0:"Brak użytkowników", 1:"Użytkownik", 'other':"Użytkowników"}
    }
});
