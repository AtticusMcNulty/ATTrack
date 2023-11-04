/**************************************************************************
********************************** START **********************************
***************************************************************************/
window.onload = function() {
    document.getElementById("scoreline_el3").setAttribute('size', document.getElementById("scoreline_el3").getAttribute('placeholder').length + 2);

    update_current_game();
    initialize_all_time_stats();
    initialize_highscore_stats();
    runLogin(0);

    allTimeStats([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    run_achievements();
    initialize_levels();
    load_analytics_chart();
}





// localStorage.clear();

/**************************************************************************
********************************** LOGIN **********************************
***************************************************************************/

function runLogin(login) {
    let loginSection = document.getElementById("login_section");
    let website = document.getElementById("website");

    let firstLogin = window.localStorage.getItem("firstLogin");
    let loginFieldSection = document.getElementById("login_field_section");

    // if just loading the page
    if (login == 0) {
        website.style.display = "none";

        // if first time loggin in
        if (firstLogin == 0) {
            document.getElementById("login_header").textContent = "Create ATTrack Account";
            document.getElementById("login_btn").textContent = "Sign Up";
        }
        
    } else { // if attempting to login
        let username2 = document.getElementById("username_entry").value;
        let password2 = document.getElementById("pw_entry").value;

        // if first time logging in
        if (firstLogin == 0) {
            let loginReqs = document.getElementById("login_requirements");

            if (loginReqs) {
                loginReqs.remove();
            }

            loginReqs = document.createElement("p");
            loginReqs.id = "login_requirements";
            loginReqs.style.margin = "-10px 0px 10px 0px";
            loginReqs.style.color = "#c1121f";

            if (username2.length < 8 || password2.length < 8) {
                loginReqs.textContent = "Username and PW must be longer than 8 characters";
            }
            else if (username2.length > 20 || password2.length > 20) {
                loginReqs.textContent = "Username and PW cannot be more than 20 characters";
            }
            else {
                // update username and pw
                window.localStorage.setItem("username", username2);
                window.localStorage.setItem("password", password2);

                // show website
                loginSection.style.display = "none";
                website.style.display = "block";

                // update that the user has logged in before
                window.localStorage.setItem("firstLogin", 1);

                get_personal_info();
            }

            loginFieldSection.insertAdjacentElement("afterend", loginReqs);
        }
        else { // already created an account
            let username = window.localStorage.getItem("username");
            let password = window.localStorage.getItem("password");
        
            let errorText = document.getElementById("errorText");
        
            // Remove existing error messages if they exist
            if (errorText) {
                errorText.remove();
            }
        
            // Check if username and password match
            if (username == username2 && password == password2) {
                loginSection.style.display = "none";
                website.style.display = "block";
            }
            else {
                errorText = document.createElement("p");
                errorText.id = "errorText";
                errorText.style.margin = "-10px 0px 10px 0px";
                errorText.style.color = "#c1121f";
                
                if (username != username2 && password != password2) {
                    errorText.textContent = "Incorrect Username and Password";
                }
                // If password doesn't match, add error msg to HTML
                else if (password != password2) {
                    errorText.textContent = "Incorrect Password";
                }
                // If username doesn't match, add error msg to HTML
                else if (username != username2) {
                    errorText.textContent = "Incorrect Username";
                }

                loginFieldSection.insertAdjacentElement("afterend", errorText);
            }
        }        
    }
}

function get_personal_info() {
    // get and store personal information
    window.localStorage.setItem("fullname", prompt("Enter your fullname (e.g. John Doe)."));
    window.localStorage.setItem("dateOfBirth", prompt("Enter your date of birth (e.g. 03/13/2006)."));
    window.localStorage.setItem("clubName", prompt("Enter your club (e.g. Arensal FC)."));
    window.localStorage.setItem("age", prompt("Enter your age (e.g. 18)."));
    window.localStorage.setItem("height", prompt("Enter your height (e.g. 5'9)."));
    window.localStorage.setItem("weight", prompt("Enter your weight (e.g. 112)."));
    window.localStorage.setItem("email", prompt("Enter your email (e.g. attrack@gmail.com)."));
    window.localStorage.setItem("phoneNumber", prompt("Enter your phone number (e.g. (342)233-8935)."));

    // update personal information
    document.getElementById("profile_name").textContent += `${window.localStorage.getItem("fullname")}`;
    document.getElementById("profile_date_of_birth").textContent += `${window.localStorage.getItem("dateOfBirth")}`;
    document.getElementById("profile_club").textContent += `${window.localStorage.getItem("clubName")}`;
    document.getElementById("profile_age").textContent += `${window.localStorage.getItem("age")}`;
    document.getElementById("profile_height").textContent += `${window.localStorage.getItem("height")}`;
    document.getElementById("profile_weight").textContent += `${window.localStorage.getItem("weight")}`;
    document.getElementById("profile_email").textContent += `${window.localStorage.getItem("email")}`;
    document.getElementById("profile_phone_number").textContent += `${window.localStorage.getItem("phoneNumber")}`;

    // update team name
    document.getElementById("scoreline_el1").textContent = `${window.localStorage.getItem("clubName")} 0 - `;
}









/**************************************************************************
********************************** TABS ***********************************
***************************************************************************/

function run_main_tabs() {
    let tabs = document.querySelectorAll("[data-tab-target]");
    let tabContents = document.querySelectorAll("[data-tab-content]");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            let target = document.querySelector(tab.dataset.tabTarget);

            tabContents.forEach(tabContent => {
                tabContent.classList.remove("active");
            });

            tabs.forEach(tab => {
                tab.classList.remove("active");
            });

            tab.classList.add("active");
            target.classList.add("active");

            if (target.id === "history_section") {
                document.querySelector("#footer").style.boxShadow = "0 50vh 0 50vh black";
            }
            else {
                document.querySelector("#footer").style.boxShadow = "0 50vh 0 50vh #1D1D1D";
            }
        });
    });
}

function run_achievement_tabs() {
    let tabs = document.getElementById("achievements_section").querySelectorAll("[data-tab-target-achievement]");
    let tabContents = document.getElementById("achievements_section").querySelectorAll("[data-tab-content-achievement]");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            let target = document.getElementById("achievements_section").querySelector(tab.dataset.tabTargetAchievement);

            tabContents.forEach(tabContent => {
                tabContent.classList.remove("active");
            });

            tabs.forEach(tab => {
                tab.classList.remove("active");
            });

            tab.classList.add("active");
            target.classList.add("active");
        });
    });
}








/**************************************************************************
********************************* CHARTS **********************************
***************************************************************************/

let yVals = [];
let xVals = [];

// localStorage.clear();

function load_analytics_chart() {
    let maximum = 1;

    xVals = [];

    let gamesPlayedAT = window.localStorage.getItem("gamesPlayedAT");
    let recordOfGames = JSON.parse(window.localStorage.getItem("recordOfGames"));

    // aquire number of matches
    for (let i = 1; i <= gamesPlayedAT; i++) {
        xVals.push(i);
    }

    // go through each game and aquire corresponding number of minutes
    for (let i = 0; i < gamesPlayedAT; i++) {
        if (recordOfGames && recordOfGames[i] && recordOfGames[i][0] !== undefined) {
            yVals.push(recordOfGames[i][0]);

            if (recordOfGames[i][0] >= maximum) {
                maximum = recordOfGames[i][0] + 1;
            }
        } else {
            yVals.push(0);
        }
    }

    let existingChartCanvas = document.querySelector("#analytics_chart");
    if (existingChartCanvas) {
        existingChartCanvas.parentNode.removeChild(existingChartCanvas);
    }

    // Create a new canvas element for the chart
    let canvas = document.createElement("canvas");
    canvas.id = "analytics_chart";
    
    // Get the select element
    let selectElement = document.getElementById("analytics_chart_dropdown");

    // Insert the new canvas element after the select element
    selectElement.parentNode.insertBefore(canvas, selectElement.nextSibling);

    new Chart("analytics_chart", {
        type: "line",
        data: {
          labels: xVals,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(255,255,255,1)",
            borderColor: "rgba(255,255,255,0.3)",
            data: yVals
          }]
        },
        options: {
          legend: {display: false},
          scales: {
              yAxes: [{
                  ticks: {
                      min: 0, max: maximum, fontColor: "rgba(255,255,255,0.8)"
                  },
                  gridLines: {
                      color: "rgba(255,255,255,0.3)" // Change this line to your desired grid line color
                  }
              }],
              xAxes: [{
                  ticks: {
                      fontColor: "rgba(255,255,255,0.8)"
                  },
                  gridLines: {
                      color: "rgba(255,255,255,0.3)" // Change this line to your desired grid line color
                  }
              }],
          }
        }
    });
}

document.querySelector("#analytics_chart_dropdown").addEventListener("change", function(event) {
    let maximum = 1;
    
    let recordOfGames = JSON.parse(window.localStorage.getItem("recordOfGames"));
    let selectedVal = Number(event.target.value);
    let gamesPlayedAT = window.localStorage.getItem("gamesPlayedAT");

    yVals = [];

    // go through each game and aquire corresponding number of given stat
    for (let i = 0; i < gamesPlayedAT; i++) {
        yVals.push(recordOfGames[i][selectedVal - 1]);

        if (recordOfGames[i][selectedVal - 1] >= maximum) {
            maximum = recordOfGames[i][selectedVal - 1] + 1;
        }
    }

    let existingChartCanvas = document.querySelector("#analytics_chart");
    if (existingChartCanvas) {
        existingChartCanvas.parentNode.removeChild(existingChartCanvas);
    }

    // Create a new canvas element for the chart
    let canvas = document.createElement("canvas");
    canvas.id = "analytics_chart";
    
    // Get the select element
    let selectElement = document.getElementById("analytics_chart_dropdown");

    // Insert the new canvas element after the select element
    selectElement.parentNode.insertBefore(canvas, selectElement.nextSibling);

    new Chart("analytics_chart", {
        type: "line",
        data: {
          labels: xVals,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(255,255,255,1)",
            borderColor: "rgba(255,255,255,0.3)",
            data: yVals
          }]
        },
        options: {
          legend: {display: false},
          scales: {
              yAxes: [{
                  ticks: {
                      min: 0, max: maximum, fontColor: "rgba(255,255,255,0.8)"
                  },
                  gridLines: {
                      color: "rgba(255,255,255,0.3)" // Change this line to your desired grid line color
                  }
              }],
              xAxes: [{
                  ticks: {
                      fontColor: "rgba(255,255,255,0.8)"
                  },
                  gridLines: {
                      color: "rgba(255,255,255,0.3)" // Change this line to your desired grid line color
                  }
              }],
          }
        }
    });
});




















/**************************************************************************
************************ CURRENT GAME / PERFORMANCE ***********************
***************************************************************************/

let deleteMode = false;

function update_current_game() {
    document.getElementById("lastgame_stats_header1").textContent = "Minutes: 0";
    document.getElementById("lastgame_stats_header2").textContent = "Match Rating: 6";
    document.getElementById("lastgame_stats_header2").style.fontFamily = "poppins";
    document.getElementById("lastgame_stats_header2").style.fontWeight = "normal";
    
    document.getElementById("lastgame_stats_header3").textContent = "Goals: 0";
    document.getElementById("lastgame_stats_header4").textContent = "Assists: 0";
    document.getElementById("lastgame_stats_header5").textContent = "Key Passes: 0";
    
    document.getElementById("lastgame_stats_header6").textContent = "Shots: 0";
    document.getElementById("lastgame_stats_header7").textContent = "Shots on Target: 0";
    document.getElementById("lastgame_stats_header8").textContent = "Shots off Target: 0";
    document.getElementById("lastgame_stats_header9").textContent = "Shots that Hit Post: 0";
    document.getElementById("lastgame_stats_header10").textContent = "Shots on Target %: 0";
    document.getElementById("lastgame_stats_header11").textContent = "Shots per Goal: 0";
    
    document.getElementById("lastgame_stats_header12").textContent = "Passes Attempted: 0";
    document.getElementById("lastgame_stats_header13").textContent = "Passes Completed: 0";
    document.getElementById("lastgame_stats_header14").textContent = "Passes Missed: 0";
    document.getElementById("lastgame_stats_header15").textContent = "Passes Completion %: 0";
    
    document.getElementById("lastgame_stats_header16").textContent = "Dribbles Attempted: 0";
    document.getElementById("lastgame_stats_header17").textContent = "Successful Dribbles: 0";
    document.getElementById("lastgame_stats_header18").textContent = "Failed Dribbles: 0";
    document.getElementById("lastgame_stats_header19").textContent = "Dribble Completion %: 0";
    document.getElementById("lastgame_stats_header20").textContent = "Fouls Won: 0";
    
    document.getElementById("lastgame_stats_header21").textContent = "Tackles: 0";
    document.getElementById("lastgame_stats_header22").textContent = "Clearances: 0";
    document.getElementById("lastgame_stats_header23").textContent = "Interceptions: 0";
    
    document.getElementById("lastgame_stats_header24").textContent = "Duels Attempted: 0";
    document.getElementById("lastgame_stats_header25").textContent = "Duels Won: 0";
    document.getElementById("lastgame_stats_header26").textContent = "Duels Lost: 0";
    document.getElementById("lastgame_stats_header27").textContent = "Duel Success %: 0";
    document.getElementById("lastgame_stats_header28").textContent = "Turnovers: 0";
    
    document.getElementById("lastgame_stats_header29").textContent = "Fouls: 0";
    document.getElementById("lastgame_stats_header30").textContent = "Yellow Cards: 0";
    document.getElementById("lastgame_stats_header31").textContent = "Red Card: 0";
    
}

let gamesPlayedAT = window.localStorage.getItem("gamesPlayedAT");

/******************************* Timer *******************************/

let minutes = 0;
let seconds = 0;
let displayMinutes;
let displaySeconds;
let timer;

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function updateTimer() {
      seconds++;

    if (seconds == 60) {
        minutes++;
        seconds = 0;
    }

    displayMinutes = (minutes < 10 ? "0" : "") + minutes;
    displaySeconds = (seconds < 10 ? "0" : "") + seconds;

    document.getElementById("timer_header").textContent = displayMinutes + ":" + displaySeconds;

    update_last_game_minutes();
    compareStats();
}

function update_last_game_minutes() {
    let minutesCGHeader = document.getElementById("lastgame_stats_header1");

    lastgameStats.lastgameStat1 = Number((minutes + (seconds / 60)).toFixed(1));

    minutesCGHeader.textContent = `Minutes: ${lastgameStats.lastgameStat1}`;

    updatePerGameStats();
}

let lastgameStats = {lastgameStat1: 0, lastgameStat2: 6.0, lastgameStat3: 0, lastgameStat4: 0, lastgameStat5: 0, lastgameStat6: 0, lastgameStat7: 0, lastgameStat8: 0, lastgameStat9: 0, lastgameStat10: 0, lastgameStat11: 0, lastgameStat12: 0, lastgameStat13: 0, lastgameStat14: 0, lastgameStat15: 0, lastgameStat16: 0, lastgameStat17: 0, lastgameStat18: 0, lastgameStat19: 0, lastgameStat20: 0, lastgameStat21: 0, lastgameStat22: 0, lastgameStat23: 0, lastgameStat24: 0, lastgameStat25: 0, lastgameStat26: 0, lastgameStat27: 0, lastgameStat28: 0, lastgameStat29: 0, lastgameStat30: 0, lastgameStat31: 0};

