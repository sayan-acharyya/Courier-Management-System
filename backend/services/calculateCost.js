// Delivery type charges
const DELIVERY_TYPE_CHARGES = {
    standard: 0,
    overnight: 80,
    sameDay: 150,
};

// National shipment category adjustments
const NATIONAL_CATEGORY_CHARGES = {
    document: -100,
    electronics: 150,
    fragile: 250,
    clothing: 0,
    food: 120,
    medicine: 150,
    cosmetics: 100,
    books: -20,
    small_package: 100,
    large_package: 200,
};

// International shipment category adjustments
const INTERNATIONAL_CATEGORY_CHARGES = {
    document: 700,
    electronics: 2000,
    fragile: 3500,
    clothing: 500,
    food: 1500,
    medicine: 1800,
    cosmetics: 1000,
    books: 500,
    small_package: 700,
    large_package: 3500,
};

export const calculateCost = ({
    originCity,
    destinationCity,
    shipmentType,
    parcelCategory,
    weight,
    deliveryType,
}) => {
    const isSameCity =
        originCity.trim().toLowerCase() ===
        destinationCity.trim().toLowerCase();

    const deliveryTypeCharge =
        DELIVERY_TYPE_CHARGES[deliveryType] || 0;

    // National shipment cost calculation
    if (shipmentType === "national") {
        const categoryCharge =
            NATIONAL_CATEGORY_CHARGES[parcelCategory] || 0;

        if (isSameCity) {
            const basePrice = 50;
            const weightCharge = weight * 500;

            const price =
                basePrice +
                weightCharge +
                categoryCharge +
                deliveryTypeCharge;

            return {
                type: "national",
                parcelCategory,
                price,
            };
        }

        //out of city delivery 
        const basePrice = 100;
        const weightCharge = weight * 500;

        const price =
            basePrice +
            weightCharge +
            categoryCharge +
            deliveryTypeCharge;

        return {
            type: "national",
            parcelCategory,
            price,
        };

    }

    if (shipmentType === "international") {
        const categoryCharge = INTERNATIONAL_CATEGORY_CHARGES[parcelCategory] || 0;

        if (weight <= 0) {
            throw new Error("Weight must be a positive number for international shipments.");
        }

        let price;

        if (weight <= 0.5) {
            price = 7500;
        } else if (weight <= 1) {
            price = 13500;
        }else{
            const extraKg = Math.ceil(weight - 1);
            price = 13500 + extraKg * 7500 ;
        }

        price += categoryCharge + deliveryTypeCharge;

        return {
            type: "international",
            parcelCategory,
            price,
        };
    }

    throw new Error("Invalid shipment type. Must be either 'national' or 'international'.");
};