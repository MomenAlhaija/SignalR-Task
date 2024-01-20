var connection = new signalR.HubConnectionBuilder().withUrl("/ChatHub").build();

// Listen for "ReceiveMessage" event from the hub
connection.on("ReceiveMessage", function (fromUser, message) {
    var msg = fromUser + " " + message;
    var li = document.createElement("li");
    li.textContent = msg;
    $("#list").prepend(li);
});

// Start the connection
connection.start().then(function () {
    console.log("SignalR connected.");
}).catch(function (err) {
    console.error("Error connecting to SignalR:", err);
});

$("#btnSend").on("click", function () {
    var fromUser = $(".textUser").val();
    var message = $(".textMessage").val();
    connection.invoke("SendMessage", fromUser, message)
        .catch(function (err) {
            console.error("Error sending message:", err);
        });
});