function add_count(btnNum) {
    let ingameStatBtn = document.getElementById(`ingame_stats_btn${btnNum}`);
    let lastGameStatHeader = document.getElementById(`lastgame_stats_header${btnNum}`);

    if (deleteMode == false) {
        lastgameStats[`lastgameStat${btnNum}`] = lastgameStats[`lastgameStat${btnNum}`] + 1;
    } else {
        lastgameStats[`lastgameStat${btnNum}`] = lastgameStats[`lastgameStat${btnNum}`] - 1;
    }

    default_mode();

    if (btnNum == 3) {        
        ingameStatBtn.textContent = `Goals: ${lastgameStats.lastgameStat3}`;
        lastGameStatHeader.textContent = `Goals: ${lastgameStats.lastgameStat3}`;

        add_team_goal();
    }
    else if (btnNum == 4) {
        ingameStatBtn.textContent = `Assists: ${lastgameStats.lastgameStat4}`;
        lastGameStatHeader.textContent = `Assists: ${lastgameStats.lastgameStat4}`;

        add_team_goal();
    }
    else if (btnNum == 5) {
        ingameStatBtn.textContent = `Key Passes: ${lastgameStats.lastgameStat5}`;
        lastGameStatHeader.textContent = `Key Passes: ${lastgameStats.lastgameStat5}`;
    }
    else if (btnNum == 7) {
        ingameStatBtn.textContent = `On Target: ${lastgameStats.lastgameStat7}`;
        lastGameStatHeader.textContent = `On Target: ${lastgameStats.lastgameStat7}`;

        update_other_shot_stats();
    }
    else if (btnNum == 8) {
        ingameStatBtn.textContent = `Off Target: ${lastgameStats.lastgameStat8}`;
        lastGameStatHeader.textContent = `Off Target: ${lastgameStats.lastgameStat8}`;

        update_other_shot_stats();
    }
    else if (btnNum == 9) {
        ingameStatBtn.textContent = `Hit Post: ${lastgameStats.lastgameStat9}`;
        lastGameStatHeader.textContent = `Shots Hit Post: ${lastgameStats.lastgameStat9}`;

        update_other_shot_stats();
    }
    else if (btnNum == 13) {
        ingameStatBtn.textContent = `Completed: ${lastgameStats.lastgameStat13}`;
        lastGameStatHeader.textContent = `Passes Completed: ${lastgameStats.lastgameStat13}`;

        update_other_pass_stats();
    }
    else if (btnNum == 14) {
        ingameStatBtn.textContent = `Missed: ${lastgameStats.lastgameStat14}`;
        lastGameStatHeader.textContent = `Passes Missed: ${lastgameStats.lastgameStat14}`;

        update_other_pass_stats();
    }
    else if (btnNum == 17) {
        ingameStatBtn.textContent = `Successful: ${lastgameStats.lastgameStat17}`;
        lastGameStatHeader.textContent = `Completed Dribbles: ${lastgameStats.lastgameStat17}`;

        update_other_dribble_stats();
    }
    else if (btnNum == 18) {
        ingameStatBtn.textContent = `Failed: ${lastgameStats.lastgameStat18}`;
        lastGameStatHeader.textContent = `Failed Dribbles: ${lastgameStats.lastgameStat18}`;

        update_other_dribble_stats();
    }
    else if (btnNum == 20) {
        ingameStatBtn.textContent = `Fouls Won: ${lastgameStats.lastgameStat20}`;
        lastGameStatHeader.textContent = `Fouls Won: ${lastgameStats.lastgameStat20}`;
    }
    else if (btnNum == 21) {
        ingameStatBtn.textContent = `Tackles: ${lastgameStats.lastgameStat21}`;
        lastGameStatHeader.textContent = `Tackles: ${lastgameStats.lastgameStat21}`;
    }
    else if (btnNum == 22) {
        ingameStatBtn.textContent = `Clearances: ${lastgameStats.lastgameStat22}`;
        lastGameStatHeader.textContent = `Clearances: ${lastgameStats.lastgameStat22}`;
    }
    else if (btnNum == 23) {
        ingameStatBtn.textContent = `Interceptions: ${lastgameStats.lastgameStat23}`;
        lastGameStatHeader.textContent = `Interceptions: ${lastgameStats.lastgameStat23}`;
    }
    else if (btnNum == 25) {
        ingameStatBtn.textContent = `Duels Won: ${lastgameStats.lastgameStat25}`;
        lastGameStatHeader.textContent = `Duels Won: ${lastgameStats.lastgameStat25}`;

        update_other_duel_stats();
    }
    else if (btnNum == 26) {
        ingameStatBtn.textContent = `Duels Lost: ${lastgameStats.lastgameStat26}`;
        lastGameStatHeader.textContent = `Duels Lost: ${lastgameStats.lastgameStat26}`;

        update_other_duel_stats();
    }
    else if (btnNum == 28) {
        ingameStatBtn.textContent = `Turnovers: ${lastgameStats.lastgameStat28}`;
        lastGameStatHeader.textContent = `Turnovers: ${lastgameStats.lastgameStat28}`;
    }
    else if (btnNum == 29) {
        ingameStatBtn.textContent = `Fouls: ${lastgameStats.lastgameStat29}`;
        lastGameStatHeader.textContent = `Fouls: ${lastgameStats.lastgameStat29}`;
    }
    else if (btnNum == 30) {
        ingameStatBtn.textContent = `Yellow Cards: ${lastgameStats.lastgameStat30}`;
        lastGameStatHeader.textContent = `Yellow Cards: ${lastgameStats.lastgameStat30}`;
    }
    else if (btnNum == 31) {
        ingameStatBtn.textContent = `Red Card: ${lastgameStats.lastgameStat31}`;
        lastGameStatHeader.textContent = `Red Card: ${lastgameStats.lastgameStat31}`;
    }

    updatePerGameStats();
    update_match_rating();
    compareStats();
}

/*************************** Helper Functions ***************************/

function update_match_rating() {
    let matchRatingHeader = document.getElementById("match_rating_header");
    let matchRatingCGHeader = document.getElementById("lastgame_stats_header2");

    lastgameStats.lastgameStat2 = Number(((lastgameStats.lastgameStat3 * 0.9) + (lastgameStats.lastgameStat4 * 0.7) + (lastgameStats.lastgameStat5 * 0.2) + (lastgameStats.lastgameStat7 * 0.1) + (lastgameStats.lastgameStat8 * -0.1) + (lastgameStats.lastgameStat9 * 0.15) + (lastgameStats.lastgameStat13 * 0.05) + (lastgameStats.lastgameStat14 * -0.05) + (lastgameStats.lastgameStat17 * 0.1) + (lastgameStats.lastgameStat18 * -0.1) + (lastgameStats.lastgameStat20 * 0.1) + (lastgameStats.lastgameStat21 * 0.1) + (lastgameStats.lastgameStat22 * 0.05) + (lastgameStats.lastgameStat23 * 0.1) + (lastgameStats.lastgameStat25 * 0.1) + (lastgameStats.lastgameStat26 * -0.1) + (lastgameStats.lastgameStat28 * -0.15) + (lastgameStats.lastgameStat29 * -0.1) + (lastgameStats.lastgameStat30 * -0.5) + (lastgameStats.lastgameStat31 * -1.5)).toFixed(2)) + 6;

    matchRatingHeader.textContent = `Match Rating: ${lastgameStats.lastgameStat2}`;
    matchRatingCGHeader.textContent = `Match Rating: ${lastgameStats.lastgameStat2}`;

    matchRatingHeader.style.fontFamily = "poppins";
    matchRatingCGHeader.style.fontFamily = "poppins";
    matchRatingHeader.style.fontWeight = "normal";
    matchRatingCGHeader.style.fontWeight = "normal";
}

function update_match_rating_based_on_score() {
    if (teamGoals > opponentGoals)
    {
        lastgameStats.lastgameStat2 = lastgameStats.lastgameStat2 + 0.3;
    }
    else if (teamGoals < opponentGoals) 
    {
        lastgameStats.lastgameStat2 = lastgameStats.lastgameStat2 - 0.3;
    }
}

let teamGoals = 0;
function add_team_goal() {
    let reignScoreHeader = document.getElementById("scoreline_el1");

    if (deleteMode == false)
    {
        teamGoals++;
    }
    else
    {
        teamGoals--;
    }

    reignScoreHeader.textContent = `OL Reign ${teamGoals} - `;
}

let opponentGoals = 0;
function add_opponent_goal() {
    let opponentScoreHeader = document.getElementById("opponent_score_in_game_header");

    if (deleteMode == false)
    {
        opponentGoals++;
    }
    else
    {
        opponentGoals--;
    }

    opponentScoreHeader.textContent = `${opponentGoals}`;
}

function update_other_shot_stats() {
    lastgameStats.lastgameStat6 = lastgameStats.lastgameStat7 + lastgameStats.lastgameStat8 + lastgameStats.lastgameStat9;
    document.getElementById("lastgame_stats_header6").textContent = `Shots: ${lastgameStats.lastgameStat6}`;

    lastgameStats.lastgameStat10 = lastgameStats.lastgameStat7 / lastgameStats.lastgameStat6;
    document.getElementById("lastgame_stats_header10").textContent = `Shots on Target %: ${(lastgameStats.lastgameStat10 * 100).toFixed(1)}`;

    lastgameStats.lastgameStat11 = lastgameStats.lastgameStat6 / lastgameStats.lastgameStat3;

    if (lastgameStats.lastgameStat3 == 0) {
        document.getElementById("lastgame_stats_header11").textContent = `Shots per Goal: N/A`;
    }
    else {
        document.getElementById("lastgame_stats_header11").textContent = `Shots per Goal: ${lastgameStats.lastgameStat11.toFixed(1)}`;
    }
}

function update_other_pass_stats() {
    lastgameStats.lastgameStat12 = lastgameStats.lastgameStat13 + lastgameStats.lastgameStat14;
    document.getElementById("lastgame_stats_header12").textContent = `Passes Attempted: ${lastgameStats.lastgameStat12}`;

    lastgameStats.lastgameStat15 = lastgameStats.lastgameStat13 / lastgameStats.lastgameStat12;
    document.getElementById("lastgame_stats_header15").textContent = `Passes Completion %: ${(lastgameStats.lastgameStat15 * 100).toFixed(1)}`;
}

function update_other_dribble_stats() {
    lastgameStats.lastgameStat16 = lastgameStats.lastgameStat17 + lastgameStats.lastgameStat18;
    document.getElementById("lastgame_stats_header16").textContent = `Dibbles Attempted: ${lastgameStats.lastgameStat16}`;

    lastgameStats.lastgameStat19 = lastgameStats.lastgameStat17 / lastgameStats.lastgameStat16;
    document.getElementById("lastgame_stats_header19").textContent = `Dribble Completion %: ${(lastgameStats.lastgameStat19 * 100).toFixed(1)}`;
}

function update_other_duel_stats() {
    lastgameStats.lastgameStat24 = lastgameStats.lastgameStat25 + lastgameStats.lastgameStat26;
    document.getElementById("lastgame_stats_header24").textContent = `Duels Attempted: ${lastgameStats.lastgameStat24}`;

    lastgameStats.lastgameStat27 = lastgameStats.lastgameStat25 / lastgameStats.lastgameStat24;
    document.getElementById("lastgame_stats_header27").textContent = `Duel Success %: ${(lastgameStats.lastgameStat27 * 100).toFixed(1)}`;
}

/******************************* Delete Mode *******************************/
function default_mode() {
    deleteMode = false;

    document.getElementById("scoreline_el1").style.color = "white";
    document.getElementById("scoreline_el2").style.color = "white";
    document.getElementById("scoreline_el3").style.color = "white";

    document.getElementById("ingame_stats_btn3").style.background = "white";
    document.getElementById("ingame_stats_btn4").style.background = "white";
    document.getElementById("ingame_stats_btn5").style.background = "white";
    document.getElementById("ingame_stats_btn7").style.background = "white";
    document.getElementById("ingame_stats_btn8").style.background = "white";
    document.getElementById("ingame_stats_btn9").style.background = "white";
    document.getElementById("ingame_stats_btn13").style.background = "white";
    document.getElementById("ingame_stats_btn14").style.background = "white";
    document.getElementById("ingame_stats_btn17").style.background = "white";
    document.getElementById("ingame_stats_btn18").style.background = "white";
    document.getElementById("ingame_stats_btn20").style.background = "white";
    document.getElementById("ingame_stats_btn21").style.background = "white";
    document.getElementById("ingame_stats_btn22").style.background = "white";
    document.getElementById("ingame_stats_btn23").style.background = "white";
    document.getElementById("ingame_stats_btn25").style.background = "white";
    document.getElementById("ingame_stats_btn26").style.background = "white";
    document.getElementById("ingame_stats_btn28").style.background = "white";
    document.getElementById("ingame_stats_btn29").style.background = "white";
    document.getElementById("ingame_stats_btn30").style.background = "white";
    document.getElementById("ingame_stats_btn31").style.background = "white";
}

function delete_mode() {
    deleteMode = true;
    
    document.getElementById("scoreline_el1").style.color = "#f08080";
    document.getElementById("scoreline_el2").style.color = "#f08080";
    document.getElementById("scoreline_el3").style.color = "#f08080";

    document.getElementById("ingame_stats_btn3").style.background = "#f08080";
    document.getElementById("ingame_stats_btn4").style.background = "#f08080";
    document.getElementById("ingame_stats_btn5").style.background = "#f08080";
    document.getElementById("ingame_stats_btn7").style.background = "#f08080";
    document.getElementById("ingame_stats_btn8").style.background = "#f08080";
    document.getElementById("ingame_stats_btn9").style.background = "#f08080";
    document.getElementById("ingame_stats_btn13").style.background = "#f08080";
    document.getElementById("ingame_stats_btn14").style.background = "#f08080";
    document.getElementById("ingame_stats_btn17").style.background = "#f08080";
    document.getElementById("ingame_stats_btn18").style.background = "#f08080";
    document.getElementById("ingame_stats_btn20").style.background = "#f08080";
    document.getElementById("ingame_stats_btn21").style.background = "#f08080";
    document.getElementById("ingame_stats_btn22").style.background = "#f08080";
    document.getElementById("ingame_stats_btn23").style.background = "#f08080";
    document.getElementById("ingame_stats_btn25").style.background = "#f08080";
    document.getElementById("ingame_stats_btn26").style.background = "#f08080";
    document.getElementById("ingame_stats_btn28").style.background = "#f08080";
    document.getElementById("ingame_stats_btn29").style.background = "#f08080";
    document.getElementById("ingame_stats_btn30").style.background = "#f08080";
    document.getElementById("ingame_stats_btn31").style.background = "#f08080";
}






/**************************************************************************
********************************* PER GAME ********************************
***************************************************************************/

