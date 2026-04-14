export const getUserById = async (id)=>{
    const response = await fetch(`/api/users/user/${id}`)
    
    const user = await response.json()
    localStorage.setItem("user",JSON.stringify(user))
    return user
}


export const updateUserUI = (user)=> {
    const usernameHTML = document.querySelector(".username")
    if (usernameHTML){usernameHTML.textContent = user.username}
    const userCrownsHTML = document.querySelector(".crowns")
    if (userCrownsHTML) {userCrownsHTML.textContent = `👑 ${user.trophies}`} 
    const energyCorner = document.querySelector(".energyBtn")
    if(energyCorner){energyCorner.textContent = `⚡ ${user.energyCount}`}
}


export const  updateEnergy = async (id)=>{
    const response = await fetch(`/api/users/updateEnergy/${id}`, {
        method:"PUT"
    })
    return await response.json()
}

export const spendEnergy = async (id)=>{
   const response =  await fetch(`/api/users/spendEnergy/${id}`, {
        method:"PUT"
    })
    const user = await response.json()
    localStorage.setItem("user",JSON.stringify(user))
    return user
}

export const videoToEnergy = async (id)=>{
    const response =  await fetch(`/api/users/videoEnergy/${id}`, {
        method:"PUT"
    })
    const user = await response.json()
    localStorage.setItem("user",JSON.stringify(user))
    return user
}

export const energyCheck = async (id)=>{
    const user = await updateEnergy(id)
    if (!user.hasInfinityEnergy){
        if (user.energyCount<1){
            const date = new Date(user.lastEnergyUpdate);

            date.setMinutes(date.getMinutes() + 5);

            const time = date.toLocaleTimeString("da-DK", {
                 hour: "2-digit",
                 minute: "2-digit"
                });
            alert(`No Energy Left!!!!\nNew Energy At: ${time}`)
            return (true)
        }
    }
}