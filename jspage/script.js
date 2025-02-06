
$(function () {

    $('.slider').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        arrows: true,
        prevArrow: `.slick-arrow`,
        nextArrow: `.slick-arrow1`,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    let mainimg = document.querySelector(".main-t-shirtimg img")
    let smallbox = document.querySelectorAll(".t-shirtsmallbox img")
    let sizbox2 = document.querySelectorAll(".sizbox")
    let inkriment = document.querySelector("#inkriment")
    let dikriment = document.querySelector("#dikriment")
    let productp = document.querySelector(".product-nugbox p")
    let bodergre = document.querySelectorAll(".bodergre")
    let colorbox = document.querySelectorAll(".colorbox")

    let i = 1;


    function productDetailPage() {


        smallbox.forEach((e) => {
            e.addEventListener("mousemove", function () {
                mainimg.src = e.src
                let perent = e.parentElement;
                smallbox.forEach((em) => {
                    em.parentElement.setAttribute("class", "t-shirtsmallbox")
                })
                perent.classList.add("border")
            })
        })

        sizbox2.forEach((e) => {
            e.addEventListener("click", () => {
                sizbox2.forEach((eml) => {
                    eml.setAttribute("class", "sizbox")
                })
                e.classList.add("bg-black")
            })
        })

        dikriment.addEventListener("click", () => {
            if (i >= 1) {
                i++;
            }
            productp.innerText = i

        })
        inkriment.addEventListener("click", () => {
            if (i > 1) {
                i--;
            }
            productp.innerText = i

        })

        bodergre.forEach((e) => {
            e.addEventListener("click", () => {
                bodergre.forEach((eml) => {
                    eml.setAttribute("class", "bodergre")
                })
                e.classList.add("boderblank")
            })
        })

        colorbox.forEach((e) => {
            e.addEventListener("click", function () {
                colorbox.forEach((em) => {
                    em.children[0].setAttribute("id", "ikn-one")
                })
                e.children[0].setAttribute("id", "")
            })
        })

    }
    productDetailPage()

    // $(".head-contn i").click(function () {
    //     $(".head-line").hide()

    // })

})

$(function () {
    let prodbox = document.querySelectorAll(".boys-produts-box")
    let Tdhirtboximg = document.querySelectorAll(".t-shirtsmallbox img")
    let productdetalis = []
    let offerMoney = null
    let offertaka = null
    let offerretig = null
    prodbox.forEach((e) => {
        e.addEventListener("mouseover", () => {
            let imgSrc = e.children[0].children[0].children[0].src;
            let imgText = e.children[1].children[0].innerText;
            let retingimg = e.children[1].children[1].src;
            let moenyreting = e.children[1].children[2].children[0].children[0].innerText;
            let money = e.children[1].children[2].children[0].children[1].innerText;
            if (e.children[1].children[2].children[1].children[0]) {
                offerretig = e.children[1].children[2].children[1].children[0].children[0].innerText
                offerMoney = e.children[1].children[2].children[1].children[0].children[1].innerText
                offertaka = e.children[1].children[2].children[1].children[1].innerText
            }
            productdetalis = [imgSrc, imgText, retingimg, moenyreting, money, offerretig, offerMoney, offertaka]

            localStorage.setItem("products", JSON.stringify(productdetalis))
        })
    })

    function localstorageGetitm() {
        let CartProdcts = JSON.parse(localStorage.getItem('products'))
        Tdhirtboximg.forEach((e) => {
            e.src = CartProdcts[0]
        })
        $(".main-t-shirtimg img")[0].src = CartProdcts[0]
        $(".hedigT-shrittext h1")[0].innerText = CartProdcts[1]
        $(".retigimgs img")[0].src = CartProdcts[2]
        $(".carnt-amount h3")[0].children[0].innerText = CartProdcts[3]
        $(".carnt-amount h3")[0].children[1].innerText = CartProdcts[4]
        $(".od-amount del")[0].children[0].innerText = CartProdcts[5]
        $(".od-amount del")[0].children[1].innerText = CartProdcts[6]
        $(".offer")[0].innerText = CartProdcts[7]

        if (CartProdcts[5] == null || CartProdcts[6] == null || CartProdcts[7] == null) {
            $(".offer").hide()

        }


    }
    localstorageGetitm()
})

