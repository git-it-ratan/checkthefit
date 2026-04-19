let height = document.getElementById("height")
let weight = document.getElementById("weight")
let chest = document.getElementById("chest")
let waist = document.getElementById("waist")
let hips = document.getElementById("hips")
let shoulders = document.getElementById("shoulders")
let tones = document.querySelectorAll('.tone')
let genderBtns = document.querySelectorAll('.gender-btn')
let topFitColorBtns = document.querySelectorAll('.t-c-opt')
let bottomFitColorBtns = document.querySelectorAll('.b-c-opt')
let occasionOptions = document.querySelectorAll('#occasionOptions li')
let occasionLabel = document.getElementById('occasionLabel')

let topOptionsEl = document.getElementById("topOptions")
let bottomOptionsEl = document.getElementById("bottomOptions")
let wardrobeHeadingEl = document.getElementById("wardrobeHeading")

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

const wardrobeByGender = {
    male: {
        tops: ["Shirt", "T-Shirt", "Hoodie", "Blazer", "Sweater"],
        bottoms: ["Jeans", "Trousers", "Shorts"]
    },
    female: {
        tops: ["Top", "T-Shirt", "Kurti", "Blouse", "Hoodie"],
        bottoms: ["Jeans", "Trousers", "Skirt", "Leggings"]
    },
    unisex: {
        tops: ["T-Shirt", "Hoodie", "Sweater"],
        bottoms: ["Jeans", "Trousers"]
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)
});

document.fonts.ready.then(() => {
    let titleSplit = SplitText.create(".brand-name", {
        type: "chars",
    })
    let tagSplit = SplitText.create(".tag-at-home", {
        type: "chars",
    })
    let descSplit = SplitText.create(".desc", {
        type: "words",
        wordsClass: "word++"
    })
    gsap.from(titleSplit.chars, {
        x: -100,
        scale: 0,
        delay: 0.2,
        opacity: 0,
        stagger: 0.04,
    })

    gsap.from(tagSplit.chars, {
        x: 100,
        scale: 0,
        delay: 1,
        opacity: 0,
        stagger: 0.04,
    })

    gsap.from(descSplit.words, {
        scrollTrigger: {
            trigger: ".desc",
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            // end: "top 10%",
            toggleActions: "play none none reverse"
        },
        // y: -100,
        delay: 0.2,
        opacity: 0.2,
        stagger: 0.1,
    })
})

gsap.from(".feature", {
    scrollTrigger: {
        trigger: ".features-set",
        start: "top 80%",
        toggleActions: "play none none reverse"
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.2)"
});

gsap.utils.toArray(".heading").forEach((heading) => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

gsap.utils.toArray(".tag").forEach((tag) => {
    gsap.from(tag, {
        scrollTrigger: {
            trigger: tag,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out"
    });
});


function renderWardrobeOptions(gender) {
    const key = wardrobeByGender[gender] ? gender : "unisex"
    const config = wardrobeByGender[key]

    topOptionsEl.innerHTML = config.tops
        .map(t => `<button class="t-opt" data-type="${t}">${t}</button>`)
        .join("")

    bottomOptionsEl.innerHTML = config.bottoms
        .map(b => `<button class="b-opt" data-type="${b}">${b}</button>`)
        .join("")

    // Reset selections when wardrobe changes
    userData.outfits[0] = null
    userData.outfits[2] = null
}

function updateWardrobeHeading() {
    if (!wardrobeHeadingEl) return
    if (!userData.gender) {
        wardrobeHeadingEl.innerText = "Please select your gender"
    } else {
        wardrobeHeadingEl.innerText = "Select Outfit"
    }
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

        renderWardrobeOptions(userData.gender)
        updateWardrobeHeading()
    })
})

