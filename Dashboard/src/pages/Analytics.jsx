import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCard } from "@/components/StatsCard";
import { TrendingUp, Package, DollarSign, BarChart3 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { fetchAnalyticsThunk } from "@/features/analytics/analyticsSlice";

export default function Analytics() {
  const dispatch = useDispatch();
  const {
    summary,
    revenueData,
    parcelGrowthData,
    topCitiesData,
    deliveryPerformanceData,
    loading,
    error
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsThunk());
  }, [dispatch]);

  const totalRevenue = summary?.totals?.revenue ??
    (revenueData || []).reduce((s, d) => s + (d.revenue || 0), 0);
  const totalParcels = summary?.totals?.parcels ??
    (parcelGrowthData || []).reduce((s, d) => s + (d.parcels || 0), 0);
  const citiesServed = summary?.citiesServed ?? (topCitiesData || []).length;
  const avgOnTime = useMemo(() => {
    const rows = deliveryPerformanceData || [];
    if (rows.length === 0) return 0;
    return Math.round(rows.reduce((s, d) => s + (d.onTime || 0), 0) / rows.length);
  }, [deliveryPerformanceData]);

  return <>


    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm">
          View your courier analytics and performance metrics.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={totalRevenue}
          icon={DollarSign}
          prefix="₹"
          index={0}
          iconClassName="bg-success/10 text-success"
        />

        <StatsCard
          title="Total Parcels"
          value={totalParcels}
          icon={Package}
          prefix=""
          index={1}
          iconClassName="bg-primary/10 text-primary"
        />

        <StatsCard
          title="Avg On-Time %"
          value={avgOnTime}
          icon={TrendingUp}
          suffix="%"
          index={2}
          iconClassName="bg-info/10 text-info"
        />

        <StatsCard
          title="Cities Served"
          value={citiesServed}
          icon={BarChart3}
          index={3}
          iconClassName="bg-secondary/10 text-secondary"
        />

 


      </div>
    </motion.div>

  </>;
}
