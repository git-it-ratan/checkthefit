let height = document.getElementById("height")
let weight = document.getElementById("weight")
let chest = document.getElementById("chest")
let waist = document.getElementById("waist")
let hips = document.getElementById("hips")
let shoulders = document.getElementById("shoulders")
let tones = document.querySelectorAll('.tone')
let genderBtns = document.querySelectorAll('.gender-btn')
let topColorPicker = document.getElementById('topColorPicker')
let topColorPreview = document.getElementById('topColorPreview')
let topColorName = document.getElementById('topColorName')
let bottomColorPicker = document.getElementById('bottomColorPicker')
let bottomColorPreview = document.getElementById('bottomColorPreview')
let bottomColorName = document.getElementById('bottomColorName')
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
        stagger: 0.04
    })
})

// gsap.from(".feature", {
//     scrollTrigger: {
//         trigger: ".features-set",
//         start: "top 80%",
//         toggleActions: "play none none reverse"
//     },
//     y: 100,
//     opacity: 0,
//     duration: 0.8,
//     stagger: 0.2,
//     ease: "back.out(1.2)"
// });

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
    document.getElementById("height-in").innerText = `(${Math.round(height.value / 2.54)} inches)`
    userData.height = height.value
    drawAvatar()
    detectBodyType()
})
chest.addEventListener("input", () => {
    document.getElementById("chest-value").innerText = `${chest.value} cm`
    document.getElementById("chest-in").innerText = `(${Math.round(chest.value / 2.54)} inches)`
    userData.chest = chest.value
    drawAvatar()
    detectBodyType()
})
waist.addEventListener("input", () => {
    document.getElementById("waist-value").innerText = `${waist.value} cm`
    document.getElementById("waist-in").innerText = `(${Math.round(waist.value / 2.54)} inches)`
    userData.waist = waist.value
    drawAvatar()
    detectBodyType()

})
hips.addEventListener("input", () => {
    document.getElementById("hips-value").innerText = `${hips.value} cm`
    document.getElementById("hips-in").innerText = `(${Math.round(hips.value / 2.54)} inches)`
    userData.hips = hips.value
    drawAvatar()
    detectBodyType()
})
shoulders.addEventListener("input", () => {
    document.getElementById("shoulders-value").innerText = `${shoulders.value} cm`
    document.getElementById("shoulders-in").innerText = `(${Math.round(shoulders.value / 2.54)} inches)`
    userData.shoulders = shoulders.value
    drawAvatar()
    detectBodyType()
})

const sizeData = {
    'S': { waist: 26, chest: 32, hips: 34, shoulders: 15 },
    'M': { waist: 28, chest: 34, hips: 36, shoulders: 16 },
    'L': { waist: 30, chest: 36, hips: 38, shoulders: 17 },
    'XL': { waist: 32, chest: 38, hips: 40, shoulders: 18 },
    'XXL': { waist: 34, chest: 40, hips: 42, shoulders: 19 },
    'XXXL': { waist: 36, chest: 42, hips: 44, shoulders: 20 },
};

document.querySelectorAll('.default-sizes button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.default-sizes button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const size = btn.dataset.size;
        const data = sizeData[size];

        chest.value = Math.round(data.chest * 2.54);
        waist.value = Math.round(data.waist * 2.54);
        hips.value = Math.round(data.hips * 2.54);
        shoulders.value = Math.round(data.shoulders * 2.54);

        chest.dispatchEvent(new Event('input'));
        waist.dispatchEvent(new Event('input'));
        hips.dispatchEvent(new Event('input'));
        shoulders.dispatchEvent(new Event('input'));
    });
});

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
    const headRadius = 22;
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
    const armWidth = 12 + (chest.value / 150) * 12;
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
    const legWidth = 16 + (hips.value / 150) * 16;
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

// Color matching logic
const colorFamilies = [
    { name: "black", rgb: [0, 0, 0] },
    { name: "white", rgb: [255, 255, 255] },
    { name: "grey", rgb: [128, 128, 128] },
    { name: "red", rgb: [255, 0, 0] },
    { name: "blue", rgb: [0, 0, 255] },
    { name: "green", rgb: [0, 128, 0] },
    { name: "yellow", rgb: [255, 255, 0] },
    { name: "beige", rgb: [245, 245, 220] },
    { name: "brown", rgb: [165, 42, 42] },
    { name: "pink", rgb: [255, 192, 203] },
    { name: "purple", rgb: [128, 0, 128] },
    { name: "orange", rgb: [255, 165, 0] }
];

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

function getColorFamily(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return "unknown";

    let closestFamily = "black";
    let minDistance = Infinity;

    for (const family of colorFamilies) {
        const rDiff = rgb[0] - family.rgb[0];
        const gDiff = rgb[1] - family.rgb[1];
        const bDiff = rgb[2] - family.rgb[2];
        const distance = Math.sqrt(
            (rDiff * rDiff * 0.3) +
            (gDiff * gDiff * 0.59) +
            (bDiff * bDiff * 0.11)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestFamily = family.name;
        }
    }
    return closestFamily;
}

const colorNameToHex = {
    black: "#000000",
    white: "#ffffff",
    grey: "#808080",
    gray: "#808080",
    red: "#ff0000",
    blue: "#0000ff",
    green: "#008000",
    yellow: "#ffff00",
    beige: "#f5f5dc",
    brown: "#a52a2a",
    pink: "#ffc0cb",
    purple: "#800080",
    orange: "#ffa500",
    navy: "#000080",
    teal: "#008080",
    maroon: "#800000",
    olive: "#808000",
    tan: "#d2b48c",
    charcoal: "#36454f",
    lavender: "#e6e6fa"
};

function normalizeHexColor(value) {
    const raw = String(value ?? "").trim().toLowerCase();
    if (!raw) return "#000000";

    if (/^#([0-9a-f]{6})$/.test(raw)) {
        return raw;
    }

    const rgbMatch = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*\d+(?:\.\d+)?\s*)?\)$/.exec(raw);
    if (rgbMatch) {
        return `#${[1, 2, 3].map(i => Number(rgbMatch[i]).toString(16).padStart(2, '0')).join('')}`;
    }

    const shortMatch = /^#([0-9a-f]{3})$/.exec(raw);
    if (shortMatch) {
        return `#${shortMatch[1][0]}${shortMatch[1][0]}${shortMatch[1][1]}${shortMatch[1][1]}${shortMatch[1][2]}${shortMatch[1][2]}`;
    }

    if (colorNameToHex[raw]) {
        return colorNameToHex[raw];
    }

    for (const name in colorNameToHex) {
        if (raw.includes(name)) {
            return colorNameToHex[name];
        }
    }

    return "#000000";
}

topColorPicker.addEventListener("input", (e) => {
    const hex = e.target.value;
    topColorPreview.style.backgroundColor = hex;
    const family = getColorFamily(hex);
    topColorName.innerText = family.charAt(0).toUpperCase() + family.slice(1);
    userData.outfits[1] = hex;
})

bottomOptionsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".b-opt")
    if (!btn) return
    bottomOptionsEl.querySelectorAll(".b-opt").forEach(b => b.classList.remove("selected"))
    btn.classList.add("selected")
    userData.outfits[2] = btn.dataset.type
})

bottomColorPicker.addEventListener("input", (e) => {
    const hex = e.target.value;
    bottomColorPreview.style.backgroundColor = hex;
    const family = getColorFamily(hex);
    bottomColorName.innerText = family.charAt(0).toUpperCase() + family.slice(1);
    userData.outfits[3] = hex;
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

async function analyzeUploadedOutfit() {
    const topFile = topUploadInput?.files?.[0];
    const bottomFile = bottomUploadInput?.files?.[0];
    const occasion = normalizeToken(userData.occasion);

    const missing = [];
    if (!topFile) missing.push("top image");
    if (!bottomFile) missing.push("bottom image");
    if (!occasion) missing.push("occasion");

    if (missing.length) {
        alert(`Please provide: ${missing.join(", ")}.`);
        return;
    }

    const formData = new FormData();
    formData.append("topImage", topFile);
    formData.append("bottomImage", bottomFile);
    formData.append("occasion", occasion);
    document.getElementById('analyzeUploadBtn').textContent = 'Analysing...'
    document.getElementById('analyzeUploadBtn').disabled = true

    try {
        const response = await fetch("https://checkthefit-backend.onrender.com/analyse-outfit", {
            method: "POST",
            body: formData
        });

        const payload = await response.json();

        if (!response.ok) {
            console.error("Analyse outfit failed:", payload);
            alert(payload.error || "Unable to analyze the uploaded outfit.");
            return;
        }

        const topType = normalizeToken(payload.outfitData?.top?.type);
        const bottomType = normalizeToken(payload.outfitData?.bottom?.type);
        const topColor = normalizeHexColor(payload.outfitData?.top?.color);
        const bottomColor = normalizeHexColor(payload.outfitData?.bottom?.color);

        if (!topType || !bottomType) {
            alert("Could not detect both top and bottom types. Please upload clear outfit photos.");
            return;
        }

        userData.outfits[0] = topType;
        userData.outfits[1] = topColor;
        userData.outfits[2] = bottomType;
        userData.outfits[3] = bottomColor;
        userData.occasion = occasion;

        updateFit();
        document.getElementById('uploadWardrobePreview').innerHTML =
            document.getElementById('wardrobePreview').innerHTML
    } catch (err) {
        console.error(err);
        alert("Something went wrong while analyzing the uploaded outfit.");
    }
    document.getElementById('analyzeUploadBtn').textContent = 'Analyze the fit'
    document.getElementById('analyzeUploadBtn').disabled = false
}

function analyzeOutfit() {
    const topType = normalizeToken(userData.outfits[0])

    if (!userData.outfits[1]) userData.outfits[1] = "#000000";
    const topColor = getColorFamily(userData.outfits[1]);

    const bottomType = normalizeToken(userData.outfits[2])

    if (!userData.outfits[3]) userData.outfits[3] = "#000000";
    const bottomColor = getColorFamily(userData.outfits[3]);

    const occasion = normalizeToken(userData.occasion)
    const gender = normalizeToken(userData.gender)

    const missing = []
    if (!topType) missing.push("top type")
    if (!bottomType) missing.push("bottom type")
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

    const genderTops = {
        male: new Set(["shirt", "t-shirt", "tshirt", "hoodie", "blazer", "sweater"]),
        female: new Set(["top", "t-shirt", "tshirt", "kurti", "blouse", "hoodie", "blazer", "sweater"])
    }
    const genderBottoms = {
        male: new Set(["jeans", "trousers", "shorts", "pant", "pants"]),
        female: new Set(["jeans", "trousers", "skirt", "leggings", "pant", "pants"])
    }

    if (gender) {
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
        male: new Set(["trousers", "pant", "pants"]),
        female: new Set(["trousers", "skirt", "pant", "pants"])
    }
    const casualTopByGender = {
        male: new Set(["t-shirt", "tshirt", "hoodie", "shirt", "sweater"]),
        female: new Set(["top", "t-shirt", "tshirt", "hoodie", "kurti", "sweater"])
    }
    const casualBottomByGender = {
        male: new Set(["jeans", "shorts", "trousers", "pant", "pants"]),
        female: new Set(["jeans", "leggings", "trousers", "skirt"], "pant", "pants")
    }
    const partyTopByGender = {
        male: new Set(["blazer", "shirt", "t-shirt", "tshirt"]),
        female: new Set(["blouse", "top", "kurti", "blazer"])
    }
    const partyBottomByGender = {
        male: new Set(["jeans", "trousers", "pant", "pants"]),
        female: new Set(["skirt", "jeans", "trousers", "leggings", "pant", "pants"])
    }
    const dateTopByGender = {
        male: new Set(["shirt", "t-shirt", "tshirt", "blazer", "sweater"]),
        female: new Set(["top", "blouse", "kurti", "t-shirt", "tshirt", "sweater"])
    }
    const dateBottomByGender = {
        male: new Set(["jeans", "trousers", "pant", "pants"]),
        female: new Set(["jeans", "skirt", "trousers", "leggings", "pant", "pants"])
    }

    const getSet = (map) => {
        if (gender && map[gender]) return map[gender];
        const combined = new Set();
        if (map.male) map.male.forEach(i => combined.add(i));
        if (map.female) map.female.forEach(i => combined.add(i));
        return combined;
    };

    const formalTops = getSet(formalTopByGender)
    const formalBottoms = getSet(formalBottomByGender)
    const casualTops = getSet(casualTopByGender)
    const casualBottoms = getSet(casualBottomByGender)
    const partyTops = getSet(partyTopByGender)
    const partyBottoms = getSet(partyBottomByGender)
    const dateTops = getSet(dateTopByGender)
    const dateBottoms = getSet(dateBottomByGender)

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
    const reasonsHtml = analysis.reasons.map(r => `<li><span class="reason-dot"></span>${r}</li>`).join("")

    wardrobe.innerHTML = `
    <h2>Your Wardrobe</h2>
    <div class="outfit-card">
        <div class="outfit-details">
            <div class="detail-item">
                <span class="detail-label">Top</span>
                <span class="detail-value">
                    <span class="color-swatch" style="background-color: ${userData.outfits[1]};"></span>
                    <span style="text-transform: capitalize;">${userData.outfits[0]}</span>
                </span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Bottom</span>
                <span class="detail-value">
                    <span class="color-swatch" style="background-color: ${userData.outfits[3]};"></span>
                    <span style="text-transform: capitalize;">${userData.outfits[2]}</span>
                </span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Occasion</span>
                <span class="detail-value" style="text-transform: capitalize;">${userData.occasion}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Body Type</span>
                <span class="detail-value">${analysis.bodyType}</span>
            </div>
        </div>
        
        <div class="outfit-score">
            <div class="score-header">
                <div class="score-badge">${analysis.score}/100</div>
                <div class="score-label">${analysis.label}</div>
            </div>
            <ul class="score-reasons">
                ${reasonsHtml}
            </ul>
        </div>
    </div>
    `;

    // alert(userData.outfits)
}


const topUploadInput = document.getElementById("topUpload");
const topImagePreviewEl = document.getElementById("topImagePreview");
const topUploadBox = document.getElementById("topUploadBox");
const topPreviewWrapper = document.getElementById("topPreviewWrapper");
const topRemoveBtn = document.getElementById("topRemoveBtn");

const bottomUploadInput = document.getElementById("bottomUpload");
const bottomImagePreviewEl = document.getElementById("bottomImagePreview");
const bottomUploadBox = document.getElementById("bottomUploadBox");
const bottomPreviewWrapper = document.getElementById("bottomPreviewWrapper");
const bottomRemoveBtn = document.getElementById("bottomRemoveBtn");

// Handle top image upload
if (topUploadInput) {
    topUploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                topImagePreviewEl.src = event.target.result;
                topUploadBox.style.display = "none";
                topPreviewWrapper.style.display = "flex";
            };
            reader.readAsDataURL(file);
        }
    });
}

// Handle top image remove
if (topRemoveBtn) {
    topRemoveBtn.addEventListener("click", () => {
        topImagePreviewEl.src = "";
        topUploadInput.value = "";
        topPreviewWrapper.style.display = "none";
        topUploadBox.style.display = "block";
    });
}

// Handle bottom image upload
if (bottomUploadInput) {
    bottomUploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                bottomImagePreviewEl.src = event.target.result;
                bottomUploadBox.style.display = "none";
                bottomPreviewWrapper.style.display = "flex";
            };
            reader.readAsDataURL(file);
        }
    });
}

// Handle bottom image remove
if (bottomRemoveBtn) {
    bottomRemoveBtn.addEventListener("click", () => {
        bottomImagePreviewEl.src = "";
        bottomUploadInput.value = "";
        bottomPreviewWrapper.style.display = "none";
        bottomUploadBox.style.display = "block";
    });
}

console.log(userData)

const uploadOccasionOptions = document.querySelectorAll('#uploadOccasionOptions li')
const uploadOccasionLabel = document.getElementById('uploadOccasionLabel')

uploadOccasionOptions.forEach(option => {
    option.addEventListener("click", () => {
        uploadOccasionOptions.forEach(o => o.classList.remove("selected"))
        option.classList.add("selected")
        userData.occasion = option.dataset.value
        uploadOccasionLabel.innerText = option.innerText
    })
})

document.getElementById('analyzeUploadBtn').addEventListener('click', analyzeUploadedOutfit)