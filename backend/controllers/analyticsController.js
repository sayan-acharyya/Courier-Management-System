import { Parcel } from "../models/parcel.js";
import {
    getDashboardStatsData,
    getLastMonths
} from "../services/analyticsServices.js";

export const getRevenueAnalytics = async (req, res, next) => {
    try {
        const data = await getDashboardStatsData();
        res.status(200).json(data.monthlyRevenue);
    } catch (error) {
        next(error);
    }
};

export const getParcelGrowth = async (req, res, next) => {
    try {
        const data = await getDashboardStatsData();
        res.status(200).json(data.monthlyParcels);
    } catch (error) {
        next(error);
    }
};

export const getTopCities = async (req, res, next) => {
    try {
        const limit = Math.min(parseInt(req.query.limit, 10) || 8, 20);

        const rows = await Parcel.aggregate([
            { $match: { destinationCity: { $type: "string", $ne: "" } } },
            { $group: { _id: "$destinationCity", parcels: { $sum: 1 } } },
            { $sort: { parcels: -1 } },
            { $limit: limit },
            { $project: { _id: 0, city: "$_id", parcels: 1 } }
        ]);

        res.status(200).json(rows);

    } catch (error) {
        next(error);
    }
};

export const getDeliveryPerformance = async (req, res, next) => {
    try {
        const months = getLastMonths(12);
        const startDate = months[0].start;

        const agg = await Parcel.aggregate([
            { $match: { createdAt: { $gte: startDate } } },

            {
                $project: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                    currentStatus: {
                        $ifNull: [
                            { $arrayElemAt: ["$checkpoints.status", -1] },
                            "arrived"
                        ]
                    }
                }
            },

            {
                $group: {
                    _id: { year: "$year", month: "$month" },
                    total: { $sum: 1 },
                    delivered: {
                        $sum: {
                            $cond: [
                                { $eq: ["$currentStatus", "delivered"] },
                                1,
                                0
                            ]
                        }
                    }
                }
            },

            {
                $project: {
                    _id: 0,
                    key: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            {
                                $cond: [
                                    { $lt: ["$_id.month", 10] },
                                    { $concat: ["0", { $toString: "$_id.month" }] },
                                    { $toString: "$_id.month" }
                                ]
                            }
                        ]
                    },
                    total: 1,
                    delivered: 1
                }
            }
        ]);

        const byKey = {};

        for (const r of agg) {
            const onTime = r.total > 0
                ? Math.round((r.delivered / r.total) * 100)
                : 0;

            byKey[r.key] = {
                onTime,
                delayed: 100 - onTime
            };
        }

        const out = months.map(m => {
            const perf = byKey[m.key] || { onTime: 0, delayed: 0 };
            return { month: m.month, ...perf };
        });

        res.status(200).json(out);

    } catch (error) {
        next(error);
    }
};

export const getAnalyticsSummary = async (req, res, next) => {
    try {
        const data = await getDashboardStatsData();

        const citiesServed = (
            await Parcel.distinct("destinationCity")
        ).filter(Boolean).length;

        res.status(200).json({
            success: true,
            totals: data.total,
            statusDistribution: data.statusDistribution,
            citiesServed
        });

    } catch (error) {
        next(error);
    }
};