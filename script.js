let height = document.getElementById("height")
let weight = document.getElementById("weight")
let chest = document.getElementById("chest")
let waist = document.getElementById("waist")
let hips = document.getElementById("hips")
let shoulders = document.getElementById("shoulders")
let tones = document.querySelectorAll('.tone')
let genderBtns = document.querySelectorAll('.gender-btn')
let topFitBtns = document.querySelectorAll('.t-opt')
let topFitColorBtns = document.querySelectorAll('.t-c-opt')
let bottomFitBtns = document.querySelectorAll('.b-opt')
let bottomFitColorBtns = document.querySelectorAll('.b-c-opt')
let occasionOptions = document.querySelectorAll('#occasionOptions li')
let occasionLabel = document.getElementById('occasionLabel')

let userData = {
    gender: null,
    height: 170,
    weight: 70,
    chest: 96,
    waist: 82,
    hips: 96,
    shoulders: 46,
    skinTone: null,
    occasion: null,
    outfits: []
}

height.addEventListener("input", () => {
    document.getElementById("height-value").innerText = `${height.value} cm`
    userData.height = height.value
    drawAvatar()
    detectBodyType()
})
weight.addEventListener("input", () => {
    document.getElementById("weight-value").innerText = `${weight.value} kg`
    userData.weight = weight.value
    drawAvatar()
    detectBodyType()
})
chest.addEventListener("input", () => {
    document.getElementById("chest-value").innerText = `${chest.value} cm`
    userData.chest = chest.value
    drawAvatar()
    detectBodyType()
})
waist.addEventListener("input", () => {
    document.getElementById("waist-value").innerText = `${waist.value} cm`
    userData.waist = waist.value
    drawAvatar()
    detectBodyType()

})
hips.addEventListener("input", () => {
    document.getElementById("hips-value").innerText = `${hips.value} cm`
    userData.hips = hips.value
    drawAvatar()
    detectBodyType()
})
shoulders.addEventListener("input", () => {
    document.getElementById("shoulders-value").innerText = `${shoulders.value} cm`
    userData.shoulders = shoulders.value
    drawAvatar()
    detectBodyType()
})

let selectedSkinTone = "#f5cba7"

tones.forEach(btn => {
    btn.addEventListener("click", () => {
        tones.forEach(b => b.classList.remove("selected"))
        btn.classList.add("selected")

        userData.skinTone = btn.dataset.tone
        selectedSkinTone = btn.dataset.tone
        drawAvatar()
    })
})

genderBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        genderBtns.forEach(b => b.classList.remove("selected"))
        btn.classList.add("selected")

        userData.gender = btn.dataset.gender
        console.log(userData.gender)
    })
})

const canvas = document.getElementById("avatarCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 300
canvas.height = 430

function drawAvatar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //INITIAL MODEL

    // let bodyHeight = height.value * 1.2
    // let shoulderWidth = shoulders.value * 2
    // let waistWidth = waist.value * 1.8
    // let chestWidth = chest.value * 2

    // bodyHeight *= 0.5
    // shoulderWidth *= 0.8
    // waistWidth *= 0.8
    // chestWidth *= 0.8

    // const centerX = canvas.width / 2

    // ctx.fillStyle = "#2a1633"

    // ctx.beginPath()
    // ctx.arc(centerX, 40, 20, 0, Math.PI * 2)
    // ctx.fill()

    // ctx.fillRect(centerX - chestWidth / 2, 60, chestWidth, bodyHeight / 3)

    // ctx.fillRect(centerX - waistWidth / 2, 60 + bodyHeight / 3, waistWidth, bodyHeight / 3)

    // ctx.fillRect(centerX - 20, 60 + (bodyHeight / 3) * 2, 15, bodyHeight / 3)
    // ctx.fillRect(centerX + 5, 60 + (bodyHeight / 3) * 2, 15, bodyHeight / 3)

    // ctx.fillRect(centerX - shoulderWidth / 2, 55, shoulderWidth, 10)

    const maxCanvasHeight = canvas.height - 80;
    const baseHeight = 260;
    const heightRatio = height.value / 170;
    let bodyHeight = baseHeight * heightRatio;

    if (bodyHeight > maxCanvasHeight) {
        bodyHeight = maxCanvasHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const topY = 40

    const heightScale = height.value / 170
    const baseBodyHeight = 260 * heightScale

    const chestWidth = chest.value * 1.2
    const waistWidth = waist.value * 1.1
    const shoulderWidth = shoulders.value * 1.4

    ctx.beginPath()
    ctx.arc(centerX, topY, 25, 0, Math.PI * 2)
    ctx.fillStyle = selectedSkinTone
    ctx.fill()
    ctx.strokeStyle = "#2a1633";
    ctx.lineWidth = 2;
    ctx.stroke();

    const neckY = topY + 25
    const torsoTop = neckY + 10
    const torsoBottom = torsoTop + baseBodyHeight * 0.45
    const hipY = torsoBottom
    const legBottom = hipY + baseBodyHeight * 0.55

    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(centerX - shoulderWidth / 2, torsoTop)
    ctx.lineTo(centerX + shoulderWidth / 2, torsoTop)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX - shoulderWidth / 2, torsoTop)
    ctx.lineTo(centerX + shoulderWidth / 2, torsoTop)
    ctx.lineTo(centerX + waistWidth / 2, torsoBottom)
    ctx.lineTo(centerX - waistWidth / 2, torsoBottom)
    ctx.closePath()
    ctx.strokeStyle = "#2a1633";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fill()

    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(centerX - shoulderWidth / 2, torsoTop)
    ctx.lineTo(centerX - shoulderWidth / 2 - 40, torsoTop + 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX + shoulderWidth / 2, torsoTop)
    ctx.lineTo(centerX + shoulderWidth / 2 + 40, torsoTop + 80)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX - 20, hipY)
    ctx.lineTo(centerX - 20, legBottom)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX + 20, hipY)
    ctx.lineTo(centerX + 20, legBottom)
    ctx.stroke()
}