$(function () {
    let color = undefined
    let Size = undefined
    $(".colorbox").click(function () {
        // console.log($(this)[0].parentElement.getAttribute("attribute"))
        color = $(this)[0].getAttribute("attribute")

    })
    $(".sizbox").click(function () {
        Size = $(this)[0].innerText
    })
    color = $(".colorbox")[0].getAttribute("attribute")
    Size = $(".bg-black")[0].innerText

    $(".cartbuttons").click(function () {
        let CartIMg = $(".product-detail")[0].children[0].children[1].children[0].src
        let CartText = $(".product-detail")[0].children[1].children[0].children[0].innerText
        let CartmoenyReting = $(".product-detail")[0].children[1].children[2].children[0].children[0].children[0].innerText
        let cartProductmoeny = $(".product-detail")[0].children[1].children[2].children[0].children[0].children[1].innerText
        let CartProductcolor = color
        let CartSize = Size
        let Cartcontenti = $(".product-detail")[0].children[1].children[9].children[0].children[1].innerText
        let offer = $(".offer")[0].innerText

        CartProduct(CartIMg, CartText, CartmoenyReting, cartProductmoeny, CartProductcolor, CartSize, Cartcontenti, offer)

    })
    function CartProduct(img, text, reting, moeny, color, size, contenti, offer) {

        let Cart = { imgName: `${img}`, imgtext: `${text}`, imgretig: `${reting}`, imgmoeny: `${moeny}`, imgcolor: `${color}`, imgsize: `${size}`, imgconten: `${contenti}`, offerCart: `${offer}` }

        let users = JSON.parse(localStorage.getItem("cart")) || [];
        let exists = users.some(item => item.imgName === Cart.imgName);

        if (!exists) {
            users.push(Cart); // Product add to cart
            localStorage.setItem("cart", JSON.stringify(users)); // Save to LocalStorage
        }
        // users.push(Cart);
        // localStorage.setItem("userkey", JSON.stringify(users));



    }


})