function changeNumGamesPlayed(amount, manual) {
    let gamesPlayedHeaderAT = document.getElementById("games_played_header");
    let gamesPlayedAT = parseInt(window.localStorage.getItem("gamesPlayedAT"));

    gamesPlayedAT += amount;

    window.localStorage.setItem("gamesPlayedAT", gamesPlayedAT);
    gamesPlayedHeaderAT.textContent = `Games Played: ${gamesPlayedAT}`;

    updatePerGameStats();

    let recordOfGames = JSON.parse(window.localStorage.getItem("recordOfGames"));

    // only if user manually added/removed game
    if (amount == 0) {
        if (amount == -1) {
            recordOfGames.pop();
        } else if (amount == 1) {
        recordOfGames.push([0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }

    localStorage.setItem("recordOfGames", JSON.stringify(recordOfGames));
    load_analytics_chart();
}

// localStorage.clear();

let pergameStats = [];
function updatePerGameStats() {
    let gamesPlayedAT = Number(window.localStorage.getItem("gamesPlayedAT"));
    document.getElementById("games_played_header").textContent = `Games Played: ${gamesPlayedAT}`;
    
    let goalsAT = Number(window.localStorage.getItem("alltime_stat3"));
    let shotsAT = Number(window.localStorage.getItem("alltime_stat6"));

    for (let i = 1; i <= 31; i++) {
        let j = 1;

        let perGameStatHeader = document.getElementById(`pergame_stats_header${i}`);
        let allTimeStat = Number(window.localStorage.getItem(`alltime_stat${i}`));
        let perGameStat = allTimeStat / gamesPlayedAT;
        
        perGameStat = Number(perGameStat.toFixed(j));

        if (i == 1) {
            perGameStatHeader.textContent = `Minutes: ${perGameStat}`;
        }
        else if (i == 2) {
            perGameStatHeader.textContent = `Match Rating: ${perGameStat.toFixed(1)}`;
            perGameStatHeader.style.fontFamily = "poppins";
            perGameStatHeader.style.fontWeight = "normal";
            j++;
        }
        else if (i == 3) {
            perGameStatHeader.textContent = `Goals: ${perGameStat}`;
        }
        else if (i == 4) {
            perGameStatHeader.textContent = `Assists: ${perGameStat}`;
        }
        else if (i == 5) {
            perGameStatHeader.textContent = `Key Passes: ${perGameStat}`;
        }
        else if (i == 6) {
            perGameStatHeader.textContent = `Shots: ${perGameStat}`;
        }
        else if (i == 7) {
            perGameStatHeader.textContent = `Shots On Target: ${perGameStat}`;
        }
        else if (i == 8) {
            perGameStatHeader.textContent = `Shots Off Target: ${perGameStat}`;
        }
        else if (i == 9) {
            perGameStatHeader.textContent = `Shots Hit Post: ${perGameStat}`;
        }
        else if (i == 10) {
            perGameStat = allTimeStat;
            perGameStatHeader.textContent = `Shots On Target %: ${perGameStat.toFixed(1)}`;
        }
        else if (i == 11) {
            perGameStat = shotsAT / goalsAT;
            perGameStatHeader.textContent = `Shots Per Goal: ${perGameStat.toFixed(1)}`;
        }
        else if (i == 12) {
            perGameStatHeader.textContent = `Passes Attempted: ${perGameStat}`;
        }
        else if (i == 13) {
            perGameStatHeader.textContent = `Passes Completed: ${perGameStat}`;
        }
        else if (i == 14) {
            perGameStatHeader.textContent = `Passes Missed: ${perGameStat}`;
        }
        else if (i == 15) {
            perGameStat = allTimeStat;
            perGameStatHeader.textContent = `Pass Completion %: ${perGameStat.toFixed(1)}`;
        }
        else if (i == 16) {
            perGameStatHeader.textContent = `Dribbles Attempted: ${perGameStat}`;
        }
        else if (i == 17) {
            perGameStatHeader.textContent = `Successful Dribbles: ${perGameStat}`;
        }
        else if (i == 18) {
            perGameStatHeader.textContent = `Failed Dribbles: ${perGameStat}`;
        }
        else if (i == 19) {
            perGameStat = allTimeStat;
            perGameStatHeader.textContent = `Dribble Completion %: ${perGameStat.toFixed(1)}`;
        }
        else if (i == 20) {
            perGameStatHeader.textContent = `Fouls Won: ${perGameStat}`;
        }
        else if (i == 21) {
            perGameStatHeader.textContent = `Tackles: ${perGameStat}`;
        }
        else if (i == 22) {
            perGameStatHeader.textContent = `Clearances: ${perGameStat}`;
        }
        else if (i == 23) {
            perGameStatHeader.textContent = `Interceptions: ${perGameStat}`;
        }
        else if (i == 24) {
            perGameStatHeader.textContent = `Duels Attempted: ${perGameStat}`;
        }
        else if (i == 25) {
            perGameStatHeader.textContent = `Duels Won: ${perGameStat}`;
        }
        else if (i == 26) {
            perGameStatHeader.textContent = `Duels Lost: ${perGameStat}`;
        }
        else if (i == 27) {
            perGameStat = allTimeStat;
            perGameStatHeader.textContent = `Duels Success %: ${perGameStat.toFixed(1)}`;
        }
        else if (i == 28) {
            perGameStatHeader.textContent = `Turnovers: ${perGameStat}`;
        }
        else if (i == 29) {
            perGameStatHeader.textContent = `Fouls: ${perGameStat}`;
        }
        else if (i == 30) {
            perGameStatHeader.textContent = `Yellow Cards: ${perGameStat}`;
        }
        else if (i == 31) {
            perGameStatHeader.textContent = `Red Card: ${perGameStat}`;
        }

        pergameStats[i - 1] = perGameStat;
    }
}







/**************************************************************************
******************************** COMPARISONS ******************************
***************************************************************************/

// localStorage.clear();

function compareStats() {

    for (let i = 1; i <= 31; i++) {
        let statHeader = document.getElementById(`comparison_stats_header${i}`);

        if (i == 1 || i == 2) {
            let lastgameStatFixed = Number(lastgameStats[`lastgameStat${i}`].toFixed(1));
            let pergameStatFixed = Number(pergameStats[i - 1].toFixed(1));

            if (lastgameStatFixed > pergameStatFixed) {
                statHeader.textContent = `${(lastgameStatFixed - pergameStatFixed).toFixed(1)} ⬆️`;
            }
            else if (lastgameStatFixed < pergameStatFixed) {
                statHeader.textContent = `${(pergameStatFixed - lastgameStatFixed).toFixed(1)} ⬇️`;
            }
            else {
                statHeader.textContent = `${pergameStatFixed} = ${lastgameStatFixed}`;
            }
        }
        else if (i == 10 || i == 15 || i == 19 || i == 27) {
            let lastgameStatFixed = Number((lastgameStats[`lastgameStat${i}`] * 100).toFixed(1));
            let pergameStatFixed = Number(pergameStats[i - 1].toFixed(1));

            if (lastgameStatFixed > pergameStatFixed) {
                statHeader.textContent = `${(lastgameStatFixed - pergameStatFixed).toFixed(1)}% ⬆️`;
            }
            else if (lastgameStatFixed < pergameStatFixed) {
                statHeader.textContent = `${(pergameStatFixed - lastgameStatFixed).toFixed(1)}% ⬇️`;
            }
            else {
                statHeader.textContent = `${pergameStatFixed}% = ${lastgameStatFixed}%`;
            }
        }
        else {
            let lastgameStatFixed = Number(lastgameStats[`lastgameStat${i}`].toFixed(2));
            let pergameStatFixed = Number(pergameStats[i - 1].toFixed(2));

            if (lastgameStatFixed > pergameStatFixed) {
                statHeader.textContent = `${(lastgameStatFixed - pergameStatFixed).toFixed(2)} ⬆️`;
            }
            else if (lastgameStatFixed < pergameStatFixed) {
                statHeader.textContent = `${(pergameStatFixed - lastgameStatFixed).toFixed(2)} ⬇️`;
            }
            else {
                statHeader.textContent = `${pergameStatFixed} = ${lastgameStatFixed}`;
            }

            if (!isFinite(lastgameStatFixed)) {
                statHeader.textContent = "N/A";
            }
        }
    }
}







/**************************************************************************
********************************* FEEDBACK ********************************
***************************************************************************/

function performance_ranking() {
    let feedbackScoreHeader = document.getElementById("feedback_score_header");
    let feedbackOpponentScoreHeader = document.getElementById("scoreline_el3");

    let summaryHeader = document.getElementById("feedback_summary_header");
    let gradeHeader = document.getElementById("feedback_grade_header");
    let matchRatingHeader = document.getElementById("feedback_match_rating_header");
    let minutesPlayedHeader = document.getElementById("feedback_minutes_played_header");

    if (lastgameStats.lastgameStat2 >= 10) 
    {
        summaryHeader.textContent = "Summary: Outstanding performance! You were a real asset to the team!";    
        gradeHeader.textContent = "Grade: A+"
    } 
    else if (lastgameStats.lastgameStat2 >= 9) 
    {
        summaryHeader.textContent = "Summary: Excellent performance! You made a significant contribution to the team's success.";
        gradeHeader.textContent = "Grade: A"
    } 
    else if (lastgameStats.lastgameStat2 >= 8.5) 
    {
        summaryHeader.textContent = "Summary: Great performance! You played an important role in the team's success.";
        gradeHeader.textContent = "Grade: A-"
    } 
    else if (lastgameStats.lastgameStat2 >= 8) 
    {
        summaryHeader.textContent = "Summary: Good performance, but there is room for improvement. Keep working hard!";
        gradeHeader.textContent = "Grade: B+"
    } 
    else if (lastgameStats.lastgameStat2 >= 7.5) 
    {
        summaryHeader.textContent = "Summary: Solid performance, but there were some areas where you could have done better.";
        gradeHeader.textContent = "Grade: B"
    } 
    else if (lastgameStats.lastgameStat2 >= 7) 
    {
        summaryHeader.textContent = "Summary: Decent performance, but we know you can do better.";
        gradeHeader.textContent = "Grade: B-"
    } 
    else if (lastgameStats.lastgameStat2 >= 6.5) 
    {
        summaryHeader.textContent = "Summary: Above average performance. Let's focus on improving in training.";
        gradeHeader.textContent = "Grade: C+"
    } 
    else if (lastgameStats.lastgameStat2 >= 5.5) 
    {
        summaryHeader.textContent = "Summary: Average performance. We need you to step up and play to your full potential.";
        gradeHeader.textContent = "Grade: C"
    } 
    else if (lastgameStats.lastgameStat2 >= 4.5) 
    {
        summaryHeader.textContent = "Summary: Below average performance. We believe in your abilities, but we need to see more from you.";
        gradeHeader.textContent = "Grade: C-"
        
    } 
    else if (lastgameStats.lastgameStat2 >= 4) 
    {
        summaryHeader.textContent = "Summary: Poor performance. Let's work together to identify areas to improve.";
        gradeHeader.textContent = "Grade: D+"
    } 
    else if (lastgameStats.lastgameStat2 >= 3.5) 
    {
        summaryHeader.textContent = "Summary: Terrible performance. We know you can do better than this, let's work on it together.";
        gradeHeader.textContent = "Grade: D"
    } 
    else if (lastgameStats.lastgameStat2 >= 3) 
    {
        summaryHeader.textContent = "Summary: Unacceptable performance. We need to see significant improvements in your play.";
        gradeHeader.textContent = "Grade: D-"
    } else 
    {
        summaryHeader.textContent = "Summary: Abysmal performance. You need to step up your game significantly.";
        gradeHeader.textContent = "Grade: F"
    }

    feedbackScoreHeader.textContent = `Scoreline: OL Reign ${teamGoals} - ${opponentGoals} ${feedbackOpponentScoreHeader.value}`;
    minutesPlayedHeader.textContent = `Minutes Played: ${lastgameStats.lastgameStat1}`;

    matchRatingHeader.textContent = `Match Rating: ${lastgameStats.lastgameStat2.toFixed(2)}`;
    matchRatingHeader.style.fontFamily = "poppins";
    matchRatingHeader.style.fontWeight = "normal";


    give_advice();
}

let adviceSelected = [];
function set_advice(adviceHeader, num) {
    if (lastgameStats.lastgameStat6 < 2 && !adviceSelected.includes(1)) {
        if (lastgameStats.lastgameStat6 == 0)
        {
            adviceHeader.textContent = `Advice #${num}: You took 0 shots this game. Remember, you miss 100% of the shots you don't take. Every missed shot is an opportunity to learn and improve your technique for the next one.`;
        }
        else
        {
            adviceHeader.textContent = `Advice #${num}: You took 1 shot this game. Remember, you miss 100% of the shots you don't take. Every missed shot is an opportunity to learn and improve your technique for the next one.`;
        }
        adviceSelected.push(1);
    }
    else if (lastgameStats.lastgameStat4 == 0 && lastgameStats.lastgameStat5 == 0 && !adviceSelected.includes(2))
    {
        adviceHeader.textContent = `Advice #${num}: You failed to create any notable chances this game. Focus on improving your awareness and decision-making skills on the field, and always look for opportunities to create space and make passes that can open up scoring chances for your team.`;
        adviceSelected.push(2);
    }
    else if (lastgameStats.lastgameStat10 < 0.33 && !adviceSelected.includes(3)) 
    {
        adviceHeader.textContent = `Advice #${num}: Only ${(lastgameStats.lastgameStat10 * 100).toFixed(2)}% your shots were on target this game. Take a moment to analyze your shooting technique and approach, practice your accuracy through drills and repetition, and maintain a confident and composed mindset when in front of the goal.`;
        adviceSelected.push(3);
    }
    else if (lastgameStats.lastgameStat12 < 20 && !adviceSelected.includes(4))
    {
        adviceHeader.textContent = `Advice #${num}: You attempted only ${lastgameStats.lastgameStat12} passes, suggesting you were not involved enough in the game. Try to be more proactive and engaged by constantly scanning the field, moving into open spaces, and looking to make quick passes to your teammates to help in build up play.`;
        adviceSelected.push(4);
    }
    else if (lastgameStats.lastgameStat15 < 0.6 && !adviceSelected.includes(5))
    {
        adviceHeader.textContent = `Advice #${num}: You completed only ${(lastgameStats.lastgameStat15 * 100).toFixed(2)}% of your passes. Improve your passing accuracy by focusing on your technique, maintaining your composure under pressure, and constantly communicating with your teammates to better understand their movements and positioning on the field.`;
        adviceSelected.push(5);
    }
    else if (lastgameStats.lastgameStat16 < 4 && !adviceSelected.includes(6))
    {
        if (lastgameStats.lastgameStat16 == 1)
        {
            adviceHeader.textContent = `Advice #${num}: You attempted 1 dribble this game. Don't be afraid to take on defenders, use your speed and skill to create space, and always be confident in your abilities to beat your opponent and make an impact on the game.`;
        }
        else
        {
            adviceHeader.textContent = `Advice #${num}: You attempted ${lastgameStats.lastgameStat16} dribbles this game. Don't be afraid to take on defenders, use your speed and skill to create space, and always be confident in your abilities to beat your opponent and make an impact on the game.`;
        }
        adviceSelected.push(6);
    }
    else if (lastgameStats.lastgameStat19 < 0.4 && !adviceSelected.includes(7))
    {
        adviceHeader.textContent = `Advice #${num}: With a dribble completion rate of ${(lastgameStats.lastgameStat19 * 100).toFixed(2)}%, you lost the ball too much. Work on your dribbling technique and improve your ability to read defenders, anticipate their movements, and execute quick changes of direction to increase your ability to beat your defender. Utilize efficient moves and note the body position of the defender. if you get them to shift their body weight one way, then you should attack the other.`;
        adviceSelected.push(7);
    }
    else if (lastgameStats.lastgameStat21 < 4 && !adviceSelected.includes(8))
    {
        if (lastgameStats.lastgameStat21 == 1)
        {
            adviceHeader.textContent = `Advice #${num}: You attempted 1 tackle this game. Stay alert and engaged in the game, anticipate the movements of the opposing players, and work on your timing and technique to make effective tackles and disrupt their attack, helping your team to regain possession and control the game.`;
        }
        else
        {
            adviceHeader.textContent = `Advice #${num}: You attempted ${lastgameStats.lastgameStat21} tackles this game. Stay alert and engaged in the game, anticipate the movements of the opposing players, and work on your timing and technique to make effective tackles and disrupt their attack, helping your team to regain possession and control the game.`;
        }
        adviceSelected.push(8);
    }
    else if (lastgameStats.lastgameStat25 < lastgameStats.lastgameStat26 && !adviceSelected.includes(9))
    {
        adviceHeader.textContent = `Advice #${num}: You lost ${lastgameStats.lastgameStat26 - lastgameStats.lastgameStat25} more duels than you won. Improve your physicality and mental toughness, focus on your positioning and timing, and practice your defensive techniques to increase your chances of winning duels and regaining possession for your team.`;
        adviceSelected.push(9);
    }
    else if (lastgameStats.lastgameStat28 > 3 && !adviceSelected.includes(10))
    {
        adviceHeader.textContent = `Advice #${num}: You turned the ball over ${lastgameStats.lastgameStat28} times. Stay aware of your surroundings and constantly scan the field for available passing options before receiving the ball. The best players check their shoulder multiple times before recieving a pass in order to determine the best option.`;
        adviceSelected.push(10);
    }
    else if (lastgameStats.lastgameStat31 == 1 && !adviceSelected.includes(11))
    {
        adviceHeader.textContent = `Advice #${num}: You obtained a red card in your match. Although this is never the ideal outcome, sometimes showing passion and determination to defend your team's honor is admirable, so keep that fire burning, learn from the experience, and strive to maintain a balance between assertiveness and sportsmanship in future games.`;
        adviceSelected.push(11);
    }
    else
    {
        // adviceHeader.textContent = `Advice #${num}: None`;
        return 0;
    }
}

function give_advice() {
    let adviceElement = document.createElement("p");
    let adviceDiv = document.getElementById("feedback_advice_section");

    adviceElement.style.fontFamily = "poppins";
    adviceElement.style.fontSize = "1.8vmin"
    adviceElement.style.marginLeft = "25px";

    let number = 1;

    let again = set_advice(adviceElement, number);

    adviceDiv.appendChild(adviceElement);

    while(again != 0) {
        number++;

        adviceElement = document.createElement("p");

        adviceElement.style.fontFamily = "poppins";
        adviceElement.style.fontSize = "1.8vmin"
        adviceElement.style.marginLeft = "25px";

        again = set_advice(adviceElement, number);

        adviceDiv.appendChild(adviceElement);
    }
}

// when textarea is clicked off of, save notes
document.getElementById("notes").addEventListener("change", function(){
    let notes = document.getElementById("notes").value; // get notes
    window.localStorage.setItem("notes", notes); // save notes in local storage
});





/**************************************************************************
********************************* ALL TIME ********************************
***************************************************************************/

/************************* Initialize All Time Stats ***************************/
function initialize_all_time_stats() {
    let firstLogin = window.localStorage.getItem("firstLogin");
    if (!firstLogin) window.localStorage.setItem("firstLogin", 0);

    let logCount = window.localStorage.getItem("logCount");
    if (!logCount) window.localStorage.setItem("logCount", 0);

    let gamesPlayedAT = window.localStorage.getItem("gamesPlayedAT");
    if (!gamesPlayedAT) window.localStorage.setItem("gamesPlayedAT", 0);
    
    let historySection = window.localStorage.getItem("historySection");
    if (historySection == null) {
        let historySectionNew = document.createElement("div");

        historySectionNew.setAttribute("id", "history_section");
        historySectionNew.setAttribute("data-tab-content", "");

        historySectionNew.style.backgroundColor = "#1D1D1D";
        historySectionNew.style.color = "white";
        historySectionNew.fontFamily = "GT Walsheim"
        historySectionNew.style.borderRadius = "15px"; 
        historySectionNew.style.margin = "5px auto";
        historySectionNew.style.padding = "5px";
        historySectionNew.style.maxWidth = "600px";

        let header = document.createElement("h1");

        header.textContent = "History";
        header.style.fontFamily = "poppins";
        header.style.textAlign = "center";
        header.style.fontSize = "5vmin";
        header.style.marginBottom = "10px";
        header.style.marginTop = "8px";

        historySectionNew.appendChild(header);

        let horizontalLine = document.createElement("hr");

        horizontalLine.style.border = "0.1px solid white";
        horizontalLine.style.marginTop = "0px";
        horizontalLine.style.marginBottom = "2vmin";

        historySectionNew.appendChild(horizontalLine);

        document.body.appendChild(historySectionNew);
    }
    else 
    {
        let tempDiv = document.createElement("div");

        tempDiv.setAttribute("id", "history_section");
        tempDiv.setAttribute("data-tab-content", "");
        tempDiv.innerHTML = historySection;

        tempDiv.style.backgroundColor = "#1D1D1D";
        tempDiv.style.color = "white";
        tempDiv.fontFamily = "GT Walsheim"
        tempDiv.style.borderRadius = "15px"; 
        tempDiv.style.margin = "5px auto";
        tempDiv.style.padding = "5px";
        tempDiv.style.maxWidth = "600px";

        document.body.appendChild(tempDiv);
    }

    let pointsRedeemedAT = window.localStorage.getItem("pointsRedeemedAT");
    if(!pointsRedeemedAT) {
        window.localStorage.setItem("pointsRedeemedAT", 0);
    }
    else {
        totalPoints = totalPoints + Number(pointsRedeemedAT);
    }

    let redeemedArr = window.localStorage.getItem("redeemedArr");
    if (!redeemedArr) window.localStorage.setItem("redeemedArr", JSON.stringify([]));

    run_main_tabs();
    run_achievement_tabs();
    run_levels();
    set_redeemed();
    initialize_clothing_arr();

    let matchRatingPointsAT = window.localStorage.getItem("matchRatingPointsAT");
    if(!matchRatingPointsAT) {
        window.localStorage.setItem("matchRatingPointsAT", 0);
    } else {
        totalPoints = totalPoints + Number(matchRatingPointsAT);
    }

    let winsAT = window.localStorage.getItem("winsAT");
    let lossesAT = window.localStorage.getItem("lossesAT");
    let tiesAT = window.localStorage.getItem("tiesAT");
    if (winsAT && lossesAT && tiesAT) {
        document.getElementById("record_at_header").textContent = `Record: ${winsAT}W - ${lossesAT}L - ${tiesAT}T`;
    } else {
        window.localStorage.setItem("winsAT", 0);
        window.localStorage.setItem("lossesAT", 0);
        window.localStorage.setItem("tiesAT", 0);
    }

    let minutesAT = window.localStorage.getItem("alltime_stat1");
    let matchRatingAT = window.localStorage.getItem("alltime_stat2");
    let goalsAT = window.localStorage.getItem("alltime_stat3");
    let assistsAT = window.localStorage.getItem("alltime_stat4");
    let keyPassesAT = window.localStorage.getItem("alltime_stat5");
    let shotsAT = window.localStorage.getItem("alltime_stat6");
    let shotsOnTargetAT = window.localStorage.getItem("alltime_stat7");
    let shotsOffTargetAT = window.localStorage.getItem("alltime_stat8");
    let shotsHitPostAT = window.localStorage.getItem("alltime_stat9");
    let shotsOnTargetPercentageAT = window.localStorage.getItem("alltime_stat10");
    let shotsPerGoalAT = window.localStorage.getItem("alltime_stat11");
    let passesAttemptedAT = window.localStorage.getItem("alltime_stat12");
    let passesCompletedAT = window.localStorage.getItem("alltime_stat13");
    let passesMissedAT = window.localStorage.getItem("alltime_stat14");
    let passCompletionPercentageAT = window.localStorage.getItem("alltime_stat15"); 
    let dribblesAttemptedAT = window.localStorage.getItem("alltime_stat16");
    let successfulDribblesAT = window.localStorage.getItem("alltime_stat17");
    let failedDribblesAT = window.localStorage.getItem("alltime_stat18");
    let dribbleCompletionPercentageAT = window.localStorage.getItem("alltime_stat19");
    let foulsWonAT = window.localStorage.getItem("alltime_stat20");
    let tacklesAT = window.localStorage.getItem("alltime_stat21");
    let clearancesAT = window.localStorage.getItem("alltime_stat22");
    let interceptionsAT = window.localStorage.getItem("alltime_stat23"); 
    let duelsAttemptedAT = window.localStorage.getItem("alltime_stat24");
    let duelsWonAT = window.localStorage.getItem("alltime_stat25");
    let duelsLostAT = window.localStorage.getItem("alltime_stat26");
    let duelSuccessPercentageAT = window.localStorage.getItem("alltime_stat27");
    let turnoversAT = window.localStorage.getItem("alltime_stat28");
    let foulsAT = window.localStorage.getItem("alltime_stat29");
    let yellowCardsAT = window.localStorage.getItem("alltime_stat30");
    let redCardsAT = window.localStorage.getItem("alltime_stat31");
    let alltimeStats = [minutesAT, matchRatingAT, goalsAT, assistsAT, keyPassesAT, shotsAT, shotsOnTargetAT, shotsOffTargetAT, shotsHitPostAT, shotsOnTargetPercentageAT, shotsPerGoalAT, passesAttemptedAT, passesCompletedAT, passesMissedAT, passCompletionPercentageAT, dribblesAttemptedAT, successfulDribblesAT, failedDribblesAT, dribbleCompletionPercentageAT, foulsWonAT, tacklesAT, clearancesAT, interceptionsAT, duelsAttemptedAT, duelsWonAT, duelsLostAT, duelSuccessPercentageAT, turnoversAT, foulsAT, yellowCardsAT, redCardsAT];
    for (let i = 1; i <= 31; i++) {
        if (alltimeStats[i - 1]) {
            let statHeader = document.getElementById(`alltime_stats_header${i}`)

            if (i == 1) {
                statHeader.textContent =  `Minutes: ${minutesAT}`;
            }
            else if (i == 2) {
                statHeader.textContent = `Acc. Match Rating: ${matchRatingAT}`;
            }
            else if (i == 3) {
                statHeader.textContent =  `Goals: ${goalsAT}`;
            }
            else if (i == 4) {
                statHeader.textContent =  `Assists: ${assistsAT}`;
            }
            else if (i == 5) {
                statHeader.textContent =  `Key Passes: ${keyPassesAT}`;
            }
            else if (i == 6) {
                statHeader.textContent =  `Shots: ${shotsAT}`;
            }
            else if (i == 7) {
                statHeader.textContent =  `Shots On Target: ${shotsOnTargetAT}`;
            }
            else if (i == 8) {
                statHeader.textContent =  `Shots Off Target: ${shotsOffTargetAT}`;
            }
            else if (i == 9) {
                statHeader.textContent =  `Shots Hit Post: ${shotsHitPostAT}`;
            }
            else if (i == 10) {
                statHeader.textContent =  `Shots On Target %: ${shotsOnTargetPercentageAT}`;
            }
            else if (i == 11) {
                statHeader.textContent =  `Shots per Goal: ${shotsPerGoalAT}`;
            }
            else if (i == 12) {
                statHeader.textContent =  `Passes Attempted: ${passesAttemptedAT}`;
            }
            else if (i == 13) {
                statHeader.textContent =  `Passes Completed: ${passesCompletedAT}`;
            }
            else if (i == 14) {
                statHeader.textContent =  `Passes Missed: ${passesMissedAT}`;
            }
            else if (i == 15) {
                statHeader.textContent =  `Pass Completion %: ${passCompletionPercentageAT}`;
            }
            else if (i == 16) {
                statHeader.textContent =  `Dribbles Attempted: ${dribblesAttemptedAT}`;
            }
            else if (i == 17) {
                statHeader.textContent =  `Dribbles Completed: ${successfulDribblesAT}`;
            }
            else if (i == 18) {
                statHeader.textContent =  `Dribbles Failed: ${failedDribblesAT}`;
            }
            else if (i == 19) {
                statHeader.textContent =  `Dibble Completion %: ${dribbleCompletionPercentageAT}`;
            }
            else if (i == 20) {
                statHeader.textContent =  `Fouls Won: ${foulsWonAT}`;
            }
            else if (i == 21) {
                statHeader.textContent =  `Tackles: ${tacklesAT}`;
            }
            else if (i == 22) {
                statHeader.textContent =  `Clearances: ${clearancesAT}`;
            }
            else if (i == 23) {
                statHeader.textContent =  `Interceptions: ${interceptionsAT}`;
            }
            else if (i == 24) {
                statHeader.textContent =  `Duels Attempted: ${duelsAttemptedAT}`;
            }
            else if (i == 25) {
                statHeader.textContent =  `Duels Won: ${duelsWonAT}`;
            }
            else if (i == 26) {
                statHeader.textContent =  `Duels Lost: ${duelsLostAT}`;
            }
            else if (i == 27) {
                statHeader.textContent =  `Duel Success %: ${duelSuccessPercentageAT}`;
            }
            else if (i == 28) {
                statHeader.textContent =  `Turnovers: ${turnoversAT}`;
            }
            else if (i == 29) {
                statHeader.textContent =  `Fouls: ${foulsAT}`;
            }
            else if (i == 30) {
                statHeader.textContent =  `Yellow Cards: ${yellowCardsAT}`;
            }
            else if (i == 31) {
                statHeader.textContent =  `Red Cards: ${redCardsAT}`;
            }
        }
        else {
            window.localStorage.setItem(`alltime_stat${i}`, 0);
        }
    }

    let recordOfGames = window.localStorage.getItem("recordOfGames");
    if (!recordOfGames) window.localStorage.setItem("recordOfGames", JSON.stringify([]));

    let notes = window.localStorage.getItem("notes");
    if (notes) document.getElementById("notes").value = notes;
}

function updateAllTimeRecord() 
{
    if (teamGoals > opponentGoals)
    {
        updateAllTimeRecordWins(1);
    }
    else if (teamGoals < opponentGoals)
    {
        updateAllTimeRecordLosses(1);
    }
    else {
        updateAllTimeRecordTies(1);
    }
}

function updateAllTimeRecordWins(winsToAdd) 
{
    let recordHeaderAT = document.getElementById("record_at_header");

    let winsAT = Number(window.localStorage.getItem("winsAT")) || 0;
    let lossesAT = Number(window.localStorage.getItem("lossesAT")) || 0;
    let tiesAT = Number(window.localStorage.getItem("tiesAT")) || 0;

    winsAT += winsToAdd;

    winsAT = winsAT.toFixed(0);

    window.localStorage.setItem("winsAT", winsAT);
    recordHeaderAT.textContent = `Record: ${winsAT}W - ${lossesAT}L - ${tiesAT}T`;
}

function updateAllTimeRecordLosses(lossesToAdd) 
{
    let recordHeaderAT = document.getElementById("record_at_header");

    let winsAT = Number(window.localStorage.getItem("minutesAT")) || 0;
    let lossesAT = Number(window.localStorage.getItem("lossesAT")) || 0;
    let tiesAT = Number(window.localStorage.getItem("tiesAT")) || 0;

    lossesAT += lossesToAdd;

    lossesAT = lossesAT.toFixed(0);

    window.localStorage.setItem("lossesAT", lossesAT);
    recordHeaderAT.textContent = `Record: ${winsAT}W - ${lossesAT}L - ${tiesAT}T`;
}

function updateAllTimeRecordTies(tiesToAdd) 
{
    let recordHeaderAT = document.getElementById("record_at_header");

    let winsAT = Number(window.localStorage.getItem("minutesAT")) || 0;
    let lossesAT = Number(window.localStorage.getItem("lossesAT")) || 0;
    let tiesAT = Number(window.localStorage.getItem("tiesAT")) || 0;

    tiesAT += tiesToAdd;

    tiesAT = tiesAT.toFixed(0);

    window.localStorage.setItem("tiesAT", tiesAT);
    recordHeaderAT.textContent = `Record: ${winsAT}W - ${lossesAT}L - ${tiesAT}T`;
}

// localStorage.clear();

function allTimeStats(amounts) {
    // total shots, passes, dribbles, duels
    let shots = Number(window.localStorage.getItem("alltime_stat6")) + amounts[6] + amounts[7] + amounts[8];
    document.getElementById("alltime_stats_header6").textContent = `Shots: ${shots}`;            
    window.localStorage.setItem("alltime_stat6", shots);

    let passes = Number(window.localStorage.getItem("alltime_stat12")) + amounts[12] + amounts[13];
    document.getElementById("alltime_stats_header12").textContent = `Passes: ${passes}`;            
    window.localStorage.setItem("alltime_stat12", passes);

    let dribbles = Number(window.localStorage.getItem("alltime_stat16")) + amounts[16] + amounts[17];
    document.getElementById("alltime_stats_header16").textContent = `Dribbles: ${dribbles}`;            
    window.localStorage.setItem("alltime_stat16", dribbles);

    let duels = Number(window.localStorage.getItem("alltime_stat24")) + amounts[24] + amounts[25];
    document.getElementById("alltime_stats_header24").textContent = `Duels: ${duels}`;            
    window.localStorage.setItem("alltime_stat24", duels);


    for (let i = 1; i <= 31; i++) {
        let alltimeStatHeader = document.getElementById(`alltime_stats_header${i}`);
        let highscoreStatHeader =  document.getElementById(`highscore_stats_header${i}`);

        let alltimeStat = Number(window.localStorage.getItem(`alltime_stat${i}`));
        let highscoreStat = Number(window.localStorage.getItem(`highscore_stat${i}`));
        
        // add amount if i is not a total stat (total stats have already been calculated)
        if (i != 6 && i != 12 && i != 16 && i != 24)
            alltimeStat += amounts[i - 1];

        if (i == 1 || i == 2) 
            alltimeStat = alltimeStat.toFixed(1);

        if (i == 1) {
            alltimeStatHeader.textContent = `Accumulated Minutes: ${alltimeStat}`;

            if (lastgameStats.lastgameStat1 > highscoreStat) {
                highscoreStatHeader.textContent = `Minutes: ${lastgameStats.lastgameStat1}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat1);
            }
        }
        else if (i == 2) {
            alltimeStatHeader.textContent = `Accumulated Match Rating: ${alltimeStat}`;

            if (lastgameStats.lastgameStat2 > highscoreStat) {
                highscoreStatHeader.textContent = `Match Rating: ${lastgameStats.lastgameStat2}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat2);
            }
        }
        else if (i == 3) {
            alltimeStatHeader.textContent = `Goals: ${alltimeStat}`;

            if (lastgameStats.lastgameStat3 > highscoreStat) {
                highscoreStatHeader.textContent = `Goals: ${lastgameStats.lastgameStat3}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat3);
            }
        }
        else if (i == 4) {
            alltimeStatHeader.textContent = `Assists: ${alltimeStat}`;

            if (lastgameStats.lastgameStat4 > highscoreStat) {
                highscoreStatHeader.textContent = `Assists: ${lastgameStats.lastgameStat4}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat4);
            }
        }
        else if (i == 5) {
            alltimeStatHeader.textContent = `Key Passes: ${alltimeStat}`;

            if (lastgameStats.lastgameStat5 > highscoreStat) {
                highscoreStatHeader.textContent = `Key Passes: ${lastgameStats.lastgameStat5}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat5);
            }
        }
        else if (i == 7) {
            alltimeStatHeader.textContent = `Shots On Target: ${alltimeStat}`;

            if (lastgameStats.lastgameStat7 > highscoreStat) {
                highscoreStatHeader.textContent = `Shots On Target: ${lastgameStats.lastgameStat7}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat7);
            }
        }
        else if (i == 8) {
            alltimeStatHeader.textContent = `Shots Off Target: ${alltimeStat}`;

            if (lastgameStats.lastgameStat8 > highscoreStat) {
                highscoreStatHeader.textContent = `Shots Off Target: ${lastgameStats.lastgameStat8}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat8);
            }
        }
        else if (i == 9) {
            alltimeStatHeader.textContent = `Shots Hit Post: ${alltimeStat}`;

            if (lastgameStats.lastgameStat9 > highscoreStat) {
                highscoreStatHeader.textContent = `Shots Hit Post: ${lastgameStats.lastgameStat9}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat9);
            }
        }
        else if (i == 10) {
            alltimeStat = parseFloat(window.localStorage.getItem(`alltime_stat${i}`));
            highscoreStat = parseFloat(window.localStorage.getItem(`highscore_stat${i}`));

            let shotsAT = Number(window.localStorage.getItem("alltime_stat6"));
            let shotsOnTargetAT = Number(window.localStorage.getItem("alltime_stat7"));

            if (amounts[i - 1] == -1)
            {
                alltimeStat = 0
            }
            else if (amounts[i - 1] == 0.01)
            {
                alltimeStat += 0.01;
            }
            else
            {
                alltimeStat = shotsOnTargetAT / shotsAT;
            }
            
            alltimeStat = (alltimeStat * 100).toFixed(1);

            alltimeStatHeader.textContent = `Shots On Target %: ${alltimeStat}`;

            if ((lastgameStats.lastgameStat10 * 100) > highscoreStat) {
                highscoreStat = Number((lastgameStats.lastgameStat10 * 100).toFixed(1));

                highscoreStatHeader.textContent = `Shots On Target %: ${highscoreStat}`;
                window.localStorage.setItem(`highscore_stat${i}`, highscoreStat);
            }
        }
        else if (i == 11) {
            alltimeStat = parseFloat(window.localStorage.getItem(`alltime_stat${i}`));
            highscoreStat = parseFloat(window.localStorage.getItem(`highscore_stat${i}`));

            let shotsAT = Number(window.localStorage.getItem("alltime_stat6"));
            let goalsAT = Number(window.localStorage.getItem("alltime_stat3"));

            if (amounts[i - 1] == -1)
            {
                alltimeStat = 0
            }
            else if (amounts[i - 1] == 0.01)
            {
                alltimeStat += 0.01;
            }
            else
            {
                alltimeStat = (shotsAT / goalsAT).toFixed(2);
            }

            alltimeStatHeader.textContent = `Shots Per Goal: ${alltimeStat}`;

            if ((lastgameStats.lastgameStat11 * 100) > highscoreStat) {
                highscoreStat = Number(lastgameStats.lastgameStat11.toFixed(1));

                highscoreStatHeader.textContent = `Shots Per Goal: ${highscoreStat}`;
                window.localStorage.setItem(`highscore_stat${i}`, highscoreStat);
            }
        }
        else if (i == 13) {
            alltimeStatHeader.textContent = `Passes Completed: ${alltimeStat}`;

            if (lastgameStats.lastgameStat13 > highscoreStat) {
                highscoreStatHeader.textContent = `Passes Completed: ${lastgameStats.lastgameStat13}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat13);
            }
        }
        else if (i == 14) {
            alltimeStatHeader.textContent = `Passes Missed: ${alltimeStat}`;

            if (lastgameStats.lastgameStat14 > highscoreStat) {
                highscoreStatHeader.textContent = `Passes Missed: ${lastgameStats.lastgameStat14}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat14);
            }
        }
        else if (i == 15) {
            alltimeStat = parseFloat(window.localStorage.getItem(`alltime_stat${i}`));
            highscoreStat = parseFloat(window.localStorage.getItem(`highscore_stat${i}`));

            let passesCompletedAT = Number(window.localStorage.getItem("alltime_stat13"));
            let passesAttemptedAT = Number(window.localStorage.getItem("alltime_stat12"));

            if (amounts[i - 1] == -1)
            {
                alltimeStat = 0
            }
            else if (amounts[i - 1] == 0.01)
            {
                alltimeStat += 0.01;
            }
            else
            {
                alltimeStat = ((passesCompletedAT / passesAttemptedAT) * 100).toFixed(1);
            }

            alltimeStatHeader.textContent = `Pass Completion %: ${alltimeStat}`;

            if ((lastgameStats.lastgameStat15 * 100) > highscoreStat) {
                highscoreStat = Number((lastgameStats.lastgameStat15 * 100).toFixed(1));

                highscoreStatHeader.textContent = `Pass Completion %: ${highscoreStat}`;
                window.localStorage.setItem(`highscore_stat${i}`, highscoreStat);
            }
        }
        else if (i == 17) {
            alltimeStatHeader.textContent = `Dribbles Completed: ${alltimeStat}`;

            if (lastgameStats.lastgameStat17 > highscoreStat) {
                highscoreStatHeader.textContent = `Dribbles Completed: ${lastgameStats.lastgameStat17}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat17);
            }
        }
        else if (i == 18) {
            alltimeStatHeader.textContent = `Dribbles Failed: ${alltimeStat}`;

            if (lastgameStats.lastgameStat18 > highscoreStat) {
                highscoreStatHeader.textContent = `Dribbles Failed: ${lastgameStats.lastgameStat18}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat18);
            }
        }
        else if (i == 19) {
            alltimeStat = parseFloat(window.localStorage.getItem(`alltime_stat${i}`));
            highscoreStat = parseFloat(window.localStorage.getItem(`highscore_stat${i}`));

            let dribblesCompletedAT = Number(window.localStorage.getItem("alltime_stat17"));
            let dribblesAttemptedAT = Number(window.localStorage.getItem("alltime_stat16"));

            if (amounts[i - 1] == -1)
            {
                alltimeStat = 0
            }
            else if (amounts[i - 1] == 0.01)
            {
                alltimeStat += 0.01;
            }
            else
            {
                alltimeStat = ((dribblesCompletedAT / dribblesAttemptedAT) * 100).toFixed(1);
            }

            alltimeStatHeader.textContent = `Dribble Completion %: ${alltimeStat}`;

            if ((lastgameStats.lastgameStat19 * 100) > highscoreStat) {
                highscoreStat = Number((lastgameStats.lastgameStat19 * 100).toFixed(1));

                highscoreStatHeader.textContent = `Dribble Completion %: ${highscoreStat}`;
                window.localStorage.setItem(`highscore_stat${i}`, highscoreStat);
            }
        }
        else if (i == 20) {
            alltimeStatHeader.textContent = `Fouls Won: ${alltimeStat}`;

            if (lastgameStats.lastgameStat20 > highscoreStat) {
                highscoreStatHeader.textContent = `Fouls Won: ${lastgameStats.lastgameStat20}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat20);
            }
        }
        else if (i == 21) {
            alltimeStatHeader.textContent = `Tackles: ${alltimeStat}`;

            if (lastgameStats.lastgameStat21 > highscoreStat) {
                highscoreStatHeader.textContent = `Tackles: ${lastgameStats.lastgameStat21}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat21);
            }
        }
        else if (i == 22) {
            alltimeStatHeader.textContent = `Clearances: ${alltimeStat}`;

            if (lastgameStats.lastgameStat22 > highscoreStat) {
                highscoreStatHeader.textContent = `Clearances: ${lastgameStats.lastgameStat22}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat22);
            }
        }
        else if (i == 23) {
            alltimeStatHeader.textContent = `Interceptions: ${alltimeStat}`;

            if (lastgameStats.lastgameStat23 > highscoreStat) {
                highscoreStatHeader.textContent = `Interceptions: ${lastgameStats.lastgameStat23}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat23);
            }
        }
        else if (i == 25) {
            alltimeStatHeader.textContent = `Duels Won: ${alltimeStat}`;

            if (lastgameStats.lastgameStat25 > highscoreStat) {
                highscoreStatHeader.textContent = `Duels Won: ${lastgameStats.lastgameStat25}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat25);
            }
        }
        else if (i == 26) {
            alltimeStatHeader.textContent = `Duels Lost: ${alltimeStat}`;

            if (lastgameStats.lastgameStat26 > highscoreStat) {
                highscoreStatHeader.textContent = `Duels Lost: ${lastgameStats.lastgameStat26}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat26);
            }
        }
        else if (i == 27) {
            alltimeStat = parseFloat(window.localStorage.getItem(`alltime_stat${i}`));
            highscoreStat = parseFloat(window.localStorage.getItem(`highscore_stat${i}`));

            let duelsWonAT = Number(window.localStorage.getItem("alltime_stat25"));
            let duelsAttemptedAT = Number(window.localStorage.getItem("alltime_stat24"));

            if (amounts[i - 1] == -1)
            {
                alltimeStat = 0
            }
            else if (amounts[i - 1] == 0.01)
            {
                alltimeStat += 0.01;
            }
            else
            {
                alltimeStat = ((duelsWonAT / duelsAttemptedAT) * 100).toFixed(1);
            }

            alltimeStatHeader.textContent = `Duel Success %: ${alltimeStat}`;

            if ((lastgameStats.lastgameStat27 * 100) > highscoreStat) {
                highscoreStat = Number((lastgameStats.lastgameStat27 * 100).toFixed(1));

                highscoreStatHeader.textContent = `Duel Success %: ${highscoreStat}`;
                window.localStorage.setItem(`highscore_stat${i}`, highscoreStat);
            }
        }
        else if (i == 28) {
            alltimeStatHeader.textContent = `Turnovers: ${alltimeStat}`;

            if (lastgameStats.lastgameStat28 > highscoreStat) {
                highscoreStatHeader.textContent = `Turnovers: ${lastgameStats.lastgameStat28}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat28);
            }
        }
        else if (i == 29) {
            alltimeStatHeader.textContent = `Fouls: ${alltimeStat}`;

            if (lastgameStats.lastgameStat29 > highscoreStat) {
                highscoreStatHeader.textContent = `Fouls: ${lastgameStats.lastgameStat29}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat29);
            }
        }
        else if (i == 30) {
            alltimeStatHeader.textContent = `Yellow Cards: ${alltimeStat}`;

            if (lastgameStats.lastgameStat30 > highscoreStat) {
                highscoreStatHeader.textContent = `Yellow Cards: ${lastgameStats.lastgameStat30}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat30);
            }
        }
        else if (i == 31) {
            alltimeStatHeader.textContent = `Red Cards: ${alltimeStat}`;

            if (lastgameStats.lastgameStat31 > highscoreStat) {
                highscoreStatHeader.textContent = `Red Card: ${lastgameStats.lastgameStat31}`;
                window.localStorage.setItem(`highscore_stat${i}`, lastgameStats.lastgameStat31);
            }
        }

        window.localStorage.setItem(`alltime_stat${i}`, alltimeStat);
    }

    updatePerGameStats();
}








/**************************************************************************
********************************* HIGHSCORE ********************************
***************************************************************************/

/************************* Initialize Highscore Stats ***************************/
function initialize_highscore_stats() {
    let minutesHighscore = window.localStorage.getItem("highscore_stat1");
    let matchRatingHighscore = window.localStorage.getItem("highscore_stat2");

    let goalsHighscore = window.localStorage.getItem("highscore_stat3");
    let assistsHighscore = window.localStorage.getItem("highscore_stat4");
    let keyPassesHighscore = window.localStorage.getItem("highscore_stat5");
    
    let shotsHighscore = window.localStorage.getItem("highscore_stat6");
    let shotsOnTargetHighscore = window.localStorage.getItem("highscore_stat7");
    let shotsOffTargetHighscore = window.localStorage.getItem("highscore_stat8");
    let shotsHitPostHighscore = window.localStorage.getItem("highscore_stat9");
    let shotsOnTargetPercentageHighscore = window.localStorage.getItem("highscore_stat10");
    let shotsPerGoalHighscore = window.localStorage.getItem("highscore_stat11");
    
    let passesAttemptedHighscore = window.localStorage.getItem("highscore_stat12");
    let passesCompletedHighscore = window.localStorage.getItem("highscore_stat13");
    let passesMissedHighscore = window.localStorage.getItem("highscore_stat14");
    let passCompletionPercentageHighscore = window.localStorage.getItem("highscore_stat15");
    
    let dribblesAttemptedHighscore = window.localStorage.getItem("highscore_stat16");
    let successfulDribblesHighscore = window.localStorage.getItem("highscore_stat17");
    let failedDribblesHighscore = window.localStorage.getItem("highscore_stat18");
    let dribbleCompletionPercentageHighscore = window.localStorage.getItem("highscore_stat19");
    let foulsWonHighscore = window.localStorage.getItem("highscore_stat20");

    let tacklesHighscore = window.localStorage.getItem("highscore_stat21");
    let clearancesHighscore = window.localStorage.getItem("highscore_stat22");
    let interceptionsHighscore = window.localStorage.getItem("highscore_stat23");
    
    let duelsAttemptedHighscore = window.localStorage.getItem("highscore_stat24");
    let duelsWonHighscore = window.localStorage.getItem("highscore_stat25");
    let duelsLostHighscore = window.localStorage.getItem("highscore_stat26");
    let duelSuccessPercentageHighscore = window.localStorage.getItem("highscore_stat27");
    let turnoversHighscore = window.localStorage.getItem("highscore_stat28");

    let foulsHighscore = window.localStorage.getItem("highscore_stat29");
    let yellowCardsHighscore = window.localStorage.getItem("highscore_stat30");
    let redCardsHighscore = window.localStorage.getItem("highscore_stat31");

    let highscoreStats = [minutesHighscore, matchRatingHighscore, goalsHighscore, assistsHighscore, keyPassesHighscore, shotsHighscore, shotsOnTargetHighscore, shotsOffTargetHighscore, shotsHitPostHighscore, shotsOnTargetPercentageHighscore, shotsPerGoalHighscore, passesAttemptedHighscore, passesCompletedHighscore, passesMissedHighscore, passCompletionPercentageHighscore, dribblesAttemptedHighscore, successfulDribblesHighscore, failedDribblesHighscore, dribbleCompletionPercentageHighscore, foulsWonHighscore, tacklesHighscore, clearancesHighscore, interceptionsHighscore, duelsAttemptedHighscore, duelsWonHighscore, duelsLostHighscore, duelSuccessPercentageHighscore, turnoversHighscore, foulsHighscore, yellowCardsHighscore, redCardsHighscore];

    for (let i = 1; i <= 31; i++) {
        if (highscoreStats[i - 1]) {
            let statHeader = document.getElementById(`highscore_stats_header${i}`);

            if (i == 1) {
                statHeader.textContent =  `Minutes: ${minutesHighscore}`;
            }
            else if (i == 2) {
                statHeader.textContent = `Acc. Match Rating: ${Number(matchRatingHighscore).toFixed(1)}`;
            }
            else if (i == 3) {
                statHeader.textContent =  `Goals: ${goalsHighscore}`;
            }
            else if (i == 4) {
                statHeader.textContent =  `Assists: ${assistsHighscore}`;
            }
            else if (i == 5) {
                statHeader.textContent =  `Key Passes: ${keyPassesHighscore}`;
            }
            else if (i == 6) {
                statHeader.textContent =  `Shots: ${shotsHighscore}`;
            }
            else if (i == 7) {
                statHeader.textContent =  `Shots On Target: ${shotsOnTargetHighscore}`;
            }
            else if (i == 8) {
                statHeader.textContent =  `Shots Off Target: ${shotsOffTargetHighscore}`;
            }
            else if (i == 9) {
                statHeader.textContent =  `Shots Hit Post: ${shotsHitPostHighscore}`;
            }
            else if (i == 10) {
                statHeader.textContent =  `Shots On Target %: ${shotsOnTargetPercentageHighscore}`;
            }
            else if (i == 11) {
                statHeader.textContent =  `Shots per Goal: ${shotsPerGoalHighscore}`;
            }
            else if (i == 12) {
                statHeader.textContent =  `Passes Attempted: ${passesAttemptedHighscore}`;
            }
            else if (i == 13) {
                statHeader.textContent =  `Passes Completed: ${passesCompletedHighscore}`;
            }
            else if (i == 14) {
                statHeader.textContent =  `Passes Missed: ${passesMissedHighscore}`;
            }
            else if (i == 15) {
                statHeader.textContent =  `Pass Completion %: ${passCompletionPercentageHighscore}`;
            }
            else if (i == 16) {
                statHeader.textContent =  `Dribbles Attempted: ${dribblesAttemptedHighscore}`;
            }
            else if (i == 17) {
                statHeader.textContent =  `Dribbles Completed: ${successfulDribblesHighscore}`;
            }
            else if (i == 18) {
                statHeader.textContent =  `Dribbles Failed: ${failedDribblesHighscore}`;
            }
            else if (i == 19) {
                statHeader.textContent =  `Dribble Completion %: ${dribbleCompletionPercentageHighscore}`;
            }
            else if (i == 20) {
                statHeader.textContent =  `Fouls Won: ${foulsWonHighscore}`;
            }
            else if (i == 21) {
                statHeader.textContent =  `Tackles: ${tacklesHighscore}`;
            }
            else if (i == 22) {
                statHeader.textContent =  `Clearances: ${clearancesHighscore}`;
            }
            else if (i == 23) {
                statHeader.textContent =  `Interceptions: ${interceptionsHighscore}`;
            }
            else if (i == 24) {
                statHeader.textContent =  `Duels Attempted: ${duelsAttemptedHighscore}`;
            }
            else if (i == 25) {
                statHeader.textContent =  `Duels Won: ${duelsWonHighscore}`;
            }
            else if (i == 26) {
                statHeader.textContent =  `Duels Lost: ${duelsLostHighscore}`;
            }
            else if (i == 27) {
                statHeader.textContent =  `Duel Success %: ${duelSuccessPercentageHighscore}`;
            }
            else if (i == 28) {
                statHeader.textContent =  `Turnovers: ${turnoversHighscore}`;
            }
            else if (i == 29) {
                statHeader.textContent =  `Fouls: ${foulsHighscore}`;
            }
            else if (i == 30) {
                statHeader.textContent =  `Yellow Cards: ${yellowCardsHighscore}`;
            }
            else if (i == 31) {
                statHeader.textContent =  `Red Cards: ${redCardsHighscore}`;
            }
        }
        else {
            window.localStorage.setItem(`highscore_stat${i}`, 0);
        }
    }
}

/**************** Functions Called When Updating Stats *****************/
function update_all_time_stats_with_in_game_stats() {
    updateAllTimeRecord();

    updateAllTimeRecord();

    if (!isFinite(lastgameStats.lastgameStat11)) {
        lastgameStats.lastgameStat11 = 0;
    }

    allTimeStats([lastgameStats.lastgameStat1, lastgameStats.lastgameStat2, lastgameStats.lastgameStat3, lastgameStats.lastgameStat4, lastgameStats.lastgameStat5, lastgameStats.lastgameStat6, lastgameStats.lastgameStat7, lastgameStats.lastgameStat8, lastgameStats.lastgameStat9, lastgameStats.lastgameStat10, lastgameStats.lastgameStat11, lastgameStats.lastgameStat12, lastgameStats.lastgameStat13, lastgameStats.lastgameStat14, lastgameStats.lastgameStat15, lastgameStats.lastgameStat16, lastgameStats.lastgameStat17, lastgameStats.lastgameStat18, lastgameStats.lastgameStat19, lastgameStats.lastgameStat20, lastgameStats.lastgameStat21, lastgameStats.lastgameStat22, lastgameStats.lastgameStat23, lastgameStats.lastgameStat24, lastgameStats.lastgameStat25, lastgameStats.lastgameStat26, lastgameStats.lastgameStat27, lastgameStats.lastgameStat28, lastgameStats.lastgameStat29, lastgameStats.lastgameStat30, lastgameStats.lastgameStat31]);

    let recordOfGames = JSON.parse(window.localStorage.getItem("recordOfGames"));
    recordOfGames.push([lastgameStats.lastgameStat1, lastgameStats.lastgameStat2, lastgameStats.lastgameStat3, lastgameStats.lastgameStat4, lastgameStats.lastgameStat5, lastgameStats.lastgameStat6, lastgameStats.lastgameStat7, lastgameStats.lastgameStat8, lastgameStats.lastgameStat9, lastgameStats.lastgameStat10, lastgameStats.lastgameStat11, lastgameStats.lastgameStat12, lastgameStats.lastgameStat13, lastgameStats.lastgameStat14, lastgameStats.lastgameStat15, lastgameStats.lastgameStat16, lastgameStats.lastgameStat17, lastgameStats.lastgameStat18, lastgameStats.lastgameStat19, lastgameStats.lastgameStat20, lastgameStats.lastgameStat21, lastgameStats.lastgameStat22, lastgameStats.lastgameStat23, lastgameStats.lastgameStat24, lastgameStats.lastgameStat25, lastgameStats.lastgameStat26, lastgameStats.lastgameStat27, lastgameStats.lastgameStat28, lastgameStats.lastgameStat29, lastgameStats.lastgameStat30, lastgameStats.lastgameStat31]);
    localStorage.setItem("recordOfGames", JSON.stringify(recordOfGames));

    load_analytics_chart();
}

function update_last_match_stats() {
    document.getElementById("lastgame_stats_header1").textContent = `Minutes: ${lastgameStats.lastgameStat1}`;
    document.getElementById("lastgame_stats_header2").textContent = `Match Rating: ${lastgameStats.lastgameStat2.toFixed(1)}`;
    document.getElementById("lastgame_stats_header2").style.fontFamily = "poppins";
    document.getElementById("lastgame_stats_header2").style.fontWeight = "normal";

    document.getElementById("lastgame_stats_header3").textContent = `Goals: ${lastgameStats.lastgameStat3}`;
    document.getElementById("lastgame_stats_header4").textContent = `Assists: ${lastgameStats.lastgameStat4}`;
    document.getElementById("lastgame_stats_header5").textContent = `Key Passes: ${lastgameStats.lastgameStat5}`;
    
    document.getElementById("lastgame_stats_header6").textContent = `Shots: ${lastgameStats.lastgameStat6}`;
    document.getElementById("lastgame_stats_header7").textContent = `Shots on Target: ${lastgameStats.lastgameStat7}`;
    document.getElementById("lastgame_stats_header8").textContent = `Shots off Target: ${lastgameStats.lastgameStat8}`;
    document.getElementById("lastgame_stats_header9").textContent = `Shots that Hit Post: ${lastgameStats.lastgameStat9}`;
    document.getElementById("lastgame_stats_header10").textContent = `Shots on Target %: ${(lastgameStats.lastgameStat10 * 100).toFixed(1)}`;
    document.getElementById("lastgame_stats_header11").textContent = `Shots per Goal: ${(lastgameStats.lastgameStat11 * 100).toFixed(1)}`;

    document.getElementById("lastgame_stats_header12").textContent = `Passes Attempted: ${lastgameStats.lastgameStat12}`;
    document.getElementById("lastgame_stats_header13").textContent = `Passes Completed: ${lastgameStats.lastgameStat13}`;
    document.getElementById("lastgame_stats_header14").textContent = `Passes Missed: ${lastgameStats.lastgameStat14}`;
    document.getElementById("lastgame_stats_header15").textContent = `Pass Completion %: ${(lastgameStats.lastgameStat15 * 100).toFixed(1)}`;

    document.getElementById("lastgame_stats_header16").textContent = `Dribbles Attempted: ${lastgameStats.lastgameStat16}`;
    document.getElementById("lastgame_stats_header17").textContent = `Successful Dribbles: ${lastgameStats.lastgameStat17}`;
    document.getElementById("lastgame_stats_header18").textContent = `Failed Dribbles: ${lastgameStats.lastgameStat18}`;
    document.getElementById("lastgame_stats_header19").textContent = `Dribble Completion %: ${(lastgameStats.lastgameStat19 * 100).toFixed(1)}`;
    document.getElementById("lastgame_stats_header20").textContent = `Fouls Won: ${lastgameStats.lastgameStat20}`;

    document.getElementById("lastgame_stats_header21").textContent = `Tackles: ${lastgameStats.lastgameStat21}`;
    document.getElementById("lastgame_stats_header22").textContent = `Clearances: ${lastgameStats.lastgameStat22}`;
    document.getElementById("lastgame_stats_header23").textContent = `Interceptions: ${lastgameStats.lastgameStat23}`;

    document.getElementById("lastgame_stats_header24").textContent = `Duels Attempted: ${lastgameStats.lastgameStat24}`;
    document.getElementById("lastgame_stats_header25").textContent = `Duels Won: ${lastgameStats.lastgameStat25}`;
    document.getElementById("lastgame_stats_header26").textContent = `Duels Lost: ${lastgameStats.lastgameStat26}`;
    document.getElementById("lastgame_stats_header27").textContent = `Duel Success %: ${(lastgameStats.lastgameStat27 * 100).toFixed(1)}`;
    document.getElementById("lastgame_stats_header28").textContent = `Turnovers: ${lastgameStats.lastgameStat28}`;
    
    document.getElementById("lastgame_stats_header29").textContent = `Fouls: ${lastgameStats.lastgameStat29}`;
    document.getElementById("lastgame_stats_header30").textContent = `Yellow Cards: ${lastgameStats.lastgameStat30}`;
    document.getElementById("lastgame_stats_header31").textContent = `Red Card: ${lastgameStats.lastgameStat31}`;
}

function reset_in_game_stats() {
    minutes = 0;
    seconds = 0;
    teamGoals = 0;
    opponentGoals = 0;

    for (let i = 1; i <= 31; i++) {
        lastgameStats[`lastgameStat${i}`] = 0;

        if (i == 2) {
            lastgameStats[`lastgameStat${i}`] = 6;
        }
    }

    document.getElementById("scoreline_el1").textContent = `OL Reign ${teamGoals} - `;
    document.getElementById("scoreline_el2").textContent = `${opponentGoals} `;
    document.getElementById("scoreline_el3").value = "";
    document.getElementById("timer_header").textContent = `00:00`;

    document.getElementById("match_rating_header").textContent = `Match Rating: ${lastgameStats.lastgameStat2.toFixed(1)}`;

    document.getElementById("ingame_stats_btn3").textContent = `Goals: ${lastgameStats.lastgameStat3}`;
    document.getElementById("ingame_stats_btn4").textContent = `Assists: ${lastgameStats.lastgameStat4}`;
    document.getElementById("ingame_stats_btn5").textContent = `Key Passes: ${lastgameStats.lastgameStat5}`;

    document.getElementById("ingame_stats_btn7").textContent = `On Target: ${lastgameStats.lastgameStat7}`;
    document.getElementById("ingame_stats_btn8").textContent = `Off Target: ${lastgameStats.lastgameStat8}`;
    document.getElementById("ingame_stats_btn9").textContent = `Hit Post: ${lastgameStats.lastgameStat9}`;

    document.getElementById("ingame_stats_btn13").textContent = `Completed: ${lastgameStats.lastgameStat13}`;
    document.getElementById("ingame_stats_btn14").textContent = `Missed: ${lastgameStats.lastgameStat14}`;

    document.getElementById("ingame_stats_btn17").textContent = `Successful: ${lastgameStats.lastgameStat17}`;
    document.getElementById("ingame_stats_btn18").textContent = `Failed: ${lastgameStats.lastgameStat18}`;
    document.getElementById("ingame_stats_btn20").textContent = `Fouls Won: ${lastgameStats.lastgameStat20}`;

    document.getElementById("ingame_stats_btn21").textContent = `Tackles: ${lastgameStats.lastgameStat21}`;
    document.getElementById("ingame_stats_btn22").textContent = `Clearances: ${lastgameStats.lastgameStat22}`;
    document.getElementById("ingame_stats_btn23").textContent = `Interceptions: ${lastgameStats.lastgameStat23}`;

    document.getElementById("ingame_stats_btn25").textContent = `Duels Won: ${lastgameStats.lastgameStat25}`;
    document.getElementById("ingame_stats_btn26").textContent = `Duels Lost: ${lastgameStats.lastgameStat26}`;
    document.getElementById("ingame_stats_btn28").textContent = `Turnovers: ${lastgameStats.lastgameStat28}`;

    document.getElementById("ingame_stats_btn29").textContent = `Fouls: ${lastgameStats.lastgameStat29}`;
    document.getElementById("ingame_stats_btn30").textContent = `Yellow Cards: ${lastgameStats.lastgameStat30}`;
    document.getElementById("ingame_stats_btn31").textContent = `Red Cards: ${lastgameStats.lastgameStat31}`;
}

/************************** Update After Game **************************/

function update_stats() {
    changeNumGamesPlayed(1, 1);

    update_match_rating_based_on_score();

    // Update all time stats, passing in stats from current game
    update_all_time_stats_with_in_game_stats();

    // Populates last match section with in game stats
    update_last_match_stats();

    // Update per game states 
    updatePerGameStats();

    // Update comparison
    compareStats();

    create_log_game();

    performance_ranking();

    // update acheivements
    add_mr_to_points();
    run_achievements();
    run_levels();

    // Resets in game stats to original values
    reset_in_game_stats();
}







/**************************************************************************
******************************** Games Log ********************************
***************************************************************************/

function create_log_game() {
    // Get log count
    let logCount = window.localStorage.getItem("logCount");
 
    // Get date
    let today = new Date();
 
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
 
    // Create game log div
    let newGameLogDiv = document.createElement("div");
    newGameLogDiv.setAttribute("id", `newGameLogDiv${logCount}`);
    newGameLogDiv.style.margin = "0px auto";
 
    // Create date div
    let newDateDiv = document.createElement("div");
    newDateDiv.setAttribute("id", "newDateDiv");
 
    newDateDiv.style.display = 'flex';
    newDateDiv.style.flexDirection = 'row';
    newDateDiv.style.alignItems = 'center';
 
    // Create stats div
    let newStatsDiv = document.createElement("div");
    newStatsDiv.setAttribute("id", "newStatsDiv");
 
    newStatsDiv.style.display = 'flex';
    newStatsDiv.style.flexDirection = 'row';
 
    /******************************* Date Element *******************************/
    let date = document.createElement("h2");

    date.style.fontSize = "2.5vmin";
    date.style.marginLeft = "10px";
    date.style.marginBottom = "5px";

    date.textContent = month + '/' + day + '/' + year;
    newDateDiv.appendChild(date);

    /******************************* Scoreline Element *******************************/
    let scoreline = document.createElement("h2");
    let feedbackOpponentScoreHeader = document.getElementById("scoreline_el3");

    scoreline.style.fontSize = "1.75vmin";
    scoreline.style.marginLeft = "5px";
    scoreline.style.marginTop = "15px";
    scoreline.style.marginBottom = "5px";

    scoreline.textContent = `OL Reign ${teamGoals} - ${opponentGoals} ${feedbackOpponentScoreHeader.value}`;
    newDateDiv.appendChild(scoreline);
 
    /******************************* Delete Element *******************************/
    let deleteGameLogBtn = document.createElement("button");
    deleteGameLogBtn.innerHTML = "-";
 
    deleteGameLogBtn.style.background = "#c1121f";
    deleteGameLogBtn.style.color = "white";
    deleteGameLogBtn.style.fontSize = "1.5vmin";
    deleteGameLogBtn.style.border = "0px";
    deleteGameLogBtn.style.borderRadius = "6px";
    deleteGameLogBtn.style.padding = "2.5px 7px";
    deleteGameLogBtn.style.margin = "15px 0px 8px 5px";
 
    deleteGameLogBtn.setAttribute("id", `deleteGameLogBtn${logCount}`);
    deleteGameLogBtn.setAttribute("onclick", `deleteGameLog(${logCount})`);
 
    newDateDiv.appendChild(deleteGameLogBtn);

    /******************************* Minutes *******************************/
    let minutesLogElement = document.createElement("p");
 
    minutesLogElement.style.fontSize = "1.25vmin";
    minutesLogElement.style.margin = "0px 0px 0px 15px";
    minutesLogElement.setAttribute("id", "minutesLog");
 
    minutesLogElement.textContent = `M: ${lastgameStats.lastgameStat1} `;
    newStatsDiv.appendChild(minutesLogElement);
 

    /******************************* Match Rating *******************************/
    let matchRatingLogElement = document.createElement("p");
 
    matchRatingLogElement.style.fontSize = "1.25vmin";
    matchRatingLogElement.style.margin = "0px 0px 0px 5px";
    matchRatingLogElement.setAttribute("id", "matchRatingLog");
 
    matchRatingLogElement.textContent = `MR: ${lastgameStats.lastgameStat2.toFixed(2)} `;
    newStatsDiv.appendChild(matchRatingLogElement);
 
 
    /******************************* Goals *******************************/
    let goalsLogElement = document.createElement("p");
 
    goalsLogElement.style.fontSize = "1.25vmin";
    goalsLogElement.style.margin = "0px 0px 0px 5px";
    goalsLogElement.setAttribute("id", "goalsLog");
 
    goalsLogElement.textContent = `G: ${lastgameStats.lastgameStat3} `;
    newStatsDiv.appendChild(goalsLogElement);
 
 
    /******************************* Assists *******************************/
    let assistsLogElement = document.createElement("p");
 
    assistsLogElement.style.fontSize = "1.25vmin";
    assistsLogElement.style.margin = "0px 0px 0px 5px";
 
    assistsLogElement.textContent = `A: ${lastgameStats.lastgameStat4} `;
    newStatsDiv.appendChild(assistsLogElement);
 
    /******************************* Key Passes *******************************/
    let keyPassesLogElement = document.createElement("p");
 
    keyPassesLogElement.style.fontSize = "1.25vmin";
    keyPassesLogElement.style.margin = "0px 0px 0px 5px";
 
    keyPassesLogElement.textContent = `KP: ${lastgameStats.lastgameStat5} `;
    newStatsDiv.appendChild(keyPassesLogElement);
 
    /******************************* On Target *******************************/
    let onTargetLogElement = document.createElement("p");
 
    onTargetLogElement.style.fontSize = "1.25vmin";
    onTargetLogElement.style.margin = "0px 0px 0px 5px";
 
    onTargetLogElement.textContent = `ONT: ${lastgameStats.lastgameStat7} `;
    newStatsDiv.appendChild(onTargetLogElement);
 
    /******************************* Off Target *******************************/
    let offTargetLogElement = document.createElement("p");
 
    offTargetLogElement.style.fontSize = "1.25vmin";
    offTargetLogElement.style.margin = "0px 0px 0px 5px";
 
    offTargetLogElement.textContent = `OFT: ${lastgameStats.lastgameStat8} `;
    newStatsDiv.appendChild(offTargetLogElement);
 
    /******************************* Hit Post *******************************/
    let hitPostLogElement = document.createElement("p");
 
    hitPostLogElement.style.fontSize = "1.25vmin";
    hitPostLogElement.style.margin = "0px 0px 0px 5px";
 
    hitPostLogElement.textContent = `HP: ${lastgameStats.lastgameStat9} `;
    newStatsDiv.appendChild(hitPostLogElement);
 
    /******************************* Completed Pass *******************************/
    let completedPassLogElement = document.createElement("p");
 
    completedPassLogElement.style.fontSize = "1.25vmin";
    completedPassLogElement.style.margin = "0px 0px 0px 5px";
 
    completedPassLogElement.textContent = `CP: ${lastgameStats.lastgameStat13} `;
    newStatsDiv.appendChild(completedPassLogElement);
 
    /******************************* Missed Pass *******************************/
    let missedPassLogElement = document.createElement("p");
 
    missedPassLogElement.style.fontSize = "1.25vmin";
    missedPassLogElement.style.margin = "0px 0px 0px 5px";
 
    missedPassLogElement.textContent = `MP: ${lastgameStats.lastgameStat14} `;
    newStatsDiv.appendChild(missedPassLogElement);
 
    /******************************* Successful Dribbles *******************************/
    let successfulDribblesLogElement = document.createElement("p");
 
    successfulDribblesLogElement.style.fontSize = "1.25vmin";
    successfulDribblesLogElement.style.margin = "0px 0px 0px 5px";
 
    successfulDribblesLogElement.textContent = `SD: ${lastgameStats.lastgameStat17} `;
    newStatsDiv.appendChild(successfulDribblesLogElement);
 
    /******************************* Failed Dribbles *******************************/
    let failedDribblesLogElement = document.createElement("p");

    failedDribblesLogElement.style.fontSize = "1.25vmin";
    failedDribblesLogElement.style.margin = "0px 0px 0px 5px";
 
 
    failedDribblesLogElement.textContent = `FD: ${lastgameStats.lastgameStat18} `;
    newStatsDiv.appendChild(failedDribblesLogElement);

    /******************************* Fouls Won *******************************/
    let foulsWonLogElement = document.createElement("p");

    foulsWonLogElement.style.fontSize = "1.25vmin";
    foulsWonLogElement.style.margin = "0px 0px 0px 5px";
 
    foulsWonLogElement.textContent = `FW: ${lastgameStats.lastgameStat20} `;
    newStatsDiv.appendChild(foulsWonLogElement);

    /******************************* Tackles *******************************/
    let tacklesLogElement = document.createElement("p");

    tacklesLogElement.style.fontSize = "1.25vmin";
    tacklesLogElement.style.margin = "0px 0px 0px 5px";
 
    tacklesLogElement.textContent = `TK: ${lastgameStats.lastgameStat21} `;
    newStatsDiv.appendChild(tacklesLogElement);

    /******************************* Clearances *******************************/
    let clearancesLogElement = document.createElement("p");
 
    clearancesLogElement.style.fontSize = "1.25vmin";
    clearancesLogElement.style.margin = "0px 0px 0px 5px";
 
    clearancesLogElement.textContent = `C: ${lastgameStats.lastgameStat22} `;
    newStatsDiv.appendChild(clearancesLogElement);

    /******************************* Interceptions *******************************/
    let interceptionsLogElement = document.createElement("p");
 
    interceptionsLogElement.style.fontSize = "1.25vmin";
    interceptionsLogElement.style.margin = "0px 0px 0px 5px";
 
    interceptionsLogElement.textContent = `I: ${lastgameStats.lastgameStat23} `;
    newStatsDiv.appendChild(interceptionsLogElement);
 
    /******************************* Duels Won *******************************/
    let duelsWonLogElement = document.createElement("p");
 
    duelsWonLogElement.style.fontSize = "1.25vmin";
    duelsWonLogElement.style.margin = "0px 0px 0px 5px";
 
    duelsWonLogElement.textContent = `DW: ${lastgameStats.lastgameStat25} `;
    newStatsDiv.appendChild(duelsWonLogElement);
 
    /******************************* Duels Lost *******************************/
    let duelsLostLogElement = document.createElement("p");
 
    duelsLostLogElement.style.fontSize = "1.25vmin";
    duelsLostLogElement.style.margin = "0px 0px 0px 5px";
 
    duelsLostLogElement.textContent = `DL: ${lastgameStats.lastgameStat26} `;
    newStatsDiv.appendChild(duelsLostLogElement);
 
    /******************************* Turnovers *******************************/
    let turnoversLogElement = document.createElement("p");
 
    turnoversLogElement.style.fontSize = "1.25vmin";
    turnoversLogElement.style.margin = "0px 0px 0px 5px";
 
    turnoversLogElement.textContent = `TO: ${lastgameStats.lastgameStat28} `;
    newStatsDiv.appendChild(turnoversLogElement);
 
    /******************************* Fouls *******************************/
    let foulsLogElement = document.createElement("p");
 
    foulsLogElement.style.fontSize = "1.25vmin";
    foulsLogElement.style.margin = "0px 0px 0px 5px";
 
    foulsLogElement.textContent = `F: ${lastgameStats.lastgameStat29} `;
    newStatsDiv.appendChild(foulsLogElement);
   
    /******************************* Yellow Cards *******************************/
    let yellowCardsLogElement = document.createElement("p");
 
    yellowCardsLogElement.style.fontSize = "1.25vmin";
    yellowCardsLogElement.style.margin = "0px 0px 0px 5px";
 
    yellowCardsLogElement.textContent = `YC: ${lastgameStats.lastgameStat30} `;
    newStatsDiv.appendChild(yellowCardsLogElement);
 
    /******************************* Red Card *******************************/
    let redCardLogElement = document.createElement("p");
 
    redCardLogElement.style.fontSize = "1.25vmin";
    redCardLogElement.style.margin = "0px 0px 0px 5px";
 
    redCardLogElement.textContent = `RC: ${lastgameStats.lastgameStat31}`;
    newStatsDiv.appendChild(redCardLogElement);
 
    /******************************* Append Divs *******************************/    
    newGameLogDiv.appendChild(newDateDiv);
    newGameLogDiv.appendChild(newStatsDiv);

    // get history section
    let historySection = document.getElementById("history_section");

    historySection.style.backgroundColor = "#1D1D1D";
    historySection.style.color = "white";
    historySection.fontFamily = "GT Walsheim"
    historySection.style.borderRadius = "15px"; 
    historySection.style.margin = "5px auto";
    historySection.style.padding = "5px";
    historySection.style.maxWidth = "600px";

    if (historySection.firstChild.nextSibling.nextSibling) {
        historySection.insertBefore(newGameLogDiv, historySection.firstChild.nextSibling.nextSibling);
    } else {
        historySection.appendChild(newGameLogDiv);
    }
    
    // read to local storage
    window.localStorage.setItem("historySection", historySection.innerHTML);

    let newGameLogDivString = newGameLogDiv.innerHTML;
    window.localStorage.setItem(`newGameLogDivString${logCount}`, newGameLogDivString);
        
    logCount++;
    window.localStorage.setItem("logCount", logCount);
}
 
// Delete game log button
function deleteGameLog(logCount) {
    // get the grandparent element of the button
    let divminrapper = document.querySelector(`#deleteGameLogBtn${logCount}`).parentNode.parentNode;
 
    // remove the divminrapper from HTML
    divminrapper.remove();
 
    // remove it from localStorage
    if(window.localStorage.getItem(`newGameLogDivString${logCount}`))
    {
        window.localStorage.removeItem(`newGameLogDivString${logCount}`);
    }

    // get the updated history section
    let historySection = document.getElementById("history_section");

    // store the updated history section
    window.localStorage.setItem("historySection", historySection.innerHTML);

    // if there are no more game logs, remove the history section
    if (historySection.innerHTML == '') {
        window.localStorage.removeItem("historySection");
    }
}
 







/**************************************************************************
******************************* ACHIEVEMENTS ******************************
***************************************************************************/
let achievementNumber = 0;
let level = 0;
let totalPoints = 0;
let thresholds = [0, 150, 300, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 3250, 3500, 3750, 4000];
let thresholdTitles = ["Rookie", "Beginner", "Novice", "Amateur", "Casual", "Average", "Apprentice", "Skilled", "Competent", "Experienced", "Proficient", "Advanced", "Seasoned", "Expert", "Master", "Grandmaster", "Legend", "Mythical", "Transcendent", "God"];

function run_achievements() {
    achievementNumber = 0;

    let goalsHighscore = Number(window.localStorage.getItem("highscore_stat3"));
    let goalsAT = Number(window.localStorage.getItem("alltime_stat3"));

    let assistsHighscore = Number(window.localStorage.getItem("highscore_stat4"));
    let assistsAT = Number(window.localStorage.getItem("alltime_stat4"));

    let shotsHighscore = Number(window.localStorage.getItem("highscore_stat6"));
    let shotsAT = Number(window.localStorage.getItem("alltime_stat6"));

    let shotsOnTargetHighscore = Number(window.localStorage.getItem("highscore_stat7"));
    let shotsOnTargetAT = Number(window.localStorage.getItem("alltime_stat7"));

    let shotsOnTargetPercentageHighscore = Number(window.localStorage.getItem("highscore_stat10"));

    let shotsHitPostHighscore = Number(window.localStorage.getItem("highscore_stat9"));
    let shotsHitPostAT = Number(window.localStorage.getItem("alltime_stat9"));

    let shotsOffTargetHighscore = Number(window.localStorage.getItem("highscore_stat8"));
    let shotsOffTargetAT = Number(window.localStorage.getItem("alltime_stat8"));

    let passesCompletedHighscore = Number(window.localStorage.getItem("highscore_stat13"));
    let passesCompletedAT = Number(window.localStorage.getItem("alltime_stat13"));

    let passesAttempedHighscore = Number(window.localStorage.getItem("highscore_stat12"));
    let passesAttempedAT = Number(window.localStorage.getItem("alltime_stat12"));

    let passesMissedHighscore = Number(window.localStorage.getItem("highscore_stat14"));
    let passesMissedAT = Number(window.localStorage.getItem("alltime_stat14"));

    let successfulDribblesHighscore = Number(window.localStorage.getItem("highscore_stat17"));
    let successfulDribblesAT = Number(window.localStorage.getItem("alltime_stat17"));

    let dribblesAttempedHighscore = Number(window.localStorage.getItem("highscore_stat16"));
    let dribblesAttempedAT = Number(window.localStorage.getItem("alltime_stat16"));

    let failedDribblesHighscore = Number(window.localStorage.getItem("highscore_stat18"));
    let failedDribblesAT = Number(window.localStorage.getItem("alltime_stat18"));

    run_achievement_highscore(goalsHighscore, 1);
    run_achievement_highscore(goalsHighscore, 2);
    run_achievement_highscore(goalsHighscore, 3);
    run_achievement_all_time(goalsAT, 3);
    run_achievement_all_time(goalsAT, 6);
    run_achievement_all_time(goalsAT, 10);
    run_achievement_all_time(goalsAT, 15);
    run_achievement_all_time(goalsAT, 25);

    run_achievement_highscore(shotsHighscore, 3);
    run_achievement_highscore(shotsHighscore, 5);
    run_achievement_highscore(shotsHighscore, 10);
    run_achievement_all_time(shotsAT, 10);
    run_achievement_all_time(shotsAT, 25);
    run_achievement_all_time(shotsAT, 50);
    run_achievement_all_time(shotsAT, 100);
    run_achievement_all_time(shotsAT, 250);
    run_achievement_highscore(shotsOnTargetHighscore, 2);
    run_achievement_highscore(shotsOnTargetHighscore, 3);
    run_achievement_highscore(shotsOnTargetHighscore, 4);
    run_achievement_all_time(shotsOnTargetAT, 10);
    run_achievement_all_time(shotsOnTargetAT, 25);
    run_achievement_all_time(shotsOnTargetAT, 50);
    run_achievement_100_accuracy(shotsOnTargetHighscore, shotsOnTargetPercentageHighscore, 3);
    run_achievement_100_accuracy(shotsOnTargetHighscore, shotsOnTargetPercentageHighscore, 5);
    run_achievement_highscore(shotsHitPostHighscore, 1);
    run_achievement_highscore(shotsHitPostHighscore, 2);  
    run_achievement_all_time(shotsHitPostAT, 5);
    run_achievement_all_time(shotsHitPostAT, 10);
    run_achievement_highscore(shotsOffTargetHighscore, 2);
    run_achievement_highscore(shotsOffTargetHighscore, 3);
    run_achievement_highscore(shotsOffTargetHighscore, 4);   
    run_achievement_all_time(shotsOffTargetAT, 10);
    run_achievement_all_time(shotsOffTargetAT, 25);
    run_achievement_all_time(shotsOffTargetAT, 50);

    run_achievement_highscore(passesCompletedHighscore, 10);
    run_achievement_highscore(passesCompletedHighscore, 15);
    run_achievement_highscore(passesCompletedHighscore, 20);
    run_achievement_highscore(passesCompletedHighscore, 25);
    run_achievement_highscore(passesCompletedHighscore, 30);
    run_achievement_highscore(passesCompletedHighscore, 35);
    run_achievement_all_time(passesCompletedAT, 50);
    run_achievement_all_time(passesCompletedAT, 100);
    run_achievement_all_time(passesCompletedAT, 200);
    run_achievement_all_time(passesCompletedAT, 300);
    run_achievement_all_time(passesCompletedAT, 400);
    run_achievement_all_time(passesCompletedAT, 500);
    run_achievement_highscore(passesAttempedHighscore, 20);
    run_achievement_highscore(passesAttempedHighscore, 25);
    run_achievement_highscore(passesAttempedHighscore, 30);
    run_achievement_highscore(passesAttempedHighscore, 35);
    run_achievement_highscore(passesAttempedHighscore, 40);
    run_achievement_highscore(passesAttempedHighscore, 45);
    run_achievement_all_time(passesAttempedAT, 75);
    run_achievement_all_time(passesAttempedAT, 200);
    run_achievement_all_time(passesAttempedAT, 325);
    run_achievement_all_time(passesAttempedAT, 450);
    run_achievement_all_time(passesAttempedAT, 575);
    run_achievement_all_time(passesAttempedAT, 700);
    run_achievement_highscore(passesMissedHighscore, 5);
    run_achievement_highscore(passesMissedHighscore, 8);
    run_achievement_highscore(passesMissedHighscore, 10);
    run_achievement_highscore(passesMissedHighscore, 12);
    run_achievement_highscore(passesMissedHighscore, 15);
    run_achievement_highscore(passesMissedHighscore, 20);
    run_achievement_all_time(passesMissedAT, 25);
    run_achievement_all_time(passesMissedAT, 50);
    run_achievement_all_time(passesMissedAT, 75);
    run_achievement_all_time(passesMissedAT, 100);
    run_achievement_all_time(passesMissedAT, 125);
    run_achievement_all_time(passesMissedAT, 150);

    run_achievement_highscore(successfulDribblesHighscore, 4);
    run_achievement_highscore(successfulDribblesHighscore, 6);
    run_achievement_highscore(successfulDribblesHighscore, 8);
    run_achievement_highscore(successfulDribblesHighscore, 10);
    run_achievement_highscore(successfulDribblesHighscore, 12);
    run_achievement_highscore(successfulDribblesHighscore, 14);
    run_achievement_all_time(successfulDribblesAT, 15);
    run_achievement_all_time(successfulDribblesAT, 25);
    run_achievement_all_time(successfulDribblesAT, 35);
    run_achievement_all_time(successfulDribblesAT, 50);
    run_achievement_all_time(successfulDribblesAT, 75);
    run_achievement_all_time(successfulDribblesAT, 100);
    run_achievement_highscore(dribblesAttempedHighscore, 5);
    run_achievement_highscore(dribblesAttempedHighscore, 8);
    run_achievement_highscore(dribblesAttempedHighscore, 11);
    run_achievement_highscore(dribblesAttempedHighscore, 14);
    run_achievement_highscore(dribblesAttempedHighscore, 17);
    run_achievement_highscore(dribblesAttempedHighscore, 20);
    run_achievement_all_time(dribblesAttempedAT, 20);
    run_achievement_all_time(dribblesAttempedAT, 40);
    run_achievement_all_time(dribblesAttempedAT, 60);
    run_achievement_all_time(dribblesAttempedAT, 75);
    run_achievement_all_time(dribblesAttempedAT, 100);
    run_achievement_all_time(dribblesAttempedAT, 150);
    run_achievement_highscore(failedDribblesHighscore, 2);
    run_achievement_highscore(failedDribblesHighscore, 4);
    run_achievement_highscore(failedDribblesHighscore, 6);
    run_achievement_highscore(failedDribblesHighscore, 8);
    run_achievement_highscore(failedDribblesHighscore, 10);
    run_achievement_highscore(failedDribblesHighscore, 12);
    run_achievement_all_time(failedDribblesAT, 15);
    run_achievement_all_time(failedDribblesAT, 30);
    run_achievement_all_time(failedDribblesAT, 45);
    run_achievement_all_time(failedDribblesAT, 60);
    run_achievement_all_time(failedDribblesAT, 75);
    run_achievement_all_time(failedDribblesAT, 90);

    run_achievement_highscore(assistsHighscore, 1);
    run_achievement_highscore(assistsHighscore, 2);
    run_achievement_highscore(assistsHighscore, 3);
    run_achievement_all_time(assistsAT, 3);
    run_achievement_all_time(assistsAT, 6);
    run_achievement_all_time(assistsAT, 10);
    run_achievement_all_time(assistsAT, 15);
    run_achievement_all_time(assistsAT, 20);

}

function run_achievement_highscore(stat, amount) {
    let statProportion = stat / amount;

    let innerProgressBar = document.getElementById(`achievement_${achievementNumber}_progressbar_inner`);
    let outerProgressBar = document.getElementById(`achievement_${achievementNumber}_progressbar_outer`);
    let achievement = document.getElementById(`achievement_${achievementNumber}`);
    let points = document.getElementById(`achievement_${achievementNumber}_points`);

    if (stat >= amount) {
        if (innerProgressBar !== null && innerProgressBar.parentNode !== null) {
            innerProgressBar.remove();
            outerProgressBar.remove();
            achievement.style.background = "#daa520";
            points.style.color = "white";

            // Extract the numerical value using regular expressions
            totalPoints = totalPoints + parseInt(points.innerText.match(/\d+/)[0]);
        }
    }

    if (innerProgressBar !== null && innerProgressBar.parentNode !== null) {
        innerProgressBar.style.width = statProportion * 100 + "%";
        innerProgressBar.style.fontSize = 1.7 + "vmin";
        innerProgressBar.style.textAlign = "end";
        innerProgressBar.style.paddingRight = "1vw";
        innerProgressBar.textContent = (statProportion * 100).toFixed(0) + "%";
    }

    achievementNumber = achievementNumber + 1;
}

function run_achievement_all_time(stat, amount) {
    let statProportion = stat / amount;

    let innerProgressBar = document.getElementById(`achievement_${achievementNumber}_progressbar_inner`);
    let outerProgressBar = document.getElementById(`achievement_${achievementNumber}_progressbar_outer`);
    let achievement = document.getElementById(`achievement_${achievementNumber}`);
    let points = document.getElementById(`achievement_${achievementNumber}_points`);

    if (statProportion >= 1) {
        if (innerProgressBar !== null && innerProgressBar.parentNode !== null) {
            innerProgressBar.remove();
            outerProgressBar.remove();
            achievement.style.background = "#daa520";
            points.style.color = "white";

            // Extract the numerical value using regular expressions
            totalPoints = totalPoints + parseInt(points.innerText.match(/\d+/)[0]);
        }
    }

    if (innerProgressBar !== null && innerProgressBar.parentNode !== null) {
        innerProgressBar.style.width = statProportion * 100 + "%";
        innerProgressBar.style.fontSize = 1.7 + "vw";
        innerProgressBar.style.textAlign = "end";
        innerProgressBar.style.paddingRight = "1vw";
        innerProgressBar.textContent = (statProportion * 100).toFixed(0) + "%";
    }

    achievementNumber = achievementNumber + 1;
}

function run_achievement_100_accuracy(stat1, stat2, amount) {
    let innerProgressBar = document.getElementById(`achievement_${achievementNumber}_progressbar_inner`);
    let outerProgressBar = document.getElementById(`achievement_${achievementNumber}_progressbar_outer`);
    let achievement = document.getElementById(`achievement_${achievementNumber}`);
    let points = document.getElementById(`achievement_${achievementNumber}_points`);

    if (stat1 >= amount && stat2 == 100) {
        if (innerProgressBar !== null && innerProgressBar.parentNode !== null) {
            innerProgressBar.remove();
            outerProgressBar.remove();
            achievement.style.background = "#daa520";
            points.style.color = "white";

            // Extract the numerical value using regular expressions
            totalPoints = totalPoints + parseInt(points.innerText.match(/\d+/)[0]);
        }
    }

    if (innerProgressBar !== null && innerProgressBar.parentNode !== null) {
        innerProgressBar.style.width = 0 + "%";
    }

    achievementNumber = achievementNumber + 1;
}

function initialize_levels() {
    let userLevel = document.getElementById("user_level");
    let userPoints = document.getElementById("user_points");
    let userTitle = document.getElementById("user_title");

    for (let i = 0; i < thresholds.length; i++) {
        if (totalPoints >= thresholds[i]) {
            level++;
        }
    }

    userLevel.textContent = `Level: ${level}`;
    userPoints.textContent = `Points: ${totalPoints} / ${thresholds[level]}`;
    userTitle.textContent = `Title: ${thresholdTitles[level]}`;
}

function showNextNotification(level) {
    Swal.fire({
      title: `Congratulations! You've reached level ${level}`,
      text: `You are now ${thresholdTitles[level]}`,
      icon: 'success',
      timer: 20000,  // Automatically close the notification after 20 seconds
      showConfirmButton: true,
    });
}

function run_levels() {
    let userLevel = document.getElementById("user_level");
    let userPoints = document.getElementById("user_points");
    let userTitle = document.getElementById("user_title");

    while (totalPoints < thresholds[level - 1]) {
        level = level - 1;
    }

    for (let i = level; i <= thresholds.length; i++) {
        if (totalPoints >= thresholds[i] && totalPoints >= 100) {
            level++;
            showNextNotification(level);
        }
    }

    userLevel.textContent = `Level: ${level}`;
    userPoints.textContent = `Points: ${totalPoints} / ${thresholds[level]}`;
    userTitle.textContent = `Title: ${thresholdTitles[level]}`;
}

function reedem_prize(prizeNumber) {
    let prize = document.getElementById(`prize_${prizeNumber}`);
    let prizeBtn = document.getElementById(`prize_${prizeNumber}_button`);
    let prizeCost = Number(document.getElementById(`prize_${prizeNumber}_cost`).getAttribute("value"));
    
    let pointsRedeemedAT = Number(window.localStorage.getItem("pointsRedeemedAT"));
    let redeemedArr = JSON.parse(window.localStorage.getItem("redeemedArr"));

    // && !(redeemedArr.includes(prizeCost)) should be prize id?

    if (prizeBtn.textContent == "Redeem") {
        if (totalPoints >= prizeCost) {
            totalPoints = totalPoints - prizeCost;
            pointsRedeemedAT = pointsRedeemedAT - prizeCost;

            window.localStorage.setItem("pointsRedeemedAT", pointsRedeemedAT);

            Swal.fire({
                title: `Congratulations on your purchase!`,
                text: `You have ${totalPoints} points remaining`,
                icon: 'success',
                timer: 10000,
                showConfirmButton: true,
            });

            // call function to allocate selector options if the prize bought is a clothing, is redeemable, and is within the budget
            if (prize.getAttribute("value") == "clothing") {
                allocate_redeemed_clothing(prizeNumber);
            }

            prize.style.background = "#daa520";
            prize.style.color = "white";
            prizeBtn.textContent = "Redeemed"
            prizeBtn.style.backgroundColor = "white";

            redeemedArr.push(prizeNumber);
        }
        else {
            Swal.fire({
                title: `Not enough points`,
                text: `You only have ${totalPoints} out of the ${prizeCost} points needed`,
                icon: 'error',
                timer: 10000,
                showConfirmButton: true,
            });
        }
    }
    else if (prize.getAttribute("value") !== "clothing") {
        prize.style.background = "white";
        prize.style.color = "black";
        prizeBtn.textContent = "Redeem"
        prizeBtn.style.backgroundColor = "#52b788";

        redeemedArr = redeemedArr.filter(element => element !== prizeNumber);
    }

    window.localStorage.setItem("redeemedArr", JSON.stringify(redeemedArr));

    run_levels();
}

function set_redeemed() {
    let redeemedArr = JSON.parse(window.localStorage.getItem("redeemedArr"));

    for (let i = 0; i < redeemedArr.length; i++) {
        let prizeNumber = redeemedArr[i];
        let prize = document.getElementById(`prize_${prizeNumber}`);
        let prizeBtn = document.getElementById(`prize_${prizeNumber}_button`);

        prize.style.background = "#daa520";
        prize.style.color = "white";
        prizeBtn.textContent = "Redeemed"
        prizeBtn.style.backgroundColor = "white";
    }
}

function add_mr_to_points() {
    let matchRatingPointsAT = Number(window.localStorage.getItem("matchRatingPointsAT"));

    totalPoints = totalPoints + (Math.round(lastgameStats.lastgameStat2) - 6) * 20;
    matchRatingPointsAT = matchRatingPointsAT + ((Math.round(lastgameStats.lastgameStat2) - 6) * 20);

    Swal.fire({
        title: `You scored a match rating of ${lastgameStats.lastgameStat2.toFixed(2)}`,
        text: `This has awarded you ${(Math.round(lastgameStats.lastgameStat2) - 6) * 20} points`,
        imageUrl: "images/match_rating_icon.png",
        imageWidth: 300,
        imageHeight: 300,
        timer: 10000,
        showConfirmButton: true,
      });

    window.localStorage.setItem("matchRatingPointsAT", matchRatingPointsAT);
}





/**************************************************************************
********************************** PROFILE ********************************
***************************************************************************/

let clothing_arr;
let jerseySelect = document.querySelector("#jersey_select");
let shortsSelect = document.querySelector("#shorts_select");
let shoesSelect = document.querySelector("#shoes_select");
let badgeSelect = document.querySelector("#badge_select");

// called when the page reloads, assigns default values to selectors if they are not already declared
// calls display_selectors which appends childs to the selector corresponding selector classes based on the appearal avaliable
function initialize_clothing_arr() {
    let default_arr = window.localStorage.getItem("default_arr");
    let argentina_arr = window.localStorage.getItem("argentina_arr");
    let brazil_arr = window.localStorage.getItem("brazil_arr");
    let france_arr = window.localStorage.getItem("france_arr");

    let run = true;

    if (!default_arr) {
        window.localStorage.setItem("default_arr", JSON.stringify(["jersey", "shorts", "shoes", "badge"]));
        run = false;
    }
    if (!argentina_arr) {
        window.localStorage.setItem("argentina_arr", JSON.stringify([null, null, null, null]));
    }
    if (!brazil_arr) {
        window.localStorage.setItem("brazil_arr", JSON.stringify([null, null, null, null]));
    }
    if (!france_arr) {
        window.localStorage.setItem("france_arr", JSON.stringify([null, null, null, null]));
    }

    default_arr = window.localStorage.getItem("default_arr");
    argentina_arr = window.localStorage.getItem("argentina_arr");
    brazil_arr = window.localStorage.getItem("brazil_arr");
    france_arr = window.localStorage.getItem("france_arr");

    clothing_arr = [JSON.parse(default_arr), JSON.parse(argentina_arr), JSON.parse(brazil_arr), JSON.parse(france_arr)];

    if (run) {
        display_selectors();
    }

    // calls function to intialize the selector values and images to what they were previously left as
    initialize_selectors();
}

// called from redeem prize function, runs whenever an item is purchased that is of type clothing, had not already redeemed once before, and is purchasable
function allocate_redeemed_clothing(prizeNumber) {
    if (prizeNumber >= 2 && prizeNumber <= 5) {
        // set the value of corresponding item in the given clothing arr to the clothing item purchased ('jersey', 'shorts', 'shoes', 'badge'), to signify the user has that item
        clothing_arr[1][prizeNumber - 2] = clothing_arr[0][prizeNumber - 2];

        window.localStorage.setItem("argentina_arr", JSON.stringify(clothing_arr[1]));
    }
    else if (prizeNumber >= 6  && prizeNumber <= 9) {
        clothing_arr[2][prizeNumber - 6] = clothing_arr[0][prizeNumber - 6];

        window.localStorage.setItem("brazil_arr", JSON.stringify(clothing_arr[2]));
    }
    else if (prizeNumber >= 10  && prizeNumber <= 13) {
        clothing_arr[3][prizeNumber - 10] = clothing_arr[0][prizeNumber - 10];

        window.localStorage.setItem("france_arr", JSON.stringify(clothing_arr[3]));
    }
    
    display_selectors();
}

// called when window is initialized and whenever a new clothing is purchased
// allocates child elements to the correct selectors based on what has been purchased
function display_selectors() {
    jerseySelect.innerHTML = "";
    shortsSelect.innerHTML = "";
    shoesSelect.innerHTML = "";
    badgeSelect.innerHTML = "";

    let clothingNamesArr = ["Default", "Argentina", "Brazil", "France"];

    for (let i = 0; i < clothing_arr.length; i++) {
        for (let j = 0; j < clothing_arr[i].length; j++)
        {
            if(clothing_arr[i][j] !== null) {
                let newOption = document.createElement("option");

                if (j == 0) {
                    newOption.text = clothingNamesArr[i];

                    jerseySelect.appendChild(newOption);
                }
                else if (j == 1) {
                    newOption.text = clothingNamesArr[i];

                    shortsSelect.appendChild(newOption);
                }
                else if (j == 2) {
                    newOption.text = clothingNamesArr[i];

                    shoesSelect.appendChild(newOption);
                }
                else if (j == 3) {
                    newOption.text = clothingNamesArr[i];

                    badgeSelect.appendChild(newOption);
                }
            }
        }
    }
}

// intializes the selector values and images to what they were previously left as
function initialize_selectors() {
    let selector_arr = window.localStorage.getItem("selector_arr");

    if (!selector_arr) {
        window.localStorage.setItem("selector_arr", JSON.stringify(["default", "default", "default", "default"]));
    }
    else {
        selector_arr = JSON.parse(selector_arr);

        // get the type of item by its id (e.g. jersey)
        let jerseyID = jerseySelect.id.split("_")[0];
        let shortsID = shortsSelect.id.split("_")[0];
        let shoesID = shoesSelect.id.split("_")[0];
        let badgeID = badgeSelect.id.split("_")[0];

        // get the name of the type of item (e.g. Default -> default)
        let jerseyName = selector_arr[0];
        let shortsName = selector_arr[1];
        let shoesName = selector_arr[2];
        let badgeName = selector_arr[3];

        // set corresponding images
        document.querySelector(`#${jerseyID}_image`).src = `images/${jerseyName}_${jerseyID}.png`;
        document.querySelector(`#${shortsID}_image`).src = `images/${shortsName}_${shortsID}.png`;
        document.querySelector(`#${shoesID}_image`).src = `images/${shoesName}_${shoesID}.png`;
        document.querySelector(`#${badgeID}_image`).src = `images/${badgeName}_${badgeID}.png`;

        // get corresponding selectors
        let jerseyOptions = jerseySelect.getElementsByTagName("option");
        let shortsOptions = shortsSelect.getElementsByTagName("option");
        let shoesOptions = shoesSelect.getElementsByTagName("option");
        let badgeOptions = badgeSelect.getElementsByTagName("option");

        // call function to set them
        set_selectors(jerseyOptions, jerseyName);
        set_selectors(shortsOptions, shortsName);
        set_selectors(shoesOptions, shoesName);
        set_selectors(badgeOptions, badgeName);
    }
}

function set_selectors(options, name) {
    for (let i = 0; i < options.length; i++) {
        let optionText = options[i].textContent.toLowerCase();

        if (optionText == name) {
            options[i].selected = true;
        }
    }
}

// call alternate_gear whenever a selector is changed
jerseySelect.addEventListener("change", function() {
  alternate_gear(jerseySelect);
});
shortsSelect.addEventListener("change", function() {
  alternate_gear(shortsSelect);
});
shoesSelect.addEventListener("change", function() {
  alternate_gear(shoesSelect);
});
badgeSelect.addEventListener("change", function() {
  alternate_gear(badgeSelect);
});

// called whenever selector changes, alternates the photo displayed depending on the selector
function alternate_gear(selector) {
    let selector_arr = JSON.parse(window.localStorage.getItem("selector_arr"));

    // get the type of item by its id (e.g. jersey_select)
    let type = selector.id;
    type = type.split("_")[0];

    // get the name of the type of item (e.g. Default -> default)
    let selectedText = selector.value.toLowerCase();

    // set corresponding image
    let img = document.querySelector(`#${type}_image`);
    img.src = `images/${selectedText}_${type}.png`;

    // when selector is changed, update the selector array and store it back in memory
    let num = Number(selector.getAttribute("num"));
    selector_arr[num] = selectedText;
    window.localStorage.setItem("selector_arr", JSON.stringify(selector_arr));
}