drawAvatar()

function detectBodyType() {
    let c = parseInt(chest.value)
    let w = parseInt(waist.value)
    let h = parseInt(hips.value)
    let s = parseInt(shoulders.value)

    let bodyType = ""

    if (Math.abs(c - w) < 10 && Math.abs(c - h) < 10) {
        bodyType = "Rectangle";
    }

    else if ((c > h + 12) || (s > h + 12)) {
        bodyType = "Inverted Triangle";
    }

    else if (h > c + 12) {
        bodyType = "Triangle";
    }

    else if (w > c && w > h) {
        bodyType = "Oval";
    }

    else {
        bodyType = "Balanced";
    }

    document.getElementById("bodyTypeText").innerText = "Body type: " + bodyType;
    return bodyType
}

detectBodyType()

// let outfit = {
//     top: null,
//     bottom: null,
//     occassion: null
// }

topFitBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        topFitBtns.forEach(b => b.classList.remove("selected"))
        btn.classList.add("selected")

        userData.outfits[0] = btn.dataset.type
        // console.log(userData)
    })
})

topFitColorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        topFitColorBtns.forEach(b => b.classList.remove("selected"))
        btn.classList.add("selected")

        userData.outfits[1] = btn.dataset.topcolor
        // console.log(userData)
    })
})

bottomFitBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        bottomFitBtns.forEach(b => b.classList.remove("selected"))
        btn.classList.add("selected")

        userData.outfits[2] = btn.dataset.type
        // console.log(userData)
    })
})

bottomFitColorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        bottomFitColorBtns.forEach(b => b.classList.remove("selected"))
        btn.classList.add("selected")

        userData.outfits[3] = btn.dataset.bottomcolor
        // console.log(userData)
    })
})

occasionOptions.forEach(option => {
    option.addEventListener("click", () => {
        occasionOptions.forEach(o => o.classList.remove("selected"))
        option.classList.add("selected")

        const value = option.dataset.value
        userData.occasion = value
        occasionLabel.innerText = option.innerText
        console.log("Occasion:", value)
    })
})

let addOutfitBtn = document.getElementById("addOutfitBtn")
let wardrobe = document.getElementById("wardrobePreview")

function normalizeToken(value) {
    return String(value ?? "").trim().toLowerCase()
}

