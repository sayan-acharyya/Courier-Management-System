import { Parcel } from "../models/parcel.js";
import { calculateCost } from "../services/calculateCost.js";
import { generateTrackingId } from "../services/generateTrackingId.js";
import { createParcelSchema } from "../validations/validations.js";

export const createParcel = async (req, res, next) => {
    try {
        const { error, value } = createParcelSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const priceInfo = calculateCost({
            originCity: value.originCity,
            destinationCity: value.destinationCity,
            shipmentType: value.shipmentType,
            parcelCategory: value.parcelCategory,
            weight: value.weight,
            deliveryType: value.deliveryType
        });

        let trackingId = generateTrackingId();

        if (!trackingId) {
            return res.status(500).json({ message: "Failed to generate unique tracking ID" });
        }

        const parcel = await Parcel.create({
            ...value,
            trackingId,
            price: priceInfo.price,
            checkpoints: [
                {
                    location: value.originCity,
                    status: "arrived",
                    title: `Parcel arrived at ${value.originCity} Branch`,
                    description: `The parcel has arrived at the ${value.originCity} branch and is being processed for further transit.`,
                    updatedBy: req.user ? req.user.name : "System",
                }
            ]
        });

        res.status(201).json(parcel);

    } catch (error) {
        next(error);
    }
}

//3:04:00
