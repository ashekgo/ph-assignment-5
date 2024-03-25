let selectedSeats = []
let couponApplied = false

function selectSeat(seatID) {
    let button = document.getElementById(seatID)
    let seatText = button.innerText

    if (couponApplied) {
        console.log("Developer Message : Cannot select/deselect seat when coupon applied once.")
        return
    }

    let seatIndex = selectedSeats.findIndex(seat => seat.seatID === seatID)
    if (seatIndex === -1) {
        if (selectedSeats.length >= 4) {
            console.log("Developer Message : Only 4 seats are allowed to select.")
            return
        }
        selectedSeats.push({ seatID, seatText })
        button.classList.add('bg-green-500')
    } else {
        selectedSeats.splice(seatIndex, 1)
        button.classList.remove('bg-green-500')
    }

    console.log("Selected Seats Array:", selectedSeats)

    let currentlySelectedSeat = document.getElementById("selectedSeats")
    if (currentlySelectedSeat) {
        currentlySelectedSeat.innerText = selectedSeats.length.toString()
    }

    let currentlyAvailableSeat = document.getElementById("availableSeats")
    if (currentlyAvailableSeat) {
        currentlyAvailableSeat.innerText = 40 - selectedSeats.length.toString()
    }

    let totalPrice = selectedSeats.length * 550

    let totalPriceElement = document.getElementById("totalBDT")
    totalPriceElement.innerText = totalPrice

    appendSelectedTicket()

    let submitButton = document.getElementById("submitButton")
    if (submitButton) {
        if (selectedSeats.length > 0) {
            submitButton.removeAttribute("disabled")
        }
    }
}

function applyCoupon() {
    if (selectedSeats.length === 0) {
        console.log("Developer Message : Cannot apply a coupon when no seat selected.")
        return
    }

    let couponInput = document.getElementById("couponInput")
    let coupon = couponInput.value.trim()

    let discountedPriceElement = document.getElementById("discountedPrice")
    let grandTotalElement = document.getElementById("grandTotal")

    if (selectedSeats.length === 4 && (coupon === "New15" || coupon === "Couple20")) {
        if (coupon === "New15") {
            let discountedPrice = Math.round(selectedSeats.length * 550 * 0.15)
            discountedPriceElement.innerText = discountedPrice
            let grandTotal = selectedSeats.length * 550 - discountedPrice
            grandTotalElement.innerText = grandTotal
            hideCouponDiv()
            couponApplied = true
        } else if (coupon === "Couple20") {
            let discountedPrice = Math.round(selectedSeats.length * 550 * 0.2)
            discountedPriceElement.innerText = discountedPrice
            let grandTotal = selectedSeats.length * 550 - discountedPrice
            grandTotalElement.innerText = grandTotal
            hideCouponDiv()
            couponApplied = true
        }
    } else {
        console.log("Developer Message : Invalid coupon code or expected number of seats are not selected.")
    }
}

function hideCouponDiv() {
    let hideCouponDiv = document.getElementById("hideCoupon")
    if (hideCouponDiv) {
        hideCouponDiv.style.display = "none"
    }
}

function appendSelectedTicket() {
    let showSelectedTicket = document.getElementById('showSelectedTicket')
    if (showSelectedTicket) {
        showSelectedTicket.innerHTML = ''

        for (let seat of selectedSeats) {
            let seatNumberDiv = document.createElement('div')
            seatNumberDiv.innerText = seat.seatText
            
            let seatTypeDiv = document.createElement('div')
            seatTypeDiv.innerText = 'Economy'
            
            let seatPriceDiv = document.createElement('div')
            seatPriceDiv.innerText = '550'

            showSelectedTicket.appendChild(seatNumberDiv)
            showSelectedTicket.appendChild(seatTypeDiv)
            showSelectedTicket.appendChild(seatPriceDiv)
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let submitButton = document.getElementById("submitButton")
    if (submitButton) {
        submitButton.setAttribute("disabled", "disabled")
    }

    const applyCouponButton = document.getElementById('applyCoupon')
    if (applyCouponButton) {
        applyCouponButton.addEventListener('click', function(event) {
            event.preventDefault()
            applyCoupon()
        })
    }

    const bookingForm = document.getElementById('bookingForm')
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault()

        const passengerName = document.getElementById('passengerName').value.trim()
        const phoneNumber = document.getElementById('phoneNumber').value.trim()
        const emailId = document.getElementById('emailID').value.trim()

        if (selectedSeats.length > 0) {
            window.location.href = './checkout.html'
        }
    })
})

document.getElementById("buyTicketsButton").addEventListener("click", function() {
    document.getElementById("seatSelection").scrollIntoView({ behavior: 'smooth' })
})