const canvas = document.getElementById("avatarCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 300
canvas.height = 430

function drawAvatar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxCanvasHeight = canvas.height - 40;
    const baseHeight = 260;
    const heightRatio = height.value / 170;
    let bodyHeight = baseHeight * heightRatio;

    if (bodyHeight > maxCanvasHeight) {
        bodyHeight = maxCanvasHeight;
    }

    const centerX = canvas.width / 2;
    const topY = 40;

    // Width calculations based on circumferences / breadth
    // Using an anatomical scale factor for visual proportionality
    const widthScale = 2.2;
    const shoulderW = shoulders.value * widthScale;
    const chestW = (chest.value / Math.PI) * widthScale * 1.3;
    const waistW = (waist.value / Math.PI) * widthScale * 1.3;
    const hipW = (hips.value / Math.PI) * widthScale * 1.4;

    // Y coordinates
    const headRadius = 20 + (weight.value / 150) * 5; 
    const neckBaseY = topY + headRadius + 2;
    const shoulderY = neckBaseY + 15;
    const torsoBottom = shoulderY + bodyHeight * 0.45;
    const chestY = shoulderY + (torsoBottom - shoulderY) * 0.25;
    const waistY = shoulderY + (torsoBottom - shoulderY) * 0.65;
    const hipY = torsoBottom;
    const legBottom = hipY + bodyHeight * 0.55;

    // Helper to draw elegant organic curves
    function smoothCurve(context, startX, startY, endX, endY) {
        const cp1Y = startY + (endY - startY) / 3;
        const cp2Y = endY - (endY - startY) / 3;
        context.bezierCurveTo(startX, cp1Y, endX, cp2Y, endX, endY);
    }

    // --- Draw Arms ---
    const armWidth = 12 + (weight.value / 150) * 12;
    ctx.lineWidth = armWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = selectedSkinTone;
    
    const armLength = bodyHeight * 0.42;
    
    ctx.beginPath();
    ctx.moveTo(centerX + shoulderW / 2 - 5, shoulderY + 5);
    ctx.lineTo(centerX + shoulderW / 2 + 25, shoulderY + armLength);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - shoulderW / 2 + 5, shoulderY + 5);
    ctx.lineTo(centerX - shoulderW / 2 - 25, shoulderY + armLength);
    ctx.stroke();

    // --- Draw Legs ---
    const legWidth = 16 + (weight.value / 150) * 16;
    ctx.lineWidth = legWidth;
    
    ctx.beginPath();
    ctx.moveTo(centerX + hipW * 0.25, hipY - 10);
    ctx.lineTo(centerX + hipW * 0.25, legBottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - hipW * 0.25, hipY - 10);
    ctx.lineTo(centerX - hipW * 0.25, legBottom);
    ctx.stroke();

    // --- Draw Neck ---
    ctx.fillStyle = selectedSkinTone;
    ctx.fillRect(centerX - 10, neckBaseY - 15, 20, 20);

    // --- Draw Torso Silhouette ---
    ctx.beginPath();
    ctx.moveTo(centerX, neckBaseY);
    ctx.lineTo(centerX + 12, neckBaseY);
    // Right Shoulder
    ctx.quadraticCurveTo(centerX + shoulderW / 2, neckBaseY, centerX + shoulderW / 2, shoulderY);
    // Right Side
    smoothCurve(ctx, centerX + shoulderW / 2, shoulderY, centerX + chestW / 2, chestY);
    smoothCurve(ctx, centerX + chestW / 2, chestY, centerX + waistW / 2, waistY);
    smoothCurve(ctx, centerX + waistW / 2, waistY, centerX + hipW / 2, hipY);
    
    // Bottom curve
    ctx.quadraticCurveTo(centerX, hipY + 15, centerX - hipW / 2, hipY);
    
    // Left Side (moving upwards)
    smoothCurve(ctx, centerX - hipW / 2, hipY, centerX - waistW / 2, waistY);
    smoothCurve(ctx, centerX - waistW / 2, waistY, centerX - chestW / 2, chestY);
    smoothCurve(ctx, centerX - chestW / 2, chestY, centerX - shoulderW / 2, shoulderY);
    
    // Left Shoulder
    ctx.quadraticCurveTo(centerX - shoulderW / 2, neckBaseY, centerX - 12, neckBaseY);
    ctx.closePath();
    ctx.fill();

    // --- Draw Head ---
    ctx.beginPath();
    ctx.arc(centerX, topY, headRadius, 0, Math.PI * 2);
    ctx.fill();
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

// Initial wardrobe buttons (before choosing gender)
renderWardrobeOptions(userData.gender)
updateWardrobeHeading()

// let outfit = {
//     top: null,
//     bottom: null,
//     occassion: null
// }

topOptionsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".t-opt")
    if (!btn) return
    topOptionsEl.querySelectorAll(".t-opt").forEach(b => b.classList.remove("selected"))
    btn.classList.add("selected")
    userData.outfits[0] = btn.dataset.type
})

topFitColorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        topFitColorBtns.forEach(b => b.classList.remove("selected"))
        btn.classList.add("selected")

        userData.outfits[1] = btn.dataset.topcolor
        // console.log(userData)
    })
})

bottomOptionsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".b-opt")
    if (!btn) return
    bottomOptionsEl.querySelectorAll(".b-opt").forEach(b => b.classList.remove("selected"))
    btn.classList.add("selected")
    userData.outfits[2] = btn.dataset.type
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
    const gender = normalizeToken(userData.gender)

    const missing = []
    if (!topType) missing.push("top type")
    if (!topColor) missing.push("top color")
    if (!bottomType) missing.push("bottom type")
    if (!bottomColor) missing.push("bottom color")
    if (!occasion) missing.push("occasion")
    if (!gender) missing.push("gender")

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

    const genderTops = {
        male: new Set(["shirt", "t-shirt", "tshirt", "hoodie", "blazer", "sweater"]),
        female: new Set(["top", "t-shirt", "tshirt", "kurti", "blouse", "hoodie", "blazer", "sweater"])
    }
    const genderBottoms = {
        male: new Set(["jeans", "trousers", "shorts"]),
        female: new Set(["jeans", "trousers", "skirt", "leggings"])
    }

    const topAllowed = genderTops[gender]
    const bottomAllowed = genderBottoms[gender]
    if (!topAllowed?.has(topType)) {
        score -= 25
        reasons.push(`This top doesn't match the selected gender wardrobe.`)
    }
    if (!bottomAllowed?.has(bottomType)) {
        score -= 25
        reasons.push(`This bottom doesn't match the selected gender wardrobe.`)
    }

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

    const formalTopByGender = {
        male: new Set(["shirt", "blazer"]),
        female: new Set(["kurti", "blouse", "blazer", "shirt"])
    }
    const formalBottomByGender = {
        male: new Set(["trousers"]),
        female: new Set(["trousers", "skirt"])
    }
    const casualTopByGender = {
        male: new Set(["t-shirt", "tshirt", "hoodie", "shirt", "sweater"]),
        female: new Set(["top", "t-shirt", "tshirt", "hoodie", "kurti", "sweater"])
    }
    const casualBottomByGender = {
        male: new Set(["jeans", "shorts", "trousers"]),
        female: new Set(["jeans", "leggings", "trousers", "skirt"])
    }
    const partyTopByGender = {
        male: new Set(["blazer", "shirt", "t-shirt", "tshirt"]),
        female: new Set(["blouse", "top", "kurti", "blazer"])
    }
    const partyBottomByGender = {
        male: new Set(["jeans", "trousers"]),
        female: new Set(["skirt", "jeans", "trousers"])
    }
    const dateTopByGender = {
        male: new Set(["shirt", "t-shirt", "tshirt", "blazer", "sweater"]),
        female: new Set(["top", "blouse", "kurti", "t-shirt", "tshirt", "sweater"])
    }
    const dateBottomByGender = {
        male: new Set(["jeans", "trousers"]),
        female: new Set(["jeans", "skirt", "trousers", "leggings"])
    }

    const formalTops = formalTopByGender[gender] ?? new Set()
    const formalBottoms = formalBottomByGender[gender] ?? new Set()
    const casualTops = casualTopByGender[gender] ?? new Set()
    const casualBottoms = casualBottomByGender[gender] ?? new Set()
    const partyTops = partyTopByGender[gender] ?? new Set()
    const partyBottoms = partyBottomByGender[gender] ?? new Set()
    const dateTops = dateTopByGender[gender] ?? new Set()
    const dateBottoms = dateBottomByGender[gender] ?? new Set()

    if (occasion === "formal") {
        if (formalTops.has(topType)) score += 10
        else { score -= 12; reasons.push("Formal outfits usually need a structured top (e.g., shirt/blazer/kurti/blouse).") }

        if (formalBottoms.has(bottomType)) score += 10
        else { score -= 12; reasons.push("Formal outfits usually need trousers (or a skirt for female).") }

        if (topColor === "red") { score -= 6; reasons.push("Red can feel loud for formal—black/white/blue works better.") }
    }

    if (occasion === "casual") {
        if (casualTops.has(topType)) score += 8
        if (casualBottoms.has(bottomType)) score += 8
    }

    if (occasion === "party") {
        if (partyTops.has(topType)) score += 6
        if (partyBottoms.has(bottomType)) score += 6
        if (topColor === "red" || topType === "blazer" || bottomType === "skirt") {
            score += 6
            reasons.push("Party looks can handle bolder pieces.")
        }
        if (sameColor && isNeutralTop) { score -= 4; reasons.push("All-neutral monochrome can look plain for party—add a pop color.") }
    }

    if (occasion === "date") {
        if (dateTops.has(topType)) score += 6
        if (dateBottoms.has(bottomType)) score += 6
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

console.log(userData)