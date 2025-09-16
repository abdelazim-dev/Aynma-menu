

const drinks = [
    {
        name: "اسبريسو",
        price: 11,
        image: "images/drinks/p9.png",
        bgColor: "linear-gradient(135deg, #ffe0b2, #ffcc80)",
        textColor: "#000000"
    },
    {
        name: "ڤي 60 حار",
        price: 16,
        image: "images/drinks/p1.png",
        bgColor: "linear-gradient(135deg, #f8bbd0, #f48fb1)",
        textColor: "#000000"
    },
    {
        name: "ڤي 60 بارد",
        price: 19,
        image: "images/drinks/p2.png",
        bgColor: "linear-gradient(135deg, #bbdefb, #90caf9)",
        textColor: "#000000"
    },
    {
        name: "قهوة اليوم حار",
        price: 11,
        image: "images/drinks/p1.png",
        bgColor: "linear-gradient(135deg, #d7ccc8, #bcaaa4)",
        textColor: "#000000"
    },
    {
        name: "قهوة اليوم بارد",
        price: 13,
        image: "images/drinks/p2.png",
        bgColor: "linear-gradient(135deg, #c5cae9, #9fa8da)",
        textColor: "#000000"
    },
    {
        name: "الفريدو",
        price: 12,
        image: "images/drinks/p3.png",
        bgColor: "linear-gradient(135deg, #c8e6c9, #a5d6a7)",
        textColor: "#000000"
    },
    {
        name: "ايس امريكانو",
        price: 14,
        image: "images/drinks/p7.png",
        bgColor: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
        textColor: "#000000"
    },
    {
        name: "سبانيش لاتيه",
        price: 19,
        image: "images/drinks/p4.png",
        bgColor: "linear-gradient(135deg, #ffe0b2, #ffcc80)",
        textColor: "#000000"
    },
    {
        name: "ايس سبانيش لاتيه",
        price: 17,
        image: "images/drinks/p5.png",
        bgColor: "linear-gradient(135deg, #dcedc8, #c5e1a5)",
        textColor: "#000000"
    },
    {
        name: "ايس شوكلت كراميل",
        price: 17,
        image: "images/drinks/p8.png",
        bgColor: "linear-gradient(135deg, #ffe0b2, #ffccbc)",
        textColor: "#000000"
    },
    {
        name: "ايس تي خوخ",
        price: 18,
        image: "images/drinks/p6.png",
        bgColor: "linear-gradient(135deg, #ffccbc, #ffab91)",
        textColor: "#000000"
    },
    {
        name: "بلو",
        price: 18,
        image: "images/drinks/p10.png",
        bgColor: "linear-gradient(135deg, #b3e5fc, #81d4fa)",
        textColor: "#000000"
    },
    {
        name: "ريد",
        price: 18,
        image: "images/drinks/p11.png",
        bgColor: "linear-gradient(135deg, #ffcdd2, #ef9a9a)",
        textColor: "#000000"
    },
    {
        name: "ماتشا",
        price: 18,
        image: "images/drinks/p12.png",
        bgColor: "linear-gradient(135deg, #c5e1a5, #aed581)",
        textColor: "#000000"
    },
    {
        name: "كركديه",
        price: 19,
        image: "images/drinks/p13.png",
        bgColor: "linear-gradient(135deg, #f8bbd0, #f48fb1)",
        textColor: "#000000"
    }
];
const desserts = [
    {
        name: "ترافيل مانجو",
        price: 26,
        image: "images/sweets/s1.png",
        bgColor: "linear-gradient(135deg, #fff9c4, #ffe082)",
        textColor: "#000000"
    },
    {
        name: "بيكان كراميل",
        price: 26,
        image: "images/sweets/s2.png",
        bgColor: "linear-gradient(135deg, #ffe0b2, #ffcc80)",
        textColor: "#000000"
    },
    {
        name: "بيري كيك",
        price: 22,
        image: "images/sweets/s4.png",
        bgColor: "linear-gradient(135deg, #f8bbd0, #f48fb1)",
        textColor: "#000000"
    },
    {
        name: "لاتية",
        price: 20,
        image: "images/sweets/s5.png",
        bgColor: "linear-gradient(135deg, #d1c4e9, #b39ddb)",
        textColor: "#000000"
    },
    {
        name: "تشيز كيك كراميل",
        price: 22,
        image: "images/sweets/s6.png",
        bgColor: "linear-gradient(135deg, #ffecb3, #ffd54f)",
        textColor: "#000000"
    },
    {
        name: "تشيز كيك توت",
        price: 22,
        image: "images/sweets/s7.png",
        bgColor: "linear-gradient(135deg, #bbdefb, #90caf9)",
        textColor: "#000000"
    }
];
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("✅ Service Worker registered"))
        .catch(err => console.log("❌ SW registration failed:", err));
}
const swiperWrapper = document.querySelector('.product-swiper .swiper-wrapper');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const priceCard = document.querySelector('.price-card');
const tabs = document.querySelectorAll('.tab');
const body = document.body;

let currentProducts = drinks;
let swiper;

function buildSwiper(products) {
    swiperWrapper.innerHTML = "";

    products.forEach(product => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
        swiperWrapper.appendChild(slide);
    });

    if (swiper) swiper.destroy(true, true);

    swiper = new Swiper(".product-swiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 40,
        grabCursor: true,
        loop: false,
        on: {
            slideChange: () => {
                const index = swiper.realIndex;
                updateProduct(index);
            }
        }
    });

    updateProduct(0);
}
function updateProduct(index) {
    const product = currentProducts[index];
    productName.textContent = product.name;
    productPrice.textContent = `${product.price} ﷼`;

    body.style.background = `
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.08), transparent 40%),
        radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.05), transparent 50%),
        radial-gradient(circle at 50% 80%, rgba(0, 0, 0, 0.3), transparent 60%),
        ${product.bgColor},
        linear-gradient(180deg, #111, #000)
    `;

    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach((slide, i) => {
        slide.style.transform = "scale(0.7)";

        if (i === index) {
            let scaleValue = .95;


            if (currentProducts === desserts) {
                scaleValue = 1.7;
            }

            else if (currentProducts === drinks && index === 0) {
                scaleValue = 1.7;
            }


            if (window.innerWidth >= 500 && window.innerWidth < 900) {
                scaleValue *= 1.5;
            } else if (window.innerWidth >= 900) {
                scaleValue *= 1.5;
            }

            slide.style.transform = `scale(${scaleValue})`;
        }
    });
}



tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        currentProducts = i === 0 ? drinks : desserts;
        buildSwiper(currentProducts);
    });
});

buildSwiper(currentProducts);
