import React from 'react'
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Package, CheckCircle, Truck, Clock } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchParcelsThunk } from "@/features/parcels/parcelSlice";
import { fetchDashboardStatesThunk } from "@/features/dashboard/dashboardSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_FILL = {
  arrived: "hsl(var(--secondary))",
  in_transit: "hsl(var(--primary))",
  out_for_delivery: "hsl(var(--info))",
  delivered: "hsl(var(--success))",
};

const getParcelStatus = (parcel) => {
  const checkpoints = parcel?.checkpoints || [];
  if (!checkpoints.length) return "arrived";
  return checkpoints[checkpoints.length - 1].status || "arrived";
};

const Dashboard = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, meta } = useSelector((state) => state.parcels);
  const { stats, loading: statsLoading, error: statsError } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchParcelsThunk({ page: 1, limit: 8 }));
    dispatch(fetchDashboardStatesThunk());
  }, [dispatch]);

  const statusCounts = useMemo(() => {
    const base = { arrived: 0, in_transit: 0, out_for_delivery: 0, delivered: 0 };
    const rows = stats?.statusDistribution || [];

    for (const r of rows) {
      if (r?.name && base[r.name] !== undefined) {
        base[r.name] = r.value || 0;
      }
    }
    return base;
  }, [stats]);

  const monthlyParcelData = stats?.monthlyParcels || [];
  const monthlyRevenueData = stats?.monthlyRevenue || [];
  const weightDistributionData = stats?.weightDistribution || [];

  const deliveryStatusData = useMemo(() => {
    const rows = stats?.statusDistribution || [];
    return rows.map((r) => ({
      ...r,
      fill: STATUS_FILL[r.name] || "hsl(var(--muted))"
    }))
  }, [stats]);

  return (
    <>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      </div>
    </div>
     </>
  )
}

export default Dashboard





 



   