function analyzeOutfit() {
    const topType = normalizeToken(userData.outfits[0])
    const topColor = normalizeToken(userData.outfits[1])
    const bottomType = normalizeToken(userData.outfits[2])
    const bottomColor = normalizeToken(userData.outfits[3])
    const occasion = normalizeToken(userData.occasion)

    const missing = []
    if (!topType) missing.push("top type")
    if (!topColor) missing.push("top color")
    if (!bottomType) missing.push("bottom type")
    if (!bottomColor) missing.push("bottom color")
    if (!occasion) missing.push("occasion")

    if (missing.length) {
        return {
            score: 0,
            label: "Incomplete",
            reasons: [`Select: ${missing.join(", ")}.`],
            bodyType: detectBodyType()
        }
    }

    const bodyType = detectBodyType()
    const reasons = []
    let score = 60

    const neutrals = new Set(["black", "white", "grey", "gray", "beige"])
    const isNeutralTop = neutrals.has(topColor)
    const isNeutralBottom = neutrals.has(bottomColor)
    const sameColor = topColor === bottomColor

    if (isNeutralTop || isNeutralBottom) {
        score += 10
        reasons.push("Neutral + color pairing is usually easy to pull off.")
    }
    if (sameColor) {
        score += 5
        reasons.push("Monochrome outfits look cleaner and taller.")
    } else if (!isNeutralTop && !isNeutralBottom) {
        score -= 5
        reasons.push("Two strong colors can clash—keep one piece neutral.")
    }

    const formalTops = new Set(["shirt", "blazer"])
    const formalBottoms = new Set(["trousers", "formal pants"])
    const casualTops = new Set(["t-shirt", "tshirt", "hoodie", "shirt"])
    const casualBottoms = new Set(["jeans", "shorts", "trousers"])

    if (occasion === "formal") {
        if (formalTops.has(topType)) score += 10
        else { score -= 12; reasons.push("Formal usually needs a shirt or blazer.") }

        if (formalBottoms.has(bottomType)) score += 10
        else { score -= 12; reasons.push("Formal usually needs trousers/formal pants.") }

        if (topColor === "red") { score -= 6; reasons.push("Red can feel loud for formal—black/white/blue works better.") }
    }

    if (occasion === "casual") {
        if (casualTops.has(topType)) score += 8
        if (casualBottoms.has(bottomType)) score += 8
    }

    if (occasion === "party") {
        if (topColor === "red" || topType === "blazer") { score += 8; reasons.push("Party looks can handle bolder tops.") }
        if (sameColor && isNeutralTop) { score -= 4; reasons.push("All-neutral monochrome can look plain for party—add a pop color.") }
    }

    if (occasion === "date") {
        if (topColor === "red") { score += 5; reasons.push("Red is a confident date color (when balanced).") }
        if (!isNeutralBottom && !isNeutralTop) { score -= 4; reasons.push("For date, one neutral piece usually looks sharper.") }
    }

    if (bodyType === "Triangle") {
        if (topColor === "white" || topColor === "blue" || topType === "blazer") {
            score += 6
            reasons.push("Lighter/structured tops help balance a Triangle shape.")
        }
        if (!isNeutralBottom && bottomColor === "beige") {
            score += 2
        }
    } else if (bodyType === "Inverted Triangle") {
        if (isNeutralTop && !isNeutralBottom) {
            score += 6
            reasons.push("Keeping the top simpler and bottom stronger balances shoulders.")
        }
        if (topType === "hoodie") {
            score -= 4
            reasons.push("Bulkier tops can exaggerate shoulders on an Inverted Triangle.")
        }
    } else if (bodyType === "Oval") {
        if (sameColor) {
            score += 6
            reasons.push("Monochrome reduces visual breaks and looks streamlined.")
        }
        if (topType === "blazer") {
            score += 6
            reasons.push("A blazer adds structure and clean lines.")
        }
    } else if (bodyType === "Rectangle") {
        if (!sameColor) {
            score += 4
            reasons.push("Some contrast can add shape/definition on a Rectangle.")
        }
    }

    score = Math.max(0, Math.min(100, Math.round(score)))
    const label =
        score >= 85 ? "Excellent" :
            score >= 70 ? "Good" :
                score >= 50 ? "Okay" : "Needs work"

    return { score, label, reasons, bodyType }
}

// addOutfitBtn.addEventListener("click", () => {
//     wardrobe.innerHTML = `
//         <ul class="items>
//             <li>${userData.outfits[0]} of color ${userData.outfits[1]}</li>
//             <li>${userData.outfits[2]} of color ${userData.outfits[3]}</li>
//         </ul>
//     `
// })

function updateFit() {
    const analysis = analyzeOutfit()
    const reasonsHtml = analysis.reasons.map(r => `<li>${r}</li>`).join("")

    wardrobe.innerHTML = `
    <div>
        <ul class="items">
            <li>${userData.outfits[1]} color ${userData.outfits[0]}.</li>
            <li>${userData.outfits[3]} color ${userData.outfits[2]}.</li>
            <li>Occasion: ${userData.occasion}</li>
            <li>Body type: ${analysis.bodyType}</li>
        </ul>
        <div class="outfit-score">
            <div class="score-badge">${analysis.score}/100 · ${analysis.label}</div>
            <ul class="score-reasons">
                ${reasonsHtml}
            </ul>
        </div>
    </div>
    `;

    // alert(userData.outfits)

    console.log(userData.outfits[0])
    console.log(userData.outfits[1])
    console.log(userData.outfits[2])
    console.log(userData.outfits[3])
}