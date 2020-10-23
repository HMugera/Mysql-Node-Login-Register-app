const db = require("../connection");

exports.login = (request, response) => {
  const { email, password } = request.body;

  console.log(request.body);
  if (email && password) {
    db.query(
      "SELECT * FROM people WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        const userDet = results;
        console.log(userDet);
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.email = email;
          response.status(200).redirect("/home");
        } else {
          response.send("Incorrect Email and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Email and Password!");
    response.end();
  }
};
exports.register = (req, res) => {
  console.log(req.body);

  let { name, email, password, confirmPassword } = req.body;

  db.query(
    "SELECT email from people WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        return console.log(error);
      }
      if (results.length > 0) {
        console.log("Email is in use");

        return res.render("register", {
          message: "That Email is already in use",
        });
      } else if (password !== confirmPassword) {
        console.log("Passords do not match");
      }

      db.query(
        "INSERT INTO people SET ?",
        {
          name: name,
          email: email,
          password: password,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            res.status(200).redirect("/");
          }
        }
      );
    }
  );
};