$(function () {
    let number = 1
    let sum = 0
    let cartproduct = JSON.parse(localStorage.getItem("cart"))
    let mainCart = document.querySelector(".cart_fristbox")
    function element() {

        cartproduct.forEach((em) => {
            let main_boxCart = document.createElement("div")
            let Crt_boxchidone = document.createElement("div")
            let Cart_img = document.createElement("img")
            let Crt_boxtwo = document.createElement("div")
            let Cart_boxtwoone = document.createElement("div")
            let Cart_content = document.createElement("div")
            let h2 = document.createElement("h2")
            let p = document.createElement("p")
            let span = document.createElement("span")
            let p2 = document.createElement("p")
            let span2 = document.createElement("span")
            let deleetCart = document.createElement("div")
            let i = document.createElement("i")
            let money_cart = document.createElement("div")
            let moeycart = document.createElement("div")
            let h2money = document.createElement("h2")
            let spanh2one = document.createElement("span")
            let spanh2two = document.createElement("span")
            let contenti_box = document.createElement("div")
            let decariment = document.createElement("i")
            let contentip = document.createElement("p")
            let incarimet = document.createElement("i")



            main_boxCart.classList.add("Cart-boxProducts")
            Crt_boxchidone.classList.add("Cart_prodctsimg")
            Cart_img.src = em.imgName
            Crt_boxtwo.classList.add("Products_boxConten")
            Cart_boxtwoone.classList.add("Content_productsimg")
            Cart_content.classList.add("contentsAllcart")
            h2.innerText = em.imgtext
            p.innerText = "Size :"
            span.innerText = em.imgsize
            p2.innerText = "Color :"
            span2.innerText = em.imgcolor
            deleetCart.classList.add("delete_cart")
            i.classList.add("fa-solid")
            i.classList.add("fa-trash")
            money_cart.classList.add("moeny_conten")
            moeycart.classList.add("moenyCart")
            spanh2one.innerText = em.imgretig
            spanh2two.innerText = em.imgmoeny
            contenti_box.classList.add("dicariment_icariment")
            decariment.classList.add("fa-solid")
            decariment.classList.add("fa-minus")
            contentip.innerText = em.imgconten
            incarimet.classList.add("fa-solid")
            incarimet.classList.add("fa-plus")


            mainCart.appendChild(main_boxCart)
            main_boxCart.appendChild(Crt_boxchidone)
            Crt_boxchidone.appendChild(Cart_img)
            main_boxCart.appendChild(Crt_boxtwo)
            Crt_boxtwo.appendChild(Cart_boxtwoone)
            Cart_boxtwoone.appendChild(Cart_content)
            Cart_content.appendChild(h2)
            Cart_content.appendChild(p)
            p.appendChild(span)
            Cart_content.appendChild(p2)
            p2.appendChild(span2)
            Cart_boxtwoone.appendChild(deleetCart)
            deleetCart.appendChild(i)
            Crt_boxtwo.appendChild(money_cart)
            money_cart.appendChild(moeycart)
            moeycart.appendChild(h2money)
            h2money.appendChild(spanh2one)
            h2money.appendChild(spanh2two)
            money_cart.appendChild(contenti_box)
            contenti_box.appendChild(decariment)
            contenti_box.appendChild(contentip)
            contenti_box.appendChild(incarimet)


        })
    }
    element()
    function dicarminet() {
        let mains = document.querySelectorAll(".dicariment_icariment")
        mains.forEach((e) => {
            e.children[2].addEventListener("click", () => {
                number = e.children[1].innerText
                if (number >= 1) {
                    number++
                }
                e.children[1].innerText = number

                let imgchek = e.parentElement.parentElement.parentElement.children[0].children[0].src;
                let cartproduct = JSON.parse(localStorage.getItem("cart"))
                cartproduct.forEach((em) => {
                    if (em.imgName == imgchek) {
                        e.parentElement.children[0].children[0].children[1].innerText = em.imgmoeny * number
                    }
                })
                total()

            })
            e.children[0].addEventListener("click", () => {
                number = e.children[1].innerText
                if (number > 1) {
                    number--
                }
                e.children[1].innerText = number

                let imgchek = e.parentElement.parentElement.parentElement.children[0].children[0].src;
                let cartproduct = JSON.parse(localStorage.getItem("cart"))
                cartproduct.forEach((em) => {
                    if (em.imgName == imgchek) {
                        e.parentElement.children[0].children[0].children[1].innerText = em.imgmoeny * number
                    }
                })
                total()
            })

        })

    }

    dicarminet()

    function total() {
        let moenyCart = document.querySelectorAll(".moenyCart")
        let summary = document.querySelector(".Cart_offerTOAmonut")
        let Disconut = document.querySelector(".Disconut")
        let DeliverFee = document.querySelector(".DeliverFee")
        let Total = document.querySelector(".Total")

        sum = 0;
        moenyCart.forEach((e) => {
            let a = Number(e.children[0].children[1].innerText)
            sum += a

        })
        summary.children[0].children[1].children[1].innerText = sum;
        let offer = Disconut.children[0].children[0].children[0].children[1].innerText;
        let disconut = Math.floor(sum * offer / 100);
        Disconut.children[1].children[1].innerText = disconut;
        let Deliver = Number(DeliverFee.children[1].children[1].innerText);
        let delivercherg = sum - disconut + Deliver;
        Total.children[1].children[1].innerText = delivercherg



    }
    total()

    let deletebox = document.querySelectorAll(".delete_cart")
    deletebox.forEach((e) => {
        e.children[0].addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let imgchaek = e.parentElement.parentElement.parentElement.children[0].children[0].src
            cart.forEach((e) => {
                cart = cart.filter(item => item.imgName !== imgchaek);
                localStorage.setItem("cart", JSON.stringify(cart));
            })
            e.parentElement.parentElement.parentElement.remove()
            total()
            dicarminet()

        })
    })

    function Cartmoneycheak() {
        let moeny_conten = document.querySelectorAll(".moeny_conten")
        moeny_conten.forEach((e) => {
            if (e.children[1].children[1].innerText > 1) {
                let newvelyu = e.children[0].children[0].children[1].innerText * e.children[1].children[1].innerText
                e.children[0].children[0].children[1].innerText = newvelyu

            }
        })

        let DeliverFee = document.querySelector(".DeliverFee h2")
        let Total = document.querySelector(".Total h2")
        let cart_fristbox = document.querySelector(".cart_fristbox")
        let deliver = DeliverFee.children[1];

        let cart_box = cart_fristbox.children.length
        if (cart_box == 0) {
            deliver.innerText = 0
            Total.children[1].innerText = 0
        }
    }
    Cartmoneycheak()


})



















// let produtsDtat = [
//     obj1 = [
//         {
//             img: "img/image 7.png",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "120"
//         },
//         {
//             img: "img/image 8 (1).png",
//             text: "Skinny Fit Jeans",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Checkered Shirt",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "img/image 10.png",
//             text: "Sleeve Striped T-shirt ",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },

//     ],
//     obj2 = [
//         {
//             img: "https://www.jiomart.com/images/product/original/rvsmj5duud/kuchipoo-boys-multi-color-printed-cotton-blend-pack-of-5-tshirts-boys-tshirt-kids-wear-t-shirt-for-kids-t-shirt-for-boys-boys-t-tshirts-product-images-rvsmj5duud-2-202309142100.jpg?im=Resize=(500,630)",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "170"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Buy boys solid light purple round neck t-shirts online india - urgear – UrGear",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSjytiF9JqBZfEd6zUqJaTBkpU5Xd3YxP0w&s",
//             text: "Tees for Boys: T-shirts for Boys & Graphic Tees | Nautica",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/16471501a.webp",
//             text: "T-Shirts Online - Buy CUCUMBER T-shirts for Baby",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },
//         {
//             img: "https://www.jiomart.com/images/product/original/rvsmj5duud/kuchipoo-boys-multi-color-printed-cotton-blend-pack-of-5-tshirts-boys-tshirt-kids-wear-t-shirt-for-kids-t-shirt-for-boys-boys-t-tshirts-product-images-rvsmj5duud-2-202309142100.jpg?im=Resize=(500,630)",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "170"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Buy boys solid light purple round neck t-shirts online india - urgear – UrGear",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSjytiF9JqBZfEd6zUqJaTBkpU5Xd3YxP0w&s",
//             text: "Tees for Boys: T-shirts for Boys & Graphic Tees | Nautica",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/16471501a.webp",
//             text: "T-Shirts Online - Buy CUCUMBER T-shirts for Baby",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },


//     ],
//     obj3 = [
//         {
//             img: "https://www.jiomart.com/images/product/original/rvsmj5duud/kuchipoo-boys-multi-color-printed-cotton-blend-pack-of-5-tshirts-boys-tshirt-kids-wear-t-shirt-for-kids-t-shirt-for-boys-boys-t-tshirts-product-images-rvsmj5duud-2-202309142100.jpg?im=Resize=(500,630)",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "170"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Buy boys solid light purple round neck t-shirts online india - urgear – UrGear",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSjytiF9JqBZfEd6zUqJaTBkpU5Xd3YxP0w&s",
//             text: "Tees for Boys: T-shirts for Boys & Graphic Tees | Nautica",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/16471501a.webp",
//             text: "T-Shirts Online - Buy CUCUMBER T-shirts for Baby",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },
//         {
//             img: "https://www.jiomart.com/images/product/original/rvsmj5duud/kuchipoo-boys-multi-color-printed-cotton-blend-pack-of-5-tshirts-boys-tshirt-kids-wear-t-shirt-for-kids-t-shirt-for-boys-boys-t-tshirts-product-images-rvsmj5duud-2-202309142100.jpg?im=Resize=(500,630)",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "170"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Buy boys solid light purple round neck t-shirts online india - urgear – UrGear",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSjytiF9JqBZfEd6zUqJaTBkpU5Xd3YxP0w&s",
//             text: "Tees for Boys: T-shirts for Boys & Graphic Tees | Nautica",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/16471501a.webp",
//             text: "T-Shirts Online - Buy CUCUMBER T-shirts for Baby",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },


//     ],

//     obj4 = [
//         {
//             img: "img/image 8 (1).png",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "120"
//         },
//         {
//             img: "img/image 8 (1).png",
//             text: "Skinny Fit Jeans",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Checkered Shirt",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "img/image 10.png",
//             text: "Sleeve Striped T-shirt ",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },

//     ],
//     obj5 = [
//         {
//             img: "https://www.jiomart.com/images/product/original/rvsmj5duud/kuchipoo-boys-multi-color-printed-cotton-blend-pack-of-5-tshirts-boys-tshirt-kids-wear-t-shirt-for-kids-t-shirt-for-boys-boys-t-tshirts-product-images-rvsmj5duud-2-202309142100.jpg?im=Resize=(500,630)",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "170"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Buy boys solid light purple round neck t-shirts online india - urgear – UrGear",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSjytiF9JqBZfEd6zUqJaTBkpU5Xd3YxP0w&s",
//             text: "Tees for Boys: T-shirts for Boys & Graphic Tees | Nautica",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/16471501a.webp",
//             text: "T-Shirts Online - Buy CUCUMBER T-shirts for Baby",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },
//         {
//             img: "https://www.jiomart.com/images/product/original/rvsmj5duud/kuchipoo-boys-multi-color-printed-cotton-blend-pack-of-5-tshirts-boys-tshirt-kids-wear-t-shirt-for-kids-t-shirt-for-boys-boys-t-tshirts-product-images-rvsmj5duud-2-202309142100.jpg?im=Resize=(500,630)",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "170"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Buy boys solid light purple round neck t-shirts online india - urgear – UrGear",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSjytiF9JqBZfEd6zUqJaTBkpU5Xd3YxP0w&s",
//             text: "Tees for Boys: T-shirts for Boys & Graphic Tees | Nautica",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/16471501a.webp",
//             text: "T-Shirts Online - Buy CUCUMBER T-shirts for Baby",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },


//     ],
//     obj6 = [
//         {
//             img: "https://www.jiomart.com/images/product/original/rvsmj5duud/kuchipoo-boys-multi-color-printed-cotton-blend-pack-of-5-tshirts-boys-tshirt-kids-wear-t-shirt-for-kids-t-shirt-for-boys-boys-t-tshirts-product-images-rvsmj5duud-2-202309142100.jpg?im=Resize=(500,630)",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "170"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Buy boys solid light purple round neck t-shirts online india - urgear – UrGear",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSjytiF9JqBZfEd6zUqJaTBkpU5Xd3YxP0w&s",
//             text: "Tees for Boys: T-shirts for Boys & Graphic Tees | Nautica",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/16471501a.webp",
//             text: "T-Shirts Online - Buy CUCUMBER T-shirts for Baby",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },
//         {
//             img: "https://www.jiomart.com/images/product/original/rvsmj5duud/kuchipoo-boys-multi-color-printed-cotton-blend-pack-of-5-tshirts-boys-tshirt-kids-wear-t-shirt-for-kids-t-shirt-for-boys-boys-t-tshirts-product-images-rvsmj5duud-2-202309142100.jpg?im=Resize=(500,630)",
//             text: "T-shirt Witrh Tape Details",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "170"
//         },
//         {
//             img: "img/image 9.png",
//             text: "Buy boys solid light purple round neck t-shirts online india - urgear – UrGear",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "240"
//         },
//         {
//             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSjytiF9JqBZfEd6zUqJaTBkpU5Xd3YxP0w&s",
//             text: "Tees for Boys: T-shirts for Boys & Graphic Tees | Nautica",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "180"
//         },
//         {
//             img: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/16471501a.webp",
//             text: "T-Shirts Online - Buy CUCUMBER T-shirts for Baby",
//             retig: "img/Frame 35.png",
//             dollar: "$",
//             money: "130"
//         },


//     ],


// ]


// let deta = document.querySelectorAll(".prodcuts-box")
// function proddta() {


//     produtsDtat[n].forEach((e) => {
//         let prodBox = document.createElement("div")
//         let prodimg = document.createElement("div")
//         let img = document.createElement("img")
//         let textBox = document.createElement("div")
//         let peragpha = document.createElement('p')
//         let retig = document.createElement('img')
//         let h2 = document.createElement("h2")
//         let span = document.createElement('span')
//         let span2 = document.createElement('span')

//         prodBox.classList.add("boys-produts-box")
//         prodimg.classList.add("produts-img")
//         img.src = e.img
//         textBox.classList.add("img-conten-produts")
//         peragpha.innerText = e.text
//         retig.src = e.retig
//         span.innerText = e.dollar
//         span2.innerText = e.money

//         deta[DT].appendChild(prodBox)
//         prodBox.appendChild(prodimg)
//         prodimg.appendChild(img)
//         prodBox.appendChild(textBox)
//         textBox.appendChild(peragpha)
//         textBox.appendChild(retig)
//         textBox.appendChild(h2)
//         h2.appendChild(span)
//         h2.appendChild(span2)

//     })
//     // produts2()
// }

// function DTdtatone() {
//     DT = 0;
//     n = 0;
//     proddta()
// }
// function DTdtatwo() {
//     DT = 1;
//     n = 3;
//     proddta()
//     n = 0

// }
// $(".buons-view button").click(function () {
//     DT = 0
//     if (n <= 5 && n > 2) {
//         n = 0
//     }
//     if (n == 0 || n == 1 || n == 2 && n < 2) {
//         n++;
//         proddta()
//     }
// })
// $(".buons-view2 button ").click(function () {
//     DT = 1
//     if (n <= 2) {
//         n = 3
//     } if (n == 3 || n == 4 || n == 5 && n < 5) {
//         n++;
//         proddta()

//     }
// })
// DTdtatone()
// DTdtatwo()

// $(function () {
//     let a = 0
//     let cartproduct = JSON.parse(localStorage.getItem("userkey"))
//     let imgsrc = document.querySelectorAll(".Cart_prodctsimg img")
//     imgsrc.forEach((e) => {
//         cartproduct.forEach((em) => {
//             console.log(em)
//             if (em[0] == e.src) {
//                 if (a <= cartproduct.length) {
//                     // console.log(em[0])
//                     a++;
//                 }

//             } else {
//                 if (a <= cartproduct.length) {
//                     // console.log(em[0], "this link add")
//                     a++;
//                 }

//             }
//         })
//     })


// })


