/* import account */
import {getUserById, updateUserUI} from "./helperFunctions/userCalls.js"
let userID = localStorage.getItem("userID")
if (!userID){
  userID = crypto.randomUUID()
  localStorage.setItem("userID",userID)
}
let user;
user = await getUserById(userID)
localStorage.setItem("user",JSON.stringify(user))
updateUserUI(user)

// linker til energysite
const energyBtn = document.querySelector(".js-energyBtn")
energyBtn.addEventListener("click", ()=>{
   window.location.href = "energySite.html"
})

const localMode = document.querySelector(".js-local-mode");
localMode.addEventListener("click", () => {
  // public gør at den bliver fundet automatisk
  window.location.href = "localGameSelecter.html";
});

//TODO LAV EKSTRA TIC TAC TOE MINIGAME MED MUSIC ATTISTER: CATEGORIER GENRE, AGE, STREAMS, NATIONS
