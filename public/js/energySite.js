
import { getUserById, updateEnergy, updateUserUI, videoToEnergy } from "./helperFunctions/userCalls.js"
// account ?? - yes
let user;
const userID = localStorage.getItem("userID")

user = await getUserById(userID)

updateUserUI(user)



const videoBtn = document.querySelector(".js-videoBtn")
videoBtn.addEventListener("click", async()=>{
    const u = await videoToEnergy(userID)
    updateUserUI(u)
})

// back to main menu
const backBtn = document.querySelector(".js-backBtn");
backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
