const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMember = [];


function askQuestions() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?.",
            name: "name",
        },
        {
            type: "input",
            message: "What is your Employee ID number?.",
            name: "id",
        },
        {
            type: "input",
            message: "What is your email address?.",
            name: "email",
        },
        {
            type: "list",
            message: "What is your role (title)?",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
            ]
        },
    ]).then(function (data) {
        console.log(data);
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const role = data.role;
        console.log(data.role);



        if (role === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your office number?.",
                    name: "officeNumber",
                }]).then(function (data) {
                    officeNumber = data.officeNumber;
                    emp = new Manager(name, id, email, officeNumber);
                    console.log(emp);

                    teamMember.push(emp);
                    addAnotherPerson();
                });
        }
        if (role === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is your Github username?",
                    name: "gitHubName",
                }]).then(function (data) {
                    gitHubName = data.gitHubName;
                    emp = new Engineer(name, id, email, gitHubName);
                    console.log(emp);
                    teamMember.push(emp);
                    addAnotherPerson()
                });
        }
        if (role === "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What school did you go to?",
                    name: "school",
                }]).then(function (data) {
                    school = data.school;
                    emp = new Intern(name, id, email, school);
                    console.log(emp);
                    teamMember.push(emp);
                    addAnotherPerson();
                });
        }
    });
}


function addAnotherPerson() {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "addAnother",
    }]).then(function (res) {
        console.log(res);
        if (res.addAnother === true) {
            askQuestions();
        } else {
            const outputPath = render(teamMember);
            fs.writeFile('./output/team.html', outputPath, function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("Success!");
            });
        }
    });
}


askQuestions